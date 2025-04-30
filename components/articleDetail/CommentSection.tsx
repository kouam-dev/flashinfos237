// components/CommentSection.tsx
import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Comment, CommentStatus } from '@/types/comment';

interface CommentSectionProps {
  articleId: string;
  comments: Comment[];
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
}

export default function CommentSection({ articleId, comments }: CommentSectionProps) {
  const [newComment, setNewComment] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newComment.trim() || !userName.trim()) {
      setErrorMessage('Le nom et le commentaire sont requis.');
      return;
    }
    
    try {
      setIsSubmitting(true);
      setErrorMessage('');
      
      // Add comment to Firestore
      await addDoc(collection(db, 'comments'), {
        articleId,
        userId: null, // For anonymous comments
        userName: userName.trim(),
        userEmail: userEmail.trim() || null,
        content: newComment.trim(),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        status: CommentStatus.PENDING, // Comments need approval
        parentId: null,
        likes: 0
      });
      
      // Clear form
      setNewComment('');
      setSuccessMessage('Votre commentaire a été soumis et est en attente de modération.');
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
      
    } catch (error) {
      console.error("Error adding comment:", error);
      setErrorMessage('Une erreur est survenue. Veuillez réessayer plus tard.');
    } finally {
      setIsSubmitting(false);
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
  
  return (
    <div>
      {/* Existing Comments */}
      {comments.length > 0 ? (
        <div className="space-y-6 mb-8">
          {comments.map((comment) => (
            <div key={comment.id} className="border-b border-gray-200 pb-6">
              <div className="flex justify-between items-start mb-2">
                <div className="font-medium">{comment.userName}</div>
                <div className="text-sm text-gray-500">{formatDate(comment.createdAt)}</div>
              </div>
              <p className="">{comment.content}</p>
              
              {/* Like button */}
              <div className="mt-3 flex items-center">
                {/* <button className="flex items-center text-sm text-gray-500 hover:text-red-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905v.714L7.5 9h-3a2 2 0 00-2 2v.5" />
                  </svg>
                  {comment.likes} J'aime
                </button> */}
                
                {/* Reply button (functionality can be added later) */}
                {/* <button className="flex items-center text-sm text-gray-500 hover:text-red-600 ml-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                  </svg>
                  Répondre
                </button> */}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 bg-gray-50 dark:bg-gray-900 rounded-lg mb-8">
          <p className="text-gray-600 dark:text-gray-400">Soyez le premier à commenter cet article.</p>
        </div>
      )}
      
      {/* Comment Form */}
      <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
        <h4 className="text-xl font-bold mb-4">Laisser un commentaire</h4>
        
        {successMessage && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
            {successMessage}
          </div>
        )}
        
        {errorMessage && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {errorMessage}
          </div>
        )}
        
        <form onSubmit={handleSubmitComment}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="userName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Nom *
              </label>
              <input
                type="text"
                id="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="userEmail" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email (facultatif)
              </label>
              <input
                type="email"
                id="userEmail"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label htmlFor="comment" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Commentaire *
            </label>
            <textarea
              id="comment"
              rows={4}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Envoi en cours...' : 'Soumettre le commentaire'}
          </button>
        </form>
      </div>
    </div>
  );
}