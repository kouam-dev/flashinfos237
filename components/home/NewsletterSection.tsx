import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp, query, where, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';

function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) return;
    
    try {
      setLoading(true);
      setError('');
      
      // Vérifier si l'email existe déjà
      const q = query(
        collection(db, 'newsletterSubscriptions'), 
        where('email', '==', email),
        where('active', '==', true)
      );
      
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        setError('Cette adresse email est déjà inscrite à notre newsletter.');
        setLoading(false);
        return;
      }
      
      // Ajouter l'email à la collection 'newsletterSubscriptions'
      await addDoc(collection(db, 'newsletterSubscriptions'), {
        email,
        active: true,
        createdAt: serverTimestamp(),
      });
      
      setEmail('');
      setSubscribed(true);
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
      setError('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 p-6 rounded-md shadow-md">
      {!subscribed ? (
        <>
          <h3 className="text-xl font-bold mb-2 text-red-600">Abonnez-vous</h3>
          <p className="mb-4 text-gray-600">
            Recevez les dernières actualités directement dans votre boîte mail
          </p>
          <form className="space-y-3" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Votre adresse e-mail"
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
            {error && (
              <div className="text-sm p-2 rounded bg-red-50 text-red-600 border border-red-200">
                {error}
              </div>
            )}
            <button 
              type="submit"
              className={`w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md transition-colors ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              {loading ? 'Traitement...' : 'S\'abonner'}
            </button>
          </form>
        </>
      ) : (
        <div className="text-center py-6">
          <div className="mx-auto mb-4 bg-green-300 text-green-800 rounded-full h-16 w-16 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2 text-gray-800">Merci pour votre inscription!</h3>
          <p className="text-gray-600">
            Vous recevrez nos dernières actualités directement dans votre boîte mail.
          </p>
        </div>
      )}
    </div>
  );
}

export default NewsletterSection;