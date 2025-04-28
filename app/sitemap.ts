import { MetadataRoute } from 'next'
import { getAllCategories, getLatestArticles } from '@/lib/api'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://flashinfos237.com'
  
  // Pages statiques
  const staticPages = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
  ]
  
  // Récupérer les catégories
  const categoriesObj = await getAllCategories()
  const categories = Object.values(categoriesObj)
  
  // Créer les entrées pour les pages de catégories
  const categoryEntries = categories.map((category) => ({
    url: `${baseUrl}/category/${category.slug}`,
    lastModified: new Date(category.updatedAt || category.createdAt),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))
  
  // Récupérer tous les articles (vous pourriez vouloir ajuster la limite)
  const articles = await getLatestArticles(100)
  
  // Créer les entrées pour les pages d'articles
  const articleEntries = articles.map((article) => ({
    url: `${baseUrl}/article/${article.slug}`,
    lastModified: new Date(article.updatedAt || article.publishedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))
  
  // Combiner toutes les entrées
  return [...staticPages, ...categoryEntries, ...articleEntries]
}