import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Search as SearchIcon } from 'lucide-react';
import ArticleGrid from '../components/articles/ArticleGrid';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { articlesAPI } from '../services/api';

const SearchResults: React.FC = () => {
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search).get('query') || '';

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setIsLoading(true);
        const data = await articlesAPI.searchArticles(query);
        setResults(data);
      } catch (error) {
        console.error('Search failed:', error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (query) {
      fetchResults();
    } else {
      navigate('/');
    }
  }, [query, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`Search: ${query} | TrendWise`}</title>
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <section className="bg-white border-b border-gray-200 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Search Results
            </h1>
            <p className="text-gray-600">
              {results.length} {results.length === 1 ? 'result' : 'results'} for "{query}"
            </p>
          </div>
        </section>

        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {results.length > 0 ? (
              <ArticleGrid articles={results} />
            ) : (
              <div className="text-center py-16">
                <SearchIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">No articles found</h2>
                <p className="text-gray-600">
                  Try adjusting your search terms or browse our latest articles instead.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default SearchResults;