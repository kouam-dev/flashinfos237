// app/category/[slug]/page.tsx
import { Metadata, ResolvingMetadata } from 'next';
import { getCategoryBySlug, getArticlesByCategory } from '@/lib/api';
import CategoryPageClient from '@/components/category/CategoryPageClient';
import { Article } from '@/types/article';

export async function generateMetadata({ 
  params 
}: { 
  params: { slug: string } 
}, parent: ResolvingMetadata): Promise<Metadata> {
  const category = await getCategoryBySlug(params.slug);
  
  if (!category) {
    return {
      title: 'Catégorie non trouvée',
      description: 'La catégorie que vous recherchez n\'existe pas.',
      robots: {
        index: false,
        follow: false,
      }
    };
  }
  
  const metaTitle = `${category.name} - Articles et actualités`;
  const metaDescription = `Découvrez nos articles dans la catégorie ${category.name}. ${category.description}`;
  
  return {
    title: metaTitle,
    description: metaDescription,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: `/category/${params.slug}`,
      type: 'website',
      ...(category.imageUrl && { images: [{ url: category.imageUrl }] })
    }
  };
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const category = await getCategoryBySlug(params.slug);
  let initialArticles: Article[] = [];
  
  if (category) {
    initialArticles = await getArticlesByCategory(category.id);
  }
  
  // S'assurer que les données sont JSON-sérialisables
  return <CategoryPageClient 
    initialCategory={JSON.parse(JSON.stringify(category))} 
    initialArticles={JSON.parse(JSON.stringify(initialArticles))}
  />;
}