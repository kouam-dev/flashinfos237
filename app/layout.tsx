// app/layout.tsx
import { Inter } from 'next/font/google'
import { Metadata } from 'next';
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://flashinfos237.com'),
  title: {
    default: 'flashinfos237',
    template: '%s | flashinfos237',
  },
  description: 'Découvrez les dernières actualités et informations sur flashinfos237',
  keywords: ['actualités', 'news', 'articles', 'information', 'média'],
  authors: [
    { name: 'Kouam parfait ', url: 'https://flashinfos237.com' },
  ],
  creator: 'kouam parfait',
  publisher: 'kwamya',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://flashinfos237.com',
    siteName: 'flashinfos237',
    title: 'flashinfos237 - Actualités et Informations',
    description: 'Découvrez les dernières actualités et informations sur flashinfos237',
    images: [
      {
        url: 'https://flashinfos237.com/images/logo.png',
        width: 1200,
        height: 630,
        alt: 'flashinfos237',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'flashinfos237',
    description: 'Découvrez les dernières actualités et informations',
    creator: '@flashinfos237',
    images: ['https://flashinfos237.com/images/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/',
    languages: {
      'fr-FR': '/fr',
    },
  },
  verification: {
    google: 'votre-code-verification-google',
    yandex: 'votre-code-verification-yandex',
    yahoo: 'votre-code-verification-yahoo',
    other: {
      me: ['mailto:contact@flashinfos237.com'],
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <Header/>
        {children}
        <Footer/>
      </body>
    </html>
  )
}