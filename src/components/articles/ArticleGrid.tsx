import React from 'react';
import { Article } from '../../types';
import ArticleCard from './ArticleCard';

interface ArticleGridProps {
  articles: Article[];
  showFeatured?: boolean;
}

const ArticleGrid: React.FC<ArticleGridProps> = ({ articles, showFeatured = true }) => {
  console.log(articles,'yess')
  const featuredArticle = showFeatured ? articles.find(article => article.trending) : null;
  const otherArticles = showFeatured 
    ? articles.filter(article => article.id !== featuredArticle?.id)
    : articles;

console.log(otherArticles,'otherArticles')
  return (
    <div className="space-y-8">
      {/* Featured Article */}
      {featuredArticle && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
            <span>Featured Article</span>
          </h2>
          <ArticleCard article={featuredArticle} featured />
        </div>
      )}

      {/* Other Articles */}
      {otherArticles.length > 0 && (
        <div>
          {showFeatured && (
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Latest Articles</h2>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticleGrid;