// components/Header.tsx
'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Dialog, Popover, Transition } from '@headlessui/react';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Category } from '@/types';
import Image from 'next/image';

interface HeaderProps {
  categories?: Category[];
  loading?: boolean;
}

export default function Header({ categories: propCategories, loading: propLoading }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>(propCategories || []);
  const [isLoading, setIsLoading] = useState(propLoading || !propCategories);

  // Charger les catégories si elles ne sont pas fournies via props
  useEffect(() => {
    if (propCategories) {
      setCategories(propCategories);
      setIsLoading(false);
      return;
    }
    
    const fetchCategories = async () => {
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
        console.error("Error fetching categories:", error);
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, [propCategories]);

  // Les 5 premières catégories pour la navigation principale
  const topCategories = categories.slice(0, 5);

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Top navigation */}
        <div className="flex items-center justify-between py-1 border-b border-gray-200">
          <div className="flex items-center">
            <Link href="/" className="font-bold text-2xl ">
              <Image src="/logo.svg" alt="Logo" width={250} height={50} className="inline-block" />
            </Link>
          </div>

          <button 
            className="md:hidden text-gray-900" 
            onClick={() => setMobileMenuOpen(true)}
          >
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Main navigation */}
        <nav className="hidden md:flex py-3">
          {isLoading ? (
            // Skeleton loader pour les catégories
            <ul className="flex space-x-6">
              <li className="w-16 h-6 bg-gray-200 rounded animate-pulse"></li>
              <li className="w-20 h-6 bg-gray-200 rounded animate-pulse"></li>
              <li className="w-24 h-6 bg-gray-200 rounded animate-pulse"></li>
              <li className="w-18 h-6 bg-gray-200 rounded animate-pulse"></li>
              <li className="w-22 h-6 bg-gray-200 rounded animate-pulse"></li>
              <li className="w-14 h-6 bg-gray-200 rounded animate-pulse"></li>
            </ul>
          ) : (
            <ul className="flex space-x-6">
              <li>
                <Link href="/" className="text-gray-900 hover:text-red-500 font-medium">
                  Accueil
                </Link>
              </li>
              {topCategories.map((category) => (
                <li key={category.id}>
                  <Link 
                    href={`/category/${category.slug}`} 
                    className="text-gray-900 hover:text-red-500 font-medium"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
              <li>
                <Popover className="relative">
                  <Popover.Button className="text-gray-900 hover:text-red-500 font-medium flex items-center">
                    Plus
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-1">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </Popover.Button>

                  <Popover.Panel className="absolute z-10 mt-2 bg-white p-4 rounded-md shadow-lg w-60">
                    <div className="grid grid-cols-1 gap-2">
                      {categories.slice(5).map((category) => (
                        <Link
                          key={category.id}
                          href={`/category/${category.slug}`}
                          className="text-gray-900 hover:text-red-500 block py-1"
                        >
                          {category.name}
                        </Link>
                      ))}
                    </div>
                  </Popover.Panel>
                </Popover>
              </li>
            </ul>
          )}
        </nav>
        
        {/* Mobile menu */}
        <Transition show={mobileMenuOpen} as="div">
          <Dialog 
            as="div" 
            className="fixed inset-0 z-50 md:hidden" 
            onClose={() => setMobileMenuOpen(false)}
          >
            <div className="fixed inset-0 bg-black/70" />
            
            <Dialog.Panel className="fixed inset-y-0 right-0 z-40 w-full max-w-sm bg-white p-6 overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <Link href="/" className="font-bold text-2xl">
                  <span className="bg-red-600 py-1 px-2 text-white">FLASH</span>
                  <span className="text-gray-900">INFOS237</span>
                </Link>
                <button
                  type="button"
                  className="text-gray-900"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" >
                    <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              
              <nav className="space-y-1">
                {isLoading ? (
                  // Skeleton loader pour le menu mobile
                  <>
                    <div className="h-10 bg-gray-200 rounded animate-pulse mb-2"></div>
                    <div className="h-10 bg-gray-200 rounded animate-pulse mb-2"></div>
                    <div className="h-10 bg-gray-200 rounded animate-pulse mb-2"></div>
                    <div className="h-10 bg-gray-200 rounded animate-pulse mb-2"></div>
                  </>
                ) : (
                  <>
                    <Link 
                      href="/" 
                      className="block py-2 text-gray-900 border-b border-gray-200"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Accueil
                    </Link>
                    {categories.map((category) => (
                      <Link
                        key={category.id}
                        href={`/category/${category.slug}`}
                        className="block py-2 text-gray-900 border-b border-gray-200"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {category.name}
                      </Link>
                    ))}
                  </>
                )}
              </nav>
            </Dialog.Panel>
          </Dialog>
        </Transition>
      </div>
    </header>
  );
}