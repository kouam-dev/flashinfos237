// lib/firebase-server.ts
import { db } from '@/lib/firebase';
import { doc, updateDoc, increment, collection, query, where, getDocs, setDoc, Timestamp, serverTimestamp } from 'firebase/firestore';

/**
 * Incrémente le compteur de vues d'un article et enregistre la vue dans la collection pageViews
 */
export async function updateViewCount(articleId: string): Promise<void> {
  try {
    // 1. Mettre à jour le compteur de vues de l'article
    const articleRef = doc(db, 'articles', articleId);
    await updateDoc(articleRef, {
      viewCount: increment(1)
    });

    // 2. Mettre à jour la collection pageViews pour les statistiques globales
    // Obtenir la date d'aujourd'hui (sans l'heure) pour regrouper les vues par jour
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayTimestamp = Timestamp.fromDate(today);

    // Créer un ID unique pour l'enregistrement de pageViews basé sur la date
    const dateString = today.toISOString().split('T')[0]; // Format: YYYY-MM-DD
    const pageViewId = `day_${dateString}`;
    
    // Référence au document dans la collection pageViews
    const pageViewRef = doc(db, 'pageViews', pageViewId);
    
    // Vérifier si le document existe déjà
    try {
      // Tenter de mettre à jour le document s'il existe
      await updateDoc(pageViewRef, {
        count: increment(1),
        lastUpdated: serverTimestamp()
      });
    } catch (error) {
      // Si le document n'existe pas, le créer
      await setDoc(pageViewRef, {
        date: todayTimestamp,
        count: 1,
        createdAt: serverTimestamp(),
        lastUpdated: serverTimestamp()
      });
    }

    // 3. Facultatif: Enregistrer plus de détails sur la vue (si nécessaire)
    // Par exemple, pour suivre les vues par article par jour

    // const articleViewId = `${articleId}_${dateString}`;
    // const articleViewRef = doc(db, 'articleViews', articleViewId);
    
    // try {
    //   await updateDoc(articleViewRef, {
    //     count: increment(1),
    //     lastUpdated: serverTimestamp()
    //   });
    // } catch (error) {
    //   await setDoc(articleViewRef, {
    //     articleId,
    //     date: todayTimestamp,
    //     count: 1,
    //     createdAt: serverTimestamp(),
    //     lastUpdated: serverTimestamp()
    //   });
    // }
  } catch (error) {
    console.error("Error updating view count:", error);
  }
}

/**
 * Récupère le nombre total de vues pour une période donnée
 */
export async function getTotalViewCount(startDate: Date, endDate: Date): Promise<number> {
  try {
    const startTimestamp = Timestamp.fromDate(startDate);
    const endTimestamp = Timestamp.fromDate(endDate);
    
    const pageViewsRef = collection(db, 'pageViews');
    const pageViewsQuery = query(
      pageViewsRef,
      where('date', '>=', startTimestamp),
      where('date', '<=', endTimestamp)
    );
    
    let totalViews = 0;
    const pageViewsSnapshot = await getDocs(pageViewsQuery);
    
    pageViewsSnapshot.forEach((doc) => {
      const data = doc.data();
      totalViews += data.count || 0;
    });
    
    return totalViews;
  } catch (error) {
    console.error("Error getting total view count:", error);
    return 0;
  }
}