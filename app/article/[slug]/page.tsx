// app/article/[slug]/page.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Metadata } from 'next';
import { getArticleBySlug, getCommentsByArticleId, getRelatedArticles, getAllCategories } from '@/lib/api';
import ArticleDetailClient from '@/components/article/ArticleDetailClient';
import { updateViewCount } from '@/lib/firebase-server';
import { notFound } from 'next/navigation';
import { Article } from '@/types/article';

interface PageParams {
  slug: string;
}

interface PageProps {
  params: PageParams;
  searchParams: Record<string, string | string[] | undefined>;
}

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const slug = params.slug;
  const article = await getArticleBySlug(slug);
  
  if (!article) {
    return {
      title: 'Article non trouvé',
      description: 'L\'article que vous recherchez n\'existe pas.',
      robots: {
        index: false,
        follow: false,
      }
    };
  }
  const metaTitle = article.title;
  const metaDescription = article.summary;
  
  return {
    title: metaTitle,
    description: metaDescription,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: `/article/${slug}`,
      type: 'article',
      publishedTime: article.publishedAt as unknown as string,
      modifiedTime: article.updatedAt as unknown as string,
      authors: [article.authorName],
      images: [{ url: article.imageUrl }]
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      images: [article.imageUrl],
    },
    alternates: {
      types: {
        'application/rss+xml': [
          {
            url: '/feed.xml',
            title: 'RSS Feed pour flashinfos237'
          }
        ]
      }
    }
  };
}

export const revalidate = 300; // 5 minutes

export default async function ArticleDetailPage({ params, searchParams }: PageProps) {
  const slug = params.slug;
  
  // Récupérer toutes les données nécessaires
  const article = await getArticleBySlug(slug);
  
  if (!article) {
    notFound();
  }
  
  // Incrémenter le compteur de vues côté serveur
  await updateViewCount(article.id);
  
  // Récupérer les commentaires et les articles associés
  const comments = await getCommentsByArticleId(article.id);
  
  let relatedArticles : Article[] = [];
  if (article.categoryIds && article.categoryIds.length > 0) {
    relatedArticles = await getRelatedArticles(article.id, article.categoryIds[0]);
  }
  
  // Récupérer les catégories
  const categories = await getAllCategories();
  
  // S'assurer que les données sont JSON-sérialisables
  return <ArticleDetailClient 
    initialArticle={JSON.parse(JSON.stringify(article))}
    initialComments={JSON.parse(JSON.stringify(comments))}
    initialRelatedArticles={JSON.parse(JSON.stringify(relatedArticles))}
    initialCategories={JSON.parse(JSON.stringify(categories))}
  />;
}