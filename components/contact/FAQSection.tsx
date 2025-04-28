// components/contact/FAQSection.tsx
import { useState } from 'react';
import Link from 'next/link';

// Données FAQ
const faqs = [
  {
    question: "Comment soumettre une information ou un témoignage ?",
    answer: "Vous pouvez nous envoyer vos informations et témoignages via notre formulaire de contact en sélectionnant 'Témoignage / Alerte info' dans le menu déroulant. Notre équipe de journalistes vérifiera l'information avant publication."
  },
  {
    question: "Comment devenir partenaire de FlashInfos237 ?",
    answer: "Pour établir un partenariat avec notre média, veuillez nous contacter via le formulaire en choisissant l'option 'Publicité & Partenariats'. Notre équipe commerciale vous contactera dans les 24 heures."
  },
  {
    question: "Quels sont les horaires d'ouverture de vos bureaux ?",
    answer: "Nos bureaux sont ouverts du lundi au vendredi de 8h à 18h. Notre équipe éditoriale travaille cependant 24/7 pour couvrir l'actualité camerounaise en temps réel."
  },
  {
    question: "Comment signaler une erreur dans un article ?",
    answer: "Si vous avez repéré une erreur dans l'un de nos articles, utilisez notre formulaire de contact en choisissant l'option 'Correction d'article'. Précisez l'article concerné et la correction à apporter."
  },
  {
    question: "Comment puis-je m'abonner à votre newsletter ?",
    answer: "Vous pouvez vous abonner à notre newsletter directement depuis notre page d'accueil en renseignant votre adresse email dans le formulaire d'abonnement. Vous recevrez ainsi nos actualités quotidiennes."
  },
  {
    question: "Proposez-vous des stages ou des opportunités d'emploi ?",
    answer: "Oui, nous proposons régulièrement des stages et des opportunités d'emploi dans les domaines du journalisme."
  }
];

export default function FAQSection() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  
  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };
  
  return (
    <div className="mt-10 md:mt-16 bg-white rounded-lg shadow-lg p-5 md:p-8">
      <div className="flex items-center justify-center mb-8">
        <span className="w-12 h-1 bg-red-700 mr-3"></span>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center">Questions fréquentes</h2>
        <span className="w-12 h-1 bg-red-700 ml-3"></span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {faqs.map((faq, index) => (
          <FAQ 
            key={index}
            question={faq.question}
            answer={faq.answer}
            isOpen={openFaqIndex === index}
            toggle={() => toggleFaq(index)}
          />
        ))}
      </div>
      
      {/* Bouton "Vous avez d'autres questions?" */}
      <div className="mt-8 text-center">
        <p className="text-gray-600 mb-4">Vous avez d&apos;autres questions qui ne figurent pas dans cette liste ?</p>
        <Link 
          href="#form" 
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="inline-flex items-center px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors"
        >
          <QuestionIcon />
          Contactez-nous directement
        </Link>
      </div>
    </div>
  );
}

// Sous-composant FAQ
interface FAQProps {
  question: string;
  answer: string;
  isOpen: boolean;
  toggle: () => void;
}

function FAQ({ question, answer, isOpen, toggle }: FAQProps) {
  return (
    <div 
      className={`bg-white border rounded-lg transition-all duration-300 overflow-hidden ${
        isOpen 
          ? 'shadow-md border-red-200 ring-1 ring-red-300' 
          : 'shadow-sm border-gray-200 hover:shadow-md'
      }`}
    >
      <button
        onClick={toggle}
        className="w-full flex items-center justify-between p-4 text-left focus:outline-none"
        aria-expanded={isOpen}
      >
        <h3 className={`text-lg font-semibold ${isOpen ? 'text-red-700' : 'text-gray-800'}`}>
          {question}
        </h3>
        <span className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${isOpen ? 'text-red-700' : 'text-gray-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-40' : 'max-h-0'
        }`}
      >
        <div className="p-4 pt-0 text-gray-600 border-t border-gray-100">
          {answer}
        </div>
      </div>
    </div>
  );
}

function QuestionIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
    </svg>
  );
}