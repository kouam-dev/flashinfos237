// services/firebase/contactService.ts
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ContactFormData, ContactMessage } from '@/types/contact';

export const contactService = {
  async createContactMessage(formData: ContactFormData): Promise<string> {
    try {
      // Création du message de contact avec les valeurs par défaut
      const contactMessage: Omit<ContactMessage, 'id'> = {
        ...formData,
        lu: false,
        repondu: false,
        createdAt: new Date(),
      };

      // Ajout du document à la collection "contacts" dans Firestore
      const docRef = await addDoc(
        collection(db, 'contact_messages'), 
        {
          ...contactMessage,
          createdAt: serverTimestamp(), // Utilisation du timestamp serveur pour plus de précision
        }
      );

      // Retourne l'ID du document créé
      return docRef.id;
    } catch (error) {
      console.error("Erreur lors de la création du message de contact:", error);
      throw error;
    }
  },
};