// components/layout/MobileMenu.tsx
import { Fragment } from 'react';
import Link from 'next/link';
import { Dialog, Transition } from '@headlessui/react';
import { Category } from '@/types';

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  categories: Category[];
}

export default function MobileMenu({ isOpen, setIsOpen, categories }: MobileMenuProps) {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog 
        as="div" 
        className="fixed inset-0 z-40 md:hidden" 
        onClose={() => setIsOpen(false)}
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
              onClick={() => setIsOpen(false)}
            >
              <CloseIcon />
            </button>
          </div>
          
          <div className="flex mb-6">
            <input
              type="text"
              placeholder="Rechercher..."
              className="w-full bg-gray-800 text-white px-4 py-2 rounded-l"
            />
            <button className="bg-red-600 px-4 rounded-r">
              <SearchIcon />
            </button>
          </div>
          
          <nav className="space-y-1">
            <Link 
              href="/" 
              className="block py-2 text-white border-b border-gray-700"
              onClick={() => setIsOpen(false)}
            >
              Accueil
            </Link>
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className="block py-2 text-white border-b border-gray-700"
                onClick={() => setIsOpen(false)}
              >
                {category.name}
              </Link>
            ))}
          </nav>
        </Dialog.Panel>
      </Dialog>
    </Transition>
  );
}

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </svg>
);