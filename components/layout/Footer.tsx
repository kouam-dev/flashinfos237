// components/Footer.tsx
import { getActiveCategories } from '@/lib/api';
import FooterClient from './FooterClient';

export default async function Footer() {
  // Récupérer les catégories côté serveur
  const categories = await getActiveCategories();
  
  // Passer les données au composant client
  return <FooterClient categories={categories} />;
}