// lib/api.ts
import { collection, getDocs, query, where, orderBy, limit, DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Category, Article, ArticleStatus } from '@/types';

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