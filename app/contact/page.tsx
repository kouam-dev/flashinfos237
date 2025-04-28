// app/contact/page.tsx
'use client';

import { useState } from 'react';
import ContactHeader from '@/components/contact/ContactHeader';
import ContactInfo from '@/components/contact/ContactInfo';
import ContactForm from '@/components/contact/ContactForm';
import FAQSection from '@/components/contact/FAQSection';

export default function ContactPage() {
  const [submitStatus, setSubmitStatus] = useState<{
    success?: boolean;
    message?: string;
  }>({});

  return (
    <main className="bg-gray-50 mt-14 md:mt-28">
      <ContactHeader />
      
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          <ContactInfo />
          <ContactForm setSubmitStatus={setSubmitStatus} submitStatus={submitStatus} />
        </div>
        
        <FAQSection />
      </div>
    </main>
  );
}