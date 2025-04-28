// components/home/HomePageClient.tsx
'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Article, ArticleStatus, Category } from '@/types';
import SkeletonLoader from '@/components/ui/SkeletonLoader';
import NewsletterSection from '@/components/NewsletterSection';

export default function HomePageClient({ 
  initialFeaturedArticles, 
  initialLatestArticles, 
  initialCategories 
}: {
  initialFeaturedArticles: Article[], 
  initialLatestArticles: Article[], 
  initialCategories: Category[]
}) {
  const [featuredArticles, setFeaturedArticles] = useState<Article[]>(initialFeaturedArticles || []);
  const [latestArticles, setLatestArticles] = useState<Article[]>(initialLatestArticles || []);
  const [categories, setCategories] = useState<Category[]>(initialCategories || []);
  const [topCategories, setTopCategories] = useState<Category[]>(initialCategories?.slice(0, 5) || []);
  const [isLoading, setIsLoading] = useState(!initialFeaturedArticles || !initialLatestArticles);
  
  // Dans HomePageClient.tsx
// Supprimer cette condition qui provoque le double chargement
useEffect(() => {
  // Si on n'a pas les données initiales (fallback), les charger côté client
  if (!initialFeaturedArticles?.length || !initialLatestArticles?.length || !initialCategories?.length) {
    fetchAllData();
  }
}, [initialFeaturedArticles, initialLatestArticles, initialCategories]);

  const fetchAllData = async () => {
    try {
      setIsLoading(true);
      
      // Fetch active categories if not provided
      if (!initialCategories?.length) {
        const categoriesQuery = query(
          collection(db, 'categories'),
          where('active', '==', true),
          orderBy('order')
        );
        const categoriesSnapshot = await getDocs(categoriesQuery);
        const categoriesData = categoriesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Category[];
        setCategories(categoriesData);
        
        // Top 5 categories for nav
        setTopCategories(categoriesData.slice(0, 5));
      }

      // Fetch featured articles if not provided
      if (!initialFeaturedArticles?.length) {
        const featuredQuery = query(
          collection(db, 'articles'),
          where('status', '==', ArticleStatus.PUBLISHED),
          where('featured', '==', true),
          orderBy('publishedAt', 'desc'),
          limit(5)
        );
        const featuredSnapshot = await getDocs(featuredQuery);
        const featuredData = featuredSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          publishedAt: doc.data().publishedAt?.toDate(),
          createdAt: doc.data().createdAt?.toDate(),
          updatedAt: doc.data().updatedAt?.toDate(),
        })) as Article[];
        setFeaturedArticles(featuredData);
      }

      // Fetch latest articles if not provided
      if (!initialLatestArticles?.length) {
        const latestQuery = query(
          collection(db, 'articles'),
          where('status', '==', ArticleStatus.PUBLISHED),
          orderBy('publishedAt', 'desc'),
          limit(20)
        );
        const latestSnapshot = await getDocs(latestQuery);
        const latestData = latestSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          publishedAt: doc.data().publishedAt?.toDate(),
          createdAt: doc.data().createdAt?.toDate(),
          updatedAt: doc.data().updatedAt?.toDate(),
        })) as Article[];
        setLatestArticles(latestData);
      }

      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };


  useEffect(() => {
    // Ne charger que les données manquantes, et ne pas remplacer les données existantes
    if (initialFeaturedArticles?.length && initialLatestArticles?.length && initialCategories?.length) {
      // Aucun besoin de charger des données
      return;
    }
    
    // Sinon, chargez uniquement les données manquantes
    async function loadMissingData() {
      setIsLoading(true);
      try {
        // Charger uniquement ce qui est nécessaire
        if (!initialCategories?.length) {
          // Charger les catégories...
          const categoriesQuery = query(
            collection(db, 'categories'),
            where('active', '==', true),
            orderBy('order')
          );
          const categoriesSnapshot = await getDocs(categoriesQuery);
          const categoriesData = categoriesSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })) as Category[];
          setCategories(categoriesData);
          
          // Top 5 categories for nav
          setTopCategories(categoriesData.slice(0, 5));
        }
        
        if (!initialFeaturedArticles?.length) {
          // Charger les articles en vedette...
          const featuredQuery = query(
            collection(db, 'articles'),
            where('status', '==', ArticleStatus.PUBLISHED),
            where('featured', '==', true),
            orderBy('publishedAt', 'desc'),
            limit(5)
          );
          const featuredSnapshot = await getDocs(featuredQuery);
          const featuredData = featuredSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            publishedAt: doc.data().publishedAt?.toDate(),
            createdAt: doc.data().createdAt?.toDate(),
            updatedAt: doc.data().updatedAt?.toDate(),
          })) as Article[];
          setFeaturedArticles(featuredData);
        }
        
        if (!initialLatestArticles?.length) {
          // Charger les derniers articles...
          const latestQuery = query(
            collection(db, 'articles'),
            where('status', '==', ArticleStatus.PUBLISHED),
            orderBy('publishedAt', 'desc'),
            limit(20)
          );
          const latestSnapshot = await getDocs(latestQuery);
          const latestData = latestSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            publishedAt: doc.data().publishedAt?.toDate(),
            createdAt: doc.data().createdAt?.toDate(),
            updatedAt: doc.data().updatedAt?.toDate(),
          })) as Article[];
          setLatestArticles(latestData);
        }
      } catch (error) {
        console.error("Error loading missing data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    
    loadMissingData();
  }, []);

 // Corrigez la fonction formatDate pour qu'elle soit déterministe
function formatDate(date: string | Date) {
  try {
    // Utiliser une locale fixe et un format stable
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    // Utiliser une méthode qui donnera un résultat identique côté client et serveur
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'UTC' // Important pour la cohérence
    }).format(dateObj);
  } catch (e) {
    console.error("Erreur lors du formatage de la date:", e);
    return "Date inconnue";
  }
}

  const mainFeatured = featuredArticles[0];
  const secondaryFeatured = featuredArticles.slice(1, 5);

  if (isLoading) {
    return <SkeletonLoader />;
  }

  return (
    <main className="max-w-7xl mx-auto mt-14 md:mt-28 px-4 py-6">
      {/* Welcome message */}
      <div className="bg-red-600 text-white p-3 mb-6 rounded">
        <div className="font-bold text-lg">Bienvenue sur Flashinfos237</div>
        <p>Toute l'actualité du Cameroun et d'Afrique en temps réel</p>
      </div>

      {/* Featured Articles Section */}
      {mainFeatured && (
        <section className="mb-12">
          <div className="grid md:grid-cols-12 gap-6">
            {/* Main featured article */}
            <div className="md:col-span-8">
              <Link href={`/article/${mainFeatured.slug}`} className="block group">
                <div className="relative h-96 overflow-hidden rounded-md">
                  <Image 
                    src={mainFeatured.imageUrl}
                    alt={mainFeatured.title}
                    fill
                    priority={true}
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-6 text-white">
                    <h2 className="text-3xl font-bold mb-2 group-hover:text-red-400 transition-colors">
                      {mainFeatured.title}
                    </h2>
                    <p className="mb-2 line-clamp-2">{mainFeatured.summary}</p>
                    <div className="flex items-center text-sm">
                      <span>{mainFeatured.authorName}</span>
                      <span className="mx-2">•</span>
                      <span>{formatDate(mainFeatured.publishedAt!)}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Secondary featured articles */}
            <div className="md:col-span-4 space-y-4">
              {secondaryFeatured.map((article) => (
                <Link key={article.id} href={`/article/${article.slug}`} className="block group">
                  <div className="flex items-start space-x-4">
                    <div className="relative h-24 w-36 flex-shrink-0 overflow-hidden rounded-md">
                      <Image 
                        src={article.imageUrl}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold group-hover:text-red-600 transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {formatDate(article.publishedAt!)}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* News by Category */}
      <div className="grid md:grid-cols-12 gap-8">
        {/* Main content */}
        <div className="md:col-span-8">
          <section>
            <h2 className="text-2xl font-bold mb-6 pb-2 border-b-2 border-red-600">
              Dernières Actualités
            </h2>
            
            <div className="grid gap-8 mb-12">
              {latestArticles.slice(0, 6).map((article) => (
                <Link key={article.id} href={`/article/${article.slug}`} className="block group">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="relative h-56 md:h-40 md:w-60 overflow-hidden rounded-md">
                      <Image 
                        src={article.imageUrl}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="mb-2">
                        {article.categoryIds.length > 0 && categories.filter(cat => 
                          article.categoryIds.includes(cat.id)).slice(0, 1).map(cat => (
                          <span 
                            key={cat.id} 
                            className="text-sm font-medium text-red-600"
                          >
                            {cat.name}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-red-600 transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 mb-2 line-clamp-2">
                        {article.summary}
                      </p>
                      <div className="flex items-center text-sm text-gray-500">
                        <span>{article.authorName}</span>
                        <span className="mx-2">•</span>
                        <span>{formatDate(article.publishedAt!)}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Category sections */}
          {categories.slice(0, 6).map((category) => (
            <section key={category.id} className="mb-12">
              <div className="flex items-center justify-between mb-6 pb-2 border-b-2 border-red-600">
                <h2 className="text-2xl font-bold">{category.name}</h2>
                <Link 
                  href={`/category/${category.slug}`} 
                  className="text-red-600 hover:text-red-700"
                >
                  Voir tout
                </Link>
              </div>
              
              <div className="grid gap-8">
                {latestArticles.filter(article => 
                  article.categoryIds.includes(category.id)
                ).slice(0, 3).map((article) => (
                  <Link key={article.id} href={`/article/${article.slug}`} className="block group">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="relative h-56 md:h-40 md:w-60 overflow-hidden rounded-md">
                        <Image 
                          src={article.imageUrl}
                          alt={article.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2 group-hover:text-red-600 transition-colors">
                          {article.title}
                        </h3>
                        <p className="text-gray-600 mb-2 line-clamp-2">
                          {article.summary}
                        </p>
                        <div className="flex items-center text-sm text-gray-500">
                          <span>{article.authorName}</span>
                          <span className="mx-2">•</span>
                          <span>{formatDate(article.publishedAt!)}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Sidebar */}
        <div className="md:col-span-4">
          {/* Most viewed */}
          <div className="bg-gray-50 p-6 rounded-md mb-8">
            <h3 className="text-xl font-bold mb-4 pb-2 border-b border-gray-300">
              Les plus vus
            </h3>
            <div className="space-y-4">
              {latestArticles
                .sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0))
                .slice(0, 5)
                .map((article, index) => (
                  <Link key={article.id} href={`/article/${article.slug}`} className="block group">
                    <div className="flex items-start">
                      <span className="text-3xl font-bold text-gray-300 mr-4">
                        {index + 1}
                      </span>
                      <div>
                        <h4 className="font-bold group-hover:text-red-600 transition-colors">
                          {article.title}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {formatDate(article.publishedAt!)}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>

          {/* Tag cloud */}
          <div className="bg-gray-50 p-6 rounded-md mb-8">
            <h3 className="text-xl font-bold mb-4 pb-2 border-b border-gray-300">
              Tags populaires
            </h3>
            <div className="flex flex-wrap gap-2">
              {Array.from(new Set(latestArticles.flatMap(article => article.tags || [])))
                .slice(0, 15)
                .map((tag) => (
                  <Link 
                    key={tag} 
                    href={`/tag/${tag}`}
                    className="bg-gray-200 hover:bg-red-600 hover:text-white px-3 py-1 rounded-full text-sm transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
            </div>
          </div>

          {/* Newsletter signup */}
          <NewsletterSection />
        </div>
      </div>
    </main>
  );
}