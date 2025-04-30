// app/article/[slug]/page.tsx
import { Metadata } from 'next';
import { getArticleBySlug, getCommentsByArticleId, getRelatedArticles, getAllCategories } from '@/lib/api';
import ArticleDetailClient from '@/components/article/ArticleDetailClient';
import { updateViewCount } from '@/lib/firebase-server';
import { notFound } from 'next/navigation';
import { Article } from '@/types/article';

// Utiliser les types natifs de la plateforme
type Params = {
  slug: string;
}

interface GenerateMetadataProps {
  params: Params;
  searchParams?: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata(
  { params }: GenerateMetadataProps
): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug);
  
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
      url: `/article/${params.slug}`,
      type: 'article',
      publishedTime: article.publishedAt instanceof Date 
      ? article.publishedAt.toISOString() 
      : typeof article.publishedAt === 'string' 
      ? article.publishedAt 
      : undefined,
      modifiedTime: article.updatedAt instanceof Date 
      ? article.updatedAt.toISOString() 
      : typeof article.updatedAt === 'string' 
      ? article.updatedAt 
      : undefined,
      authors: [article.authorName],
      images: [{ url: article.imageUrl }]
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      images: [article.imageUrl],
    },
    // Ajout de la balise RSS dans les métadonnées
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

// Utiliser les interfaces natives de Next.js pour le composant de page
export default async function ArticleDetailPage({ 
  params 
}: {
  params: Params;
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
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
  
  let relatedArticles: Article[] = [];
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

