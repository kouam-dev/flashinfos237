// lib/api.ts
import { collection, getDocs, query, where, orderBy, limit} from 'firebase/firestore';
import { cache } from 'react';
import { db } from '@/lib/firebase';
import { Category, Article, ArticleStatus } from '@/types';
import { Comment, CommentStatus } from '@/types/comment';

/**
 * Convertit les timestamps Firestore en objets Date JavaScript
 */
function convertFirestoreTimestamps(obj: any) {
  const result = { ...obj };
  
  // Convertir les timestamps directs
  Object.keys(result).forEach(key => {
    // Si c'est un timestamp Firestore (a seconds et nanoseconds)
    if (result[key] && typeof result[key] === 'object' && 'seconds' in result[key] && 'nanoseconds' in result[key]) {
      // Convertir en timestamp JavaScript (millisecondes)
      result[key] = new Date(result[key].seconds * 1000).toISOString();
    }
  });
  
  return result;
}

/**
 * Récupère tous les articles mis en avant
 */
export async function getAllFeaturedArticles(featuredArticlesLimit = 5): Promise<Article[]> {
  try {
    const featuredQuery = query(
      collection(db, 'articles'),
      where('status', '==', ArticleStatus.PUBLISHED),
      where('featured', '==', true),
      orderBy('publishedAt', 'desc'),
      limit(featuredArticlesLimit)
    );
    
    const featuredSnapshot = await getDocs(featuredQuery);
    
    if (featuredSnapshot.empty) {
      return [];
    }
    
    return featuredSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...convertFirestoreTimestamps(data)
      } as Article;
    });
  } catch (error) {
    console.error("Error fetching featured articles:", error);
    return [];
  }
}

/**
 * Récupère les derniers articles publiés
 */
export async function getLatestArticles(articlePerPage = 20): Promise<Article[]> {
  try {
    const latestQuery = query(
      collection(db, 'articles'),
      where('status', '==', ArticleStatus.PUBLISHED),
      orderBy('publishedAt', 'desc'),
      limit(articlePerPage)
    );
    
    const latestSnapshot = await getDocs(latestQuery);
    
    if (latestSnapshot.empty) {
      return [];
    }
    
    return latestSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...convertFirestoreTimestamps(data)
      } as Article;
    });
  } catch (error) {
    console.error("Error fetching latest articles:", error);
    return [];
  }
}

/**
 * Récupère toutes les catégories actives
 */
// Utiliser la fonction cache de React pour mémoriser les résultats
export const getActiveCategories = cache(async (): Promise<Category[]> => {
  try {
    const categoriesQuery = query(
      collection(db, 'categories'),
      where('active', '==', true),
      orderBy('order')
    );
    
    const categoriesSnapshot = await getDocs(categoriesQuery);
    
    if (categoriesSnapshot.empty) {
      return [];
    }
    
    return categoriesSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...convertFirestoreTimestamps(data)
      } as Category;
    });
  } catch (error) {
    console.error("Error fetching active categories:", error);
    return [];
  }
});

/**
 * Récupère une catégorie par son slug
 */
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const categoriesQuery = query(
      collection(db, 'categories'),
      where('slug', '==', slug)
    );
    
    const categoriesSnapshot = await getDocs(categoriesQuery);
    
    if (categoriesSnapshot.empty) {
      return null;
    }
    
    // Convertir en objet simple avant de retourner
    const categoryData = categoriesSnapshot.docs[0].data();
    const category = {
      id: categoriesSnapshot.docs[0].id,
      ...convertFirestoreTimestamps(categoryData)
    };
    
    return category as Category;
  } catch (error) {
    console.error("Error fetching category:", error);
    return null;
  }
}

/**
 * Récupère les articles d'une catégorie spécifique
 */
export async function getArticlesByCategory(
  categoryId: string, 
  pageSize = 10
): Promise<Article[]> {
  try {
    const articlesQuery = query(
      collection(db, 'articles'),
      where('status', '==', ArticleStatus.PUBLISHED),
      where('categoryIds', 'array-contains', categoryId),
      orderBy('publishedAt', 'desc'),
      limit(pageSize)
    );
    
    const articlesSnapshot = await getDocs(articlesQuery);
    
    if (articlesSnapshot.empty) {
      return [];
    }
    
    // Convertir chaque document en objet simple
    return articlesSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...convertFirestoreTimestamps(data)
      } as Article;
    });
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
}

/**
 * Récupère un article par son slug
 */
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const articleQuery = query(
      collection(db, 'articles'),
      where('slug', '==', slug),
      where('status', '==', ArticleStatus.PUBLISHED)
    );
    
    const articleSnapshot = await getDocs(articleQuery);
    
    if (articleSnapshot.empty) {
      return null;
    }
    
    const articleDoc = articleSnapshot.docs[0];
    const articleData = articleDoc.data();
    
    const article = {
      id: articleDoc.id,
      ...convertFirestoreTimestamps(articleData)
    };
    
    return article as Article;
  } catch (error) {
    console.error("Error fetching article:", error);
    return null;
  }
}

/**
 * Récupère les commentaires d'un article
 */
export async function getCommentsByArticleId(articleId: string): Promise<Comment[]> {
  try {
    const commentsQuery = query(
      collection(db, 'comments'),
      where('articleId', '==', articleId),
      where('status', '==', CommentStatus.APPROVED),
      where('parentId', '==', null), // Only get top-level comments
      orderBy('createdAt', 'desc')
    );
    
    const commentsSnapshot = await getDocs(commentsQuery);
    
    return commentsSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...convertFirestoreTimestamps(data)
      } as Comment;
    });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return [];
  }
}

/**
 * Récupère les articles similaires (même catégorie)
 */
export async function getRelatedArticles(
  currentArticleId: string, 
  categoryId: string, 
  ArticleLimit = 5
): Promise<Article[]> {
  try {
    const relatedQuery = query(
      collection(db, 'articles'),
      where('categoryIds', 'array-contains', categoryId),
      where('status', '==', ArticleStatus.PUBLISHED),
      limit(ArticleLimit) // Fetch one extra to handle possible self-inclusion
    );
    
    const relatedSnapshot = await getDocs(relatedQuery);
    
    // Filter out the current article and limit to requested number
    const relatedArticles = relatedSnapshot.docs
      .map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...convertFirestoreTimestamps(data)
        } as Article;
      })
      .filter(article => article.id !== currentArticleId)
      .slice(0, ArticleLimit);
    
    return relatedArticles;
  } catch (error) {
    console.error("Error fetching related articles:", error);
    return [];
  }
}

/**
 * Récupère toutes les catégories
 */
export async function getAllCategories(): Promise<{[key: string]: Category}> {
  try {
    const categoriesSnapshot = await getDocs(collection(db, 'categories'));
    
    const categoriesData: {[key: string]: Category} = {};
    categoriesSnapshot.docs.forEach(doc => {
      const data = doc.data();
      const categoryData = {
        id: doc.id,
        ...convertFirestoreTimestamps(data)
      } as Category;
      
      categoriesData[categoryData.id] = categoryData;
    });
    
    return categoriesData;
  } catch (error) {
    console.error("Error fetching all categories:", error);
    return {};
  }
}