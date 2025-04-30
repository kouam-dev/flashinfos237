// components/article/ArticleDetailClient.tsx
'use client'

import { useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import CommentSection from '@/components/articleDetail/CommentSection';
import ShareButtons from '@/components/articleDetail/ShareButtons';
import { Article, Category } from '@/types';
import { Comment } from '@/types/comment';
import ArticleSkeleton from '@/components/ui/ArticleSkeleton';

interface ArticleDetailClientProps {
  initialArticle: Article;
  initialComments: Comment[];
  initialRelatedArticles: Article[];
  initialCategories: {[key: string]: Category};
}

export default function ArticleDetailClient({
  initialArticle,
  initialComments,
  initialRelatedArticles,
  initialCategories
}: ArticleDetailClientProps) {
  const [article] = useState<Article>(initialArticle);
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [relatedArticles] = useState<Article[]>(initialRelatedArticles);
  const [categories] = useState<{[key: string]: Category}>(initialCategories);
  
  function formatDate(date: string | Date) {
    // Gère à la fois les objets Date et les chaînes de date
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    return dateObj.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
  
  // Fonction pour obtenir le nom de la catégorie à partir de l'ID
  const getCategoryName = (categoryId: string) => {
    return categories[categoryId]?.name || 'Catégorie';
  };
  
  // Fonction pour obtenir le slug de la catégorie à partir de l'ID
  const getCategorySlug = (categoryId: string) => {
    return categories[categoryId]?.slug || categoryId;
  };
  
  if (!article) {
    return <ArticleSkeleton />;
  }
  
  return (
    <div className="max-w-7xl dark:bg-gray-950  mx-auto mt-14 md:mt-28 px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="flex-1">
          {/* Article Header */}
          <div className="mb-8">
            {article.categoryIds && article.categoryIds.length > 0 && (
              <Link 
                href={`/category/${getCategorySlug(article.categoryIds[0])}`} 
                className="inline-block text-red-600 text-sm font-medium mb-4 hover:underline"
              >
                {getCategoryName(article.categoryIds[0])}
              </Link>
            )}
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bolD mb-4">{article.title}</h1>
            
            <div className="flex items-center justify-between border-b border-t border-gray-200 py-4">
              <div className="flex items-center">
                {/* You can add author avatar here if you have it */}
                <div>
                  <p className="font-medium">{article.authorName}</p>
                  <p className="text-sm text-gray-500">
                    Publié le {formatDate(article.publishedAt!)}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">{article.viewCount} lecture{article.viewCount !== 1 ? 's' : ''}</span>
                <span className="text-gray-300">|</span>
                <span className="text-sm text-gray-500">{article.commentCount} commentaire{article.commentCount !== 1 ? 's' : ''}</span>
              </div>
            </div>
          </div>
          
          {/* Featured Image */}
          <div className="relative aspect-video w-full mb-8">
            <Image 
              src={article.imageUrl}
              alt={article.title}
              fill
              className="object-cover rounded-lg"
              priority
            />
            {article.imageCredit && (
              <div className="absolute bottom-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 rounded-tl-md">
                {article.imageCredit}
              </div>
            )}
          </div>
          
          {/* Article Content */}
          <div 
            className="dark:text-white prose prose-lg max-w-none mb-10 article-content"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
          
          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {article.tags.map(tag => (
                <span key={tag} className="bg-gray-100 text-gray-700 px-3 py-1 text-sm rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          )}
          
          {/* Sources */}
          {article.sources && article.sources.length > 0 && (
            <div className="border-t border-gray-200 pt-6 mb-8">
              <h3 className="text-xl font-bold mb-4">Sources</h3>
              <ul className="list-disc pl-5">
                {article.sources.map((source, index) => (
                  <li key={index} className="mb-2">
                    <a 
                      href={source.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {source.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Share Buttons */}
          <div className="border-t border-b border-gray-200 py-6 mb-8">
            <h3 className="text-lg font-bold mb-4">Partagez cet article</h3>
            <ShareButtons 
              url={`${typeof window !== 'undefined' ? window.location.origin : ''}/article/${article.slug}`}
              title={article.title}
              summary={article.summary}
            />
          </div>
          
          {/* Comments Section */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-6">Commentaires ({article.commentCount})</h3>
            <CommentSection 
              articleId={article.id}
              comments={comments}
              setComments={setComments}
            />
          </div>
        </div>
        
        {/* Sidebar */}
        <div className="lg:w-96">
          <div className="sticky top-24">
            {relatedArticles.length > 0 && (
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4">Articles similaires</h3>
                <div className="space-y-4">
                  {relatedArticles.map(relatedArticle => (
                    <Link 
                      key={relatedArticle.id}
                      href={`/article/${relatedArticle.slug}`}
                      className="block group"
                    >
                      <div className="flex items-start gap-3">
                        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded">
                          <Image 
                            src={relatedArticle.imageUrl}
                            alt={relatedArticle.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium group-hover:text-red-600 transition-colors">
                            {relatedArticle.title}
                          </h4>
                          <p className="text-sm text-gray-500">
                            {formatDate(relatedArticle.publishedAt!)}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}