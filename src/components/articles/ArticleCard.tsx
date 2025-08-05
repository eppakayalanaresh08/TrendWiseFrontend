import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Heart, TrendingUp } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Article } from '../../types';

interface ArticleCardProps {
  article: Article[];
  featured?: boolean;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, featured = false }) => {
  console.log(article,'naresh')
  return (
    <article className={`group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 ${featured ? 'md:flex' : ''}`}>
      <div className={`relative ${featured ? 'md:w-1/2' : ''}`}>
        <img
          src={article.imageUrl}
          alt={article.title}
          className={`w-full object-cover transition-transform duration-300 group-hover:scale-105 ${featured ? 'h-64 md:h-full' : 'h-48'}`}
        />
        {article.trending && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-orange-500 to-red-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
            <TrendingUp className="w-3 h-3" />
            <span>Trending</span>
          </div>
        )}
      </div>
      
      <div className={`p-6 ${featured ? 'md:w-1/2 flex flex-col justify-center' : ''}`}>
        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
          <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded-full text-xs font-medium">
            {article.tags[0]}
          </span>
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{article.readTime} min read</span>
          </div>
          <span>{formatDistanceToNow(new Date(article.publishedAt))} ago</span>
        </div>
        
        <Link to={`/article/${article.slug}`} className="group">
          <h2 className={`font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 mb-3 ${featured ? 'text-2xl md:text-3xl' : 'text-xl'}`}>
            {article.title}
          </h2>
        </Link>
        
        <p className={`text-gray-600 mb-4 ${featured ? 'text-lg' : ''}`}>
          {article.excerpt}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-sm font-medium text-gray-700">By {article.author}</span>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Heart className={`w-4 h-4 ${article.isLiked ? 'fill-red-500 text-red-500' : ''}`} />
            <span>{article.likes.length}</span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;