// components/Header.tsx
import { getActiveCategories } from '@/lib/api';
import HeaderClient from './HeaderClient';

export default async function Header() {
  // Récupérer les catégories côté serveur
  const categories = await getActiveCategories();
  
  // Passer les données au composant client
  return <HeaderClient categories={categories} />;
}