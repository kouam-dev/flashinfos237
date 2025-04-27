// import { db } from "./firebase";


// /**
//  * Incrémente le compteur de vues d'un article
//  */
// export async function updateViewCount(articleId: string): Promise<void> {
//   try {
//     const articleRef = db.collection('articles').doc(articleId);
//     await articleRef.update({
//       viewCount: FieldValue.increment(1)
//     });
//   } catch (error) {
//     console.error("Error updating view count:", error);
//   }
// }