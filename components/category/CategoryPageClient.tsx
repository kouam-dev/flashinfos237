// components/category/CategoryPageClient.tsx
'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { collection, getDocs, query, where, orderBy, limit, startAfter } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Article, ArticleStatus, Category } from '@/types';
import { GridIcon, ListIcon } from '@/components/icons/ViewIcons';
import Skeleton from '@/components/ui/SkeletonCategory';


export default function CategoryPageClient({ initialCategory, initialArticles }:{initialCategory: Category, initialArticles: Article[] }) {
  const [articles, setArticles] = useState<Article[]>(initialArticles || []);
  const [category, setCategory] = useState<Category | null>(initialCategory);
  const [isLoading, setIsLoading] = useState(!initialCategory);
  const [hasMore, setHasMore] = useState(true);
  const [lastDoc, setLastDoc] = useState<any>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  
  const pathname = usePathname();
  const categorySlug = pathname.split('/').pop();
  
  const pageSize = 10;
  
  useEffect(() => {
    // Si on a déjà les données initiales, pas besoin de refetch
    if (!initialCategory || initialArticles.length === 0) {
      setArticles([]);
      setLastDoc(null);
      setHasMore(true);
      setIsLoading(true);
      
      fetchCategoryAndArticles();
    } else {
      // Configurer lastDoc pour les chargements supplémentaires
      setIsLoading(false);
    }
  }, [categorySlug]);
  
  const fetchCategoryAndArticles = async () => {
    try {
      // 1. Fetch the category first
      const categoriesQuery = query(
        collection(db, 'categories'),
        where('slug', '==', categorySlug)
      );
      
      const categoriesSnapshot = await getDocs(categoriesQuery);
      
      if (categoriesSnapshot.empty) {
        setIsLoading(false);
        return;
      }
      
      const categoryData = {
        id: categoriesSnapshot.docs[0].id,
        ...categoriesSnapshot.docs[0].data()
      } as Category;
      
      setCategory(categoryData);
      
      // 2. Now fetch articles for this category
      await fetchArticles(categoryData.id);
      
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };
  
  const fetchArticles = async (categoryId: string) => {
    try {
      let articlesQuery;
      
      if (lastDoc) {
        articlesQuery = query(
          collection(db, 'articles'),
          where('status', '==', ArticleStatus.PUBLISHED),
          where('categoryIds', 'array-contains', categoryId),
          orderBy('publishedAt', 'desc'),
          startAfter(lastDoc),
          limit(pageSize)
        );
      } else {
        articlesQuery = query(
          collection(db, 'articles'),
          where('status', '==', ArticleStatus.PUBLISHED),
          where('categoryIds', 'array-contains', categoryId),
          orderBy('publishedAt', 'desc'),
          limit(pageSize)
        );
      }
      
      const articlesSnapshot = await getDocs(articlesQuery);
      
      if (articlesSnapshot.empty) {
        setHasMore(false);
        setIsLoading(false);
        return;
      }
      
      const lastVisible = articlesSnapshot.docs[articlesSnapshot.docs.length - 1];
      setLastDoc(lastVisible);
      
      const articlesData = articlesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        publishedAt: doc.data().publishedAt?.toDate(),
        createdAt: doc.data().createdAt?.toDate(),
        updatedAt: doc.data().updatedAt?.toDate(),
      })) as Article[];
      
      if (lastDoc) {
        setArticles(prev => [...prev, ...articlesData]);
      } else {
        setArticles(articlesData);
      }
      
      setIsLoading(false);
      
    } catch (error) {
      console.error("Error fetching articles:", error);
      setIsLoading(false);
    }
  };
  
  const loadMoreArticles = () => {
    if (!hasMore || isLoading) return;
    
    setIsLoading(true);
    if (category) {
      fetchArticles(category.id);
    }
  };
  
  function formatDate(date: string | Date) {
    // Gère à la fois les objets Date et les chaînes de date
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    return dateObj.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
  
  if (!category && !isLoading) {
    return (
      <div className="max-w-7xl mx-auto mt-14 md:mt-28 px-4 py-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Catégorie non trouvée</h1>
          <p className="mt-4 text-gray-600">La catégorie que vous recherchez n'existe pas.</p>
          <Link href="/" className="mt-6 inline-block bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700">
            Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-7xl mx-auto mt-14 md:mt-28 px-4 py-8">
      {/* Category Header - Improved Style */}
      {category && (
        <div className="mb-10">
          <div className="bg-gradient-to-r from-red-600 to-red-500 p-6 md:p-8 rounded-lg shadow-md text-white">
            <h1 className="text-2xl md:text-4xl font-bold">{category.name}</h1>
            <p className="mt-3 text-gray-100 max-w-2xl">{category.description}</p>
            
            <div className="mt-6 flex flex-wrap items-center justify-between border-t border-red-400 pt-4">
              <div className="text-sm text-gray-100 mb-2 md:mb-0">
                {articles.length} article{articles.length !== 1 ? 's' : ''}
              </div>
              
              {/* Toggle View Mode */}
              <div className="flex items-center space-x-1 bg-white/20 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md flex items-center justify-center transition-colors ${
                    viewMode === 'list' 
                      ? 'bg-white text-red-600' 
                      : 'text-white hover:bg-white/20'
                  }`}
                  aria-label="Vue liste"
                >
                  <ListIcon />
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md flex items-center justify-center transition-colors ${
                    viewMode === 'grid' 
                      ? 'bg-white text-red-600' 
                      : 'text-white hover:bg-white/20'
                  }`}
                  aria-label="Vue grille"
                >
                  <GridIcon />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Skeleton Loading State */}
      {isLoading && articles.length === 0 && (
        <Skeleton type={viewMode} />
      )}
      
      {/* Articles List */}
      {!isLoading && viewMode === 'list' && (
      <div className="grid gap-8">
        {articles.map((article) => (
          <Link key={article.id} href={`/article/${article.slug}`} className="block group">
            <div className="flex flex-2 sm:flex-row gap-4 sm:gap-6 border-b border-gray-100 pb-8">
              <div className="relative h-32 sm:h-32 md:h-48 w-40 sm:w-40 md:w-72 overflow-hidden rounded-md flex-shrink-0">
                <Image 
                  src={article.imageUrl}
                  alt={article.title}
                  fill
                  priority={true}
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex-1 sm:mt-0">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2 md:mb-3 group-hover:text-red-600 transition-colors">
                  {article.title}
                </h2>
                <p className="text-gray-600 mb-2 sm:mb-3 md:mb-4 text-sm sm:text-base line-clamp-2 sm:line-clamp-3">
                  {article.summary}
                </p>
                <div className="flex items-center flex-wrap text-xs sm:text-sm text-gray-500 gap-1 sm:gap-2">
                  <span className="font-medium">{article.authorName}</span>
                  <span className="mx-1 sm:mx-2">•</span>
                  <span>{formatDate(article.publishedAt!)}</span>
                  {article.viewCount > 0 && (
                    <>
                      <span className="mx-1 sm:mx-2">•</span>
                      <span>{article.viewCount} lecture{article.viewCount > 1 ? 's' : ''}</span>
                    </>
                  )}
                </div>
                
                {article.tags && article.tags.length > 0 && (
                  <div className="mt-2 sm:mt-3 flex flex-wrap gap-1 sm:gap-2">
                    {article.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="bg-gray-100 text-gray-700 px-2 py-1 text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    )}
      
      {!isLoading && viewMode === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {articles.map((article) => (
            <Link key={article.id} href={`/article/${article.slug}`} className="block group">
              <div className="border border-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full">
                <div className="relative h-48 overflow-hidden">
                  <Image 
                    src={article.imageUrl}
                    alt={article.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    priority={true}
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-lg md:text-xl font-bold mb-2 group-hover:text-red-600 transition-colors line-clamp-2">
                    {article.title}
                  </h2>
                  <p className="text-gray-600 mb-3 text-sm line-clamp-2">
                    {article.summary}
                  </p>
                  <div className="flex items-center flex-wrap text-xs text-gray-500 gap-1">
                    <span className="font-medium">{article.authorName}</span>
                    <span className="mx-1">•</span>
                    <span>{formatDate(article.publishedAt!)}</span>
                  </div>
                  
                  {article.tags && article.tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1">
                      {article.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="bg-gray-100 text-gray-700 px-2 py-0.5 text-xs rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
      
      {/* Load More Button */}
      {hasMore && articles.length > 0 && (
        <div className="mt-8 md:mt-10 text-center">
          <button
            onClick={loadMoreArticles}
            disabled={isLoading}
            className="bg-white border border-red-600 text-red-600 hover:bg-red-50 px-4 md:px-6 py-2 md:py-3 rounded-md font-medium transition-colors disabled:opacity-50 w-full md:w-auto"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin h-4 w-4 md:h-5 md:w-5 border-2 border-red-600 border-t-transparent rounded-full mr-2"></div>
                Chargement...
              </div>
            ) : 'Voir plus d\'articles'}
          </button>
        </div>
      )}
      
      {/* No Articles */}
      {!isLoading && articles.length === 0 && (
        <div className="py-8 md:py-12 text-center">
          <div className="text-gray-400 text-4xl md:text-5xl mb-4">📰</div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">Aucun article trouvé</h2>
          <p className="mt-2 text-gray-600">Aucun article n'est disponible dans cette catégorie pour le moment.</p>
        </div>
      )}
    </div>
  );
}