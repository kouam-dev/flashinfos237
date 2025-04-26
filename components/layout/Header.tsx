// components/Header.tsx
'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Dialog, Popover, Transition } from '@headlessui/react';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Category } from '@/types';

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
<header className="bg-black">
        <div className="max-w-7xl mx-auto px-4">
          {/* Top navigation */}
          <div className="flex items-center justify-between py-4 border-b border-gray-700">
            <div className="flex items-center">
              <Link href="/" className="text-white font-bold text-2xl">
                <span className="bg-red-600 py-1 px-2">FLASH</span>
                <span>INFOS237</span>
              </Link>
            </div>
            
            <div className="hidden md:flex items-center space-x-6">
              <button className="text-white hover:text-red-500">
                <svg className="h-6 w-6"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" >
                  <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
                </svg>

              </button>
              <button className="text-white hover:text-red-500">
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" >
                  <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                </svg>

              </button>
            </div>

            <button 
              className="md:hidden text-white" 
              onClick={() => setMobileMenuOpen(true)}
            >
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
              </svg>

            </button>
          </div>

          {/* Main navigation */}
          <nav className="hidden md:flex py-3">
            <ul className="flex space-x-6">
              <li>
                <Link href="/" className="text-white hover:text-red-500 font-medium">
                  Accueil
                </Link>
              </li>
              {topCategories.map((category) => (
                <li key={category.id}>
                  <Link 
                    href={`/category/${category.slug}`} 
                    className="text-white hover:text-red-500 font-medium"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
              <li>
                <Popover className="relative">
                  <Popover.Button className="text-white hover:text-red-500 font-medium flex items-center">
                    Plus
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-1">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </Popover.Button>

                  <Popover.Panel className="absolute z-10 mt-2 bg-black p-4 rounded-md shadow-lg w-60">
                    <div className="grid grid-cols-1 gap-2">
                      {categories.slice(5).map((category) => (
                        <Link
                          key={category.id}
                          href={`/category/${category.slug}`}
                          className="text-white hover:text-red-500 block py-1"
                        >
                          {category.name}
                        </Link>
                      ))}
                    </div>
                  </Popover.Panel>
                </Popover>
              </li>
            </ul>
          </nav>
          {/* Mobile menu */}
          <Transition show={mobileMenuOpen} as="div">
            <Dialog 
              as="div" 
              className="fixed inset-0 z-40 md:hidden" 
              onClose={() => setMobileMenuOpen(false)}
            >
              <div className="fixed inset-0 bg-black/70" />
              
              <Dialog.Panel className="fixed inset-y-0 right-0 z-40 w-full max-w-sm bg-black p-6 overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                  <Link href="/" className="text-white font-bold text-2xl">
                    <span className="bg-red-600 py-1 px-2">FLASH</span>
                    <span>INFOS237</span>
                  </Link>
                  <button
                    type="button"
                    className="text-white"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" >
                      <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
                
                <div className="flex mb-6">
                  <input
                    type="text"
                    placeholder="Rechercher..."
                    className="w-full bg-gray-800 text-white px-4 py-2 rounded-l"
                  />
                  <button className="bg-red-600 px-4 rounded-r">
                  <svg className="h-5 w-5"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
                
                <nav className="space-y-1">
                  <Link 
                    href="/" 
                    className="block py-2 text-white border-b border-gray-700"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Accueil
                  </Link>
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/category/${category.slug}`}
                      className="block py-2 text-white border-b border-gray-700"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {category.name}
                    </Link>
                  ))}
                </nav>
              </Dialog.Panel>
            </Dialog>
          </Transition>
        </div>
      </header>


  );
}

// Icons components
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </svg>
);

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </svg>
);

const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
);

