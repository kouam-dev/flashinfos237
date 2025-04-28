import { getLatestArticles } from '@/lib/api'
import { NextResponse } from 'next/server'

export async function GET() {
  const articles = await getLatestArticles(50)
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://flashinfos237.com'
  
  // Créer le contenu XML
  const rssXml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>Votre Site de News</title>
  <link>${siteUrl}</link>
  <description>Les dernières actualités et articles sur Votre Site de News</description>
  <language>fr</language>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
  <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml" />
  ${articles.map(article => `
    <item>
      <title><![CDATA[${article.title}]]></title>
      <link>${siteUrl}/article/${article.slug}</link>
      <guid>${siteUrl}/article/${article.slug}</guid>
      <pubDate>${article.publishedAt ? new Date(article.publishedAt).toUTCString() : ''}</pubDate>
      <description><![CDATA[${article.summary || ''}]]></description>
      ${article.imageUrl ? `<enclosure url="${article.imageUrl}" type="image/jpeg" />` : ''}
    </item>
  `).join('')}
</channel>
</rss>`

  // Retourner le feed RSS
  return new NextResponse(rssXml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}