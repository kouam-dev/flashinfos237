// app/page.tsx
import { Metadata } from 'next';
import { getAllFeaturedArticles, getLatestArticles, getActiveCategories } from '@/lib/api';
import HomePageClient from '@/components/home/HomePageClient';
import { Category, Article, ArticleStatus } from '@/types';

export const metadata: Metadata = {
  title: 'Flashinfos237 - Actualités du Cameroun et d\'Afrique',
  description: 'Toute l\'actualité du Cameroun et d\'Afrique en temps réel',
}

export default async function HomePage() {
  // Récupération des données côté serveur
  const featuredArticles = await getAllFeaturedArticles(5);
  const latestArticles = await getLatestArticles(20);
  const categories = await getActiveCategories();
  
  // Préparer les données pour le client en s'assurant que les dates sont correctement sérialisées
  const prepareDataForClient = (data) => {
    return JSON.parse(JSON.stringify(data, (key, value) => {
      // Convertir les objets Date en chaînes ISO
      if (value instanceof Date) {
        return value.toISOString();
      }
      return value;
    }));
  };
  
  return <HomePageClient 
    initialFeaturedArticles={prepareDataForClient(featuredArticles)} 
    initialLatestArticles={prepareDataForClient(latestArticles)}
    initialCategories={prepareDataForClient(categories)}
  />;
}