// pages/article/[slug].tsx
'use client'
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { collection, getDocs, query, where, doc, updateDoc, increment } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Article, ArticleStatus, Category } from '@/types';
import { Comment, CommentStatus } from '@/types/comment';
import CommentSection from '@/components/CommentSection';
import ShareButtons from '@/components/ShareButtons';

export default function ArticleDetailPage() {
  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState<Comment[]>([]);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<{[key: string]: Category}>({});
  
  const pathname = usePathname();
  const articleSlug = pathname.split('/').pop();
  
  useEffect(() => {
    if (articleSlug) {
      fetchArticle();
    }
  }, [articleSlug]);
  
  const fetchArticle = async () => {
    try {
      setIsLoading(true);
      
      // Get article by slug
      const articleQuery = query(
        collection(db, 'articles'),
        where('slug', '==', articleSlug),
        where('status', '==', ArticleStatus.PUBLISHED)
      );
      
      const articleSnapshot = await getDocs(articleQuery);
      
      if (articleSnapshot.empty) {
        setIsLoading(false);
        return;
      }
      
      const articleDoc = articleSnapshot.docs[0];
      const articleId = articleDoc.id;
      
      const articleData = {
        id: articleId,
        ...articleDoc.data(),
        publishedAt: articleDoc.data().publishedAt?.toDate(),
        createdAt: articleDoc.data().createdAt?.toDate(),
        updatedAt: articleDoc.data().updatedAt?.toDate(),
      } as Article;
      
      setArticle(articleData);
      
      // Fetch categories
      if (articleData.categoryIds && articleData.categoryIds.length > 0) {
        await fetchCategories(articleData.categoryIds);
      }
      
      // Increment view count
      await updateDoc(doc(db, 'articles', articleId), {
        viewCount: increment(1)
      });
      
      // Fetch comments
      await fetchComments(articleId);
      
      // Fetch related articles
      if (articleData.categoryIds && articleData.categoryIds.length > 0) {
        await fetchRelatedArticles(articleId, articleData.categoryIds[0]);
      }
      
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching article:", error);
      setIsLoading(false);
    }
  };
  
  const fetchCategories = async (categoryIds: string[]) => {
    try {
      const categoriesSnapshot = await getDocs(collection(db, 'categories'));
      
      const categoriesData: {[key: string]: Category} = {};
      categoriesSnapshot.docs.forEach(doc => {
        const categoryData = {
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate(),
          updatedAt: doc.data().updatedAt?.toDate(),
        } as Category;
        
        categoriesData[categoryData.id] = categoryData;
      });
      
      setCategories(categoriesData);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  
  const fetchComments = async (articleId: string) => {
    try {
      const commentsQuery = query(
        collection(db, 'comments'),
        where('articleId', '==', articleId),
        where('status', '==', CommentStatus.APPROVED),
        where('parentId', '==', null) // Only get top-level comments
      );
      
      const commentsSnapshot = await getDocs(commentsQuery);
      
      const commentsData = commentsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
        updatedAt: doc.data().updatedAt?.toDate(),
      })) as Comment[];
      
      setComments(commentsData);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };
  
  const fetchRelatedArticles = async (currentArticleId: string, categoryId: string) => {
    try {
      const relatedQuery = query(
        collection(db, 'articles'),
        where('categoryIds', 'array-contains', categoryId),
        where('status', '==', ArticleStatus.PUBLISHED),
        where('id', '!=', currentArticleId)
      );
      
      const relatedSnapshot = await getDocs(relatedQuery);
      
      const relatedData = relatedSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        publishedAt: doc.data().publishedAt?.toDate(),
        createdAt: doc.data().createdAt?.toDate(),
        updatedAt: doc.data().updatedAt?.toDate(),
      })) as Article[];
      
      setRelatedArticles(relatedData);
    } catch (error) {
      console.error("Error fetching related articles:", error);
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
  
  // Function to get category name from ID
  const getCategoryName = (categoryId: string) => {
    return categories[categoryId]?.name || 'Catégorie';
  };
  
  // Function to get category slug from ID
  const getCategorySlug = (categoryId: string) => {
    return categories[categoryId]?.slug || categoryId;
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }
  
  if (!article) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Article non trouvé</h1>
          <p className="mt-4 text-gray-600">L'article que vous recherchez n'existe pas ou a été supprimé.</p>
          <Link href="/" className="mt-6 inline-block bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700">
            Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="flex-1">
          {/* Article Header */}
          <div className="mb-8">
            {article.categoryIds && article.categoryIds.length > 0 && (
              <Link 
                href={`/category/${getCategorySlug(article.categoryIds[0])}`} 
                className="inline-block text-red-600 text-sm font-medium mb-4 hover:underline"
              >
                {getCategoryName(article.categoryIds[0])}
              </Link>
            )}
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">{article.title}</h1>
            
            {/* <p className="text-xl text-gray-600 mb-6">{article.summary}</p> */}
            
            <div className="flex items-center justify-between border-b border-t border-gray-200 py-4">
              <div className="flex items-center">
                {/* You can add author avatar here if you have it */}
                <div>
                  <p className="font-medium">{article.authorName}</p>
                  <p className="text-sm text-gray-500">
                    Publié le {formatDate(article.publishedAt!)}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">{article.viewCount} lecture{article.viewCount !== 1 ? 's' : ''}</span>
                <span className="text-gray-300">|</span>
                <span className="text-sm text-gray-500">{article.commentCount} commentaire{article.commentCount !== 1 ? 's' : ''}</span>
              </div>
            </div>
          </div>
          
          {/* Featured Image */}
          <div className="relative aspect-video w-full mb-8">
            <Image 
              src={article.imageUrl}
              alt={article.title}
              fill
              className="object-cover rounded-lg"
              priority
            />
            {article.imageCredit && (
              <div className="absolute bottom-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 rounded-tl-md">
                {article.imageCredit}
              </div>
            )}
          </div>
          
          {/* Article Content */}
          <div 
            className="prose prose-lg max-w-none mb-10 article-content"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
          
          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {article.tags.map(tag => (
                <span key={tag} className="bg-gray-100 text-gray-700 px-3 py-1 text-sm rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          )}
          
          {/* Sources */}
          {article.sources && article.sources.length > 0 && (
            <div className="border-t border-gray-200 pt-6 mb-8">
              <h3 className="text-xl font-bold mb-4">Sources</h3>
              <ul className="list-disc pl-5">
                {article.sources.map((source, index) => (
                  <li key={index} className="mb-2">
                    <a 
                      href={source.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {source.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Share Buttons */}
          <div className="border-t border-b border-gray-200 py-6 mb-8">
            <h3 className="text-lg font-bold mb-4">Partagez cet article</h3>
            <ShareButtons 
              url={`${typeof window !== 'undefined' ? window.location.origin : ''}/article/${article.slug}`}
              title={article.title}
              summary={article.summary}
            />
          </div>
          
          {/* Comments Section */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-6">Commentaires ({article.commentCount})</h3>
            <CommentSection 
              articleId={article.id}
              comments={comments}
              setComments={setComments}
            />
          </div>
        </div>
        
        {/* Sidebar */}
        <div className="lg:w-96">
          <div className="sticky top-24">
            {relatedArticles.length > 0 && (
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4">Articles similaires</h3>
                <div className="space-y-4">
                  {relatedArticles.map(relatedArticle => (
                    <Link 
                      key={relatedArticle.id}
                      href={`/article/${relatedArticle.slug}`}
                      className="block group"
                    >
                      <div className="flex items-start gap-3">
                        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded">
                          <Image 
                            src={relatedArticle.imageUrl}
                            alt={relatedArticle.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium group-hover:text-red-600 transition-colors">
                            {relatedArticle.title}
                          </h4>
                          <p className="text-sm text-gray-500">
                            {formatDate(relatedArticle.publishedAt!)}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}