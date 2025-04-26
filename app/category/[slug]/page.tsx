// pages/category/[slug].tsx
'use client'
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams, usePathname } from 'next/navigation';
import { collection, getDocs, query, where, orderBy, limit, startAfter, doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Article, ArticleStatus, Category } from '@/types';

export default function CategoryPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [lastDoc, setLastDoc] = useState<any>(null);
  
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const categorySlug = pathname.split('/').pop();
  
  const pageSize = 10;
  const sortBy = searchParams.get('sort') || 'newest';
  
  useEffect(() => {
    // Reset state when category changes
    setArticles([]);
    setLastDoc(null);
    setHasMore(true);
    setIsLoading(true);
    
    fetchCategoryAndArticles();
  }, [categorySlug, sortBy]);
  
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
      
      // Define sorting based on parameter
      const sortOptions = {
        newest: ['publishedAt', 'desc'],
        oldest: ['publishedAt', 'asc'],
        popular: ['viewCount', 'desc']
      };
      
      const [sortField, sortDirection] = sortOptions[sortBy as keyof typeof sortOptions] || sortOptions.newest;
      
      if (lastDoc) {
        articlesQuery = query(
          collection(db, 'articles'),
          where('status', '==', ArticleStatus.PUBLISHED),
          where('categoryIds', 'array-contains', categoryId),
          orderBy(sortField, sortDirection as 'desc' | 'asc'),
          startAfter(lastDoc),
          limit(pageSize)
        );
      } else {
        articlesQuery = query(
          collection(db, 'articles'),
          where('status', '==', ArticleStatus.PUBLISHED),
          where('categoryIds', 'array-contains', categoryId),
          orderBy(sortField, sortDirection as 'desc' | 'asc'),
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
      
      // Ici est la correction
      if (lastDoc) {
        // Si on a déjà des articles (pagination), on ajoute à la liste existante
        setArticles(prev => [...prev, ...articlesData]);
      } else {
        // Premier chargement, on remplace complètement les articles
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
  
  function formatDate(date: Date) {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
  
  if (!category && !isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
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
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Category Header */}
      {category && (
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{category.name}</h1>
          <p className="mt-2 text-gray-600">{category.description}</p>
          
          <div className="mt-6 flex items-center justify-between border-b border-gray-200 pb-4">
            <div className="text-sm text-gray-500">
              {articles.length} article{articles.length !== 1 ? 's' : ''}
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Trier par:</span>
              <Link
                href={`/category/${categorySlug}?sort=newest`}
                className={`px-3 py-1 text-sm rounded-md ${sortBy === 'newest' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                Plus récents
              </Link>
              <Link
                href={`/category/${categorySlug}?sort=oldest`}
                className={`px-3 py-1 text-sm rounded-md ${sortBy === 'oldest' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                Plus anciens
              </Link>
              <Link
                href={`/category/${categorySlug}?sort=popular`}
                className={`px-3 py-1 text-sm rounded-md ${sortBy === 'popular' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                Populaires
              </Link>
            </div>
          </div>
        </div>
      )}
      
      {/* Loading State */}
      {isLoading && articles.length === 0 && (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
        </div>
      )}
      
      {/* Articles List */}
      <div className="grid gap-8">
        {articles.map((article) => (
          <Link key={article.id} href={`/article/${article.slug}`} className="block group">
            <div className="flex flex-col md:flex-row gap-6 border-b border-gray-100 pb-8">
              <div className="relative h-64 md:h-48 md:w-72 overflow-hidden rounded-md">
                <Image 
                  src={article.imageUrl}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-3 group-hover:text-red-600 transition-colors">
                  {article.title}
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {article.summary}
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="font-medium">{article.authorName}</span>
                  <span className="mx-2">•</span>
                  <span>{formatDate(article.publishedAt!)}</span>
                  {article.viewCount > 0 && (
                    <>
                      <span className="mx-2">•</span>
                      <span>{article.viewCount} lecture{article.viewCount > 1 ? 's' : ''}</span>
                    </>
                  )}
                </div>
                
                {article.tags && article.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
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
      
      {/* Load More Button */}
      {hasMore && articles.length > 0 && (
        <div className="mt-10 text-center">
          <button
            onClick={loadMoreArticles}
            disabled={isLoading}
            className="bg-white border border-red-600 text-red-600 hover:bg-red-50 px-6 py-3 rounded-md font-medium transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Chargement...' : 'Voir plus d\'articles'}
          </button>
        </div>
      )}
      
      {/* No Articles */}
      {!isLoading && articles.length === 0 && (
        <div className="py-12 text-center">
          <div className="text-gray-400 text-5xl mb-4">📰</div>
          <h2 className="text-2xl font-bold text-gray-900">Aucun article trouvé</h2>
          <p className="mt-2 text-gray-600">Aucun article n'est disponible dans cette catégorie pour le moment.</p>
        </div>
      )}
    </div>
  );
}