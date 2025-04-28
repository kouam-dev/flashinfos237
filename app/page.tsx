// app/page.tsx
import { Metadata } from 'next';
import { getAllFeaturedArticles, getLatestArticles, getActiveCategories } from '@/lib/api';
import HomePageClient from '@/components/home/HomePageClient';

export const metadata: Metadata = {
  title: 'Flashinfos237 - Actualités du Cameroun et d\'Afrique',
  description: 'Toute l\'actualité du Cameroun et d\'Afrique en temps réel',
}

// Cette option indique à Next.js de mettre en cache cette page
export const revalidate = 900; // 15 minutes en secondes

export default async function HomePage() {
  // Récupération des données côté serveur
  const featuredArticles = await getAllFeaturedArticles(5);
  const latestArticles = await getLatestArticles(20);
  const categories = await getActiveCategories();
  
  // S'assurer que les données sont JSON-sérialisables
  return <HomePageClient 
    initialFeaturedArticles={JSON.parse(JSON.stringify(featuredArticles))} 
    initialLatestArticles={JSON.parse(JSON.stringify(latestArticles))}
    initialCategories={JSON.parse(JSON.stringify(categories))}
  />;
}