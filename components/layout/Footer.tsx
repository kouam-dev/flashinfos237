// components/Footer.tsx
'use client'
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Category } from '@/types';

interface FooterProps {
  categories?: Category[];
}

const Footer = ({ categories: initialCategories }: FooterProps) => {
  const [categories, setCategories] = useState<Category[]>(initialCategories || []);
  const [isLoading, setIsLoading] = useState(!initialCategories);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const fetchCategories = async () => {
      if (initialCategories) return;
      
      try {
        const categoriesQuery = query(
          collection(db, 'categories'),
          where('active', '==', true),
          orderBy('order')
        );
        const categoriesSnapshot = await getDocs(categoriesQuery);
        const categoriesData = categoriesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Category[];
        
        setCategories(categoriesData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching categories for footer:", error);
        setIsLoading(false);
      }
    };

    if (!initialCategories) {
      fetchCategories();
    }
  }, [initialCategories]);

  return (
    <footer className="bg-black text-white mt-12">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div>
            <Link href="/" className="text-white font-bold text-2xl mb-4 block">
              <span className="bg-red-600 py-1 px-2">FLASH</span>
              <span>INFOS237</span>
            </Link>
            <p className="text-gray-400 mb-4">
              Votre source d'information fiable pour toute l'actualité du Cameroun et d'Afrique
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.379.06 3.808 0 2.43-.013 2.784-.06 3.808-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.379.06-3.808.06-2.43 0-2.784-.013-3.808-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.379-.06-3.808 0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.08 2.525c.636-.247 1.363-.416 2.427-.465.984-.047 1.362-.06 3.808-.06M12 0C8.74 0 8.333.014 7.053.072 5.775.131 4.905.333 4.14.63a7.86 7.86 0 00-2.841 1.8 7.86 7.86 0 00-1.8 2.84C.33 5.905.131 6.775.072 8.052.014 9.333 0 9.74 0 13s.014 3.667.072 4.947c.06 1.277.261 2.148.558 2.913a7.86 7.86 0 001.8 2.841 7.86 7.86 0 002.841 1.8c.766.297 1.636.499 2.913.558C8.333 25.986 8.74 26 12 26s3.667-.014 4.947-.072c1.277-.06 2.148-.261 2.913-.558a7.86 7.86 0 002.841-1.8 7.86 7.86 0 001.8-2.841c.297-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.014-3.667-.072-4.947c-.06-1.277-.261-2.148-.558-2.913a7.86 7.86 0 00-1.8-2.841 7.86 7.86 0 00-2.841-1.8c-.765-.297-1.636-.499-2.913-.558C15.667.014 15.26 0 12 0z" clipRule="evenodd"></path>
                  <path fillRule="evenodd" d="M12 6.865a6.135 6.135 0 100 12.27 6.135 6.135 0 000-12.27zM12 16a3.135 3.135 0 110-6.27 3.135 3.135 0 010 6.27z" clipRule="evenodd"></path>
                </svg>
              </a>
            </div>
          </div>
          
          {/* Categories */}
          <div>
            <h4 className="font-bold text-lg mb-4">Catégories</h4>
            {isLoading ? (
              <div className="animate-pulse">
                <div className="h-4 bg-gray-700 rounded mb-2"></div>
                <div className="h-4 bg-gray-700 rounded mb-2"></div>
                <div className="h-4 bg-gray-700 rounded mb-2"></div>
                <div className="h-4 bg-gray-700 rounded mb-2"></div>
                <div className="h-4 bg-gray-700 rounded mb-2"></div>
              </div>
            ) : (
              <ul className="space-y-2">
                {categories.slice(0, 6).map((category) => (
                  <li key={category.id}>
                    <Link 
                      href={`/category/${category.slug}`}
                      className="text-gray-400 hover:text-white"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
          
          {/* Useful links */}
          <div>
            <h4 className="font-bold text-lg mb-4">Liens utiles</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-white">
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white">
                  Conditions d'utilisation
                </Link>
              </li>
              <li>
                <Link href="/advertise" className="text-gray-400 hover:text-white">
                  Publicité
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact info */}
          <div>
            <h4 className="font-bold text-lg mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="mailto:contact@flashinfos237.com" className="hover:text-white">
                  contact@flashinfos237.com
                </a>
              </li>
              <li>
                <a href="tel:+237600000000" className="hover:text-white">
                  +237 600 000 000
                </a>
              </li>
              <li>Yaoundé, Cameroun</li>
            </ul>
          </div>
        </div>
        
        {/* Copyright notice */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>© {currentYear} Flashinfos237. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
