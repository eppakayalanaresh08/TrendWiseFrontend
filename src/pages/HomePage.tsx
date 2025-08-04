// import React, { useState, useEffect } from 'react';
// import { useSearchParams } from 'react-router-dom';
// import { Helmet } from 'react-helmet-async';
// import { TrendingUp, Search as SearchIcon } from 'lucide-react';
// import ArticleGrid from '../components/articles/ArticleGrid';
// import LoadingSpinner from '../components/common/LoadingSpinner';
// import { articlesAPI } from '../services/api';
// import { Article } from '../types';

// // import {mockArticles} from '../data/mockData'


// const HomePage: React.FC = () => {
//   const [searchParams] = useSearchParams();
//   const [articles, setArticles] = useState<Article[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
//   const searchQuery = searchParams.get('search') || '';

//   const transformArticle = (apiArticle: any): Article => {
//     const wordCount = apiArticle.content.split(/\s+/).length;
//     const readTime = Math.ceil(wordCount / 200);
  
//     return {
//       ...apiArticle,
//       id: apiArticle.id || apiArticle._id,
//       imageUrl: apiArticle.media?.images?.[0] || 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg',
//       excerpt: apiArticle.meta?.description || apiArticle.content.substring(0, 100) + '...',
//       readTime,
//       publishedAt: apiArticle.createdAt,
//       author: 'TrendWise Editor',
//       tags: apiArticle.meta?.keywords || ['Technology'],
//       trending: Math.random() > 0.7, // Random trending flag for demo
//       isLiked: false, // Default like status
//     };
//   };

//   useEffect(() => {
//     const fetchArticles = async () => {
//       try {
//         setIsLoading(true);
//         const data = await articlesAPI.getArticles();
//         console.log('data')
//         console.log(data.articles,'vvvvsss')
//         const transformed = data.articles.map(transformArticle);
//         setArticles(transformed);

//         // setArticles(data.articles);
//       } catch (error) {
//         console.error('Error fetching articles:', error);
//         // Fallback to empty array or show error message
//         setArticles([]);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchArticles();
//   }, []);

//   useEffect(() => {
//     const searchArticles = async () => {
//       try {
//         if (searchQuery) {
//           setIsLoading(true);
//           const data = await articlesAPI.getArticles(searchQuery);
//           setFilteredArticles(data);
//         } else {
//           setFilteredArticles(articles);
//         }
//       } catch (error) {
//         console.error('Error searching articles:', error);
//         setFilteredArticles([]);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     if (searchQuery) {
//       searchArticles();
//     } else {
//       setFilteredArticles(articles);
//     }
//   }, [searchQuery, articles]);

//   // const trendingCount = articles.filter(article => article.trending).length;

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <LoadingSpinner size="lg" />
//       </div>
//     );
//   }

//   return (
//     <>
//       <Helmet>
//         <title>{searchQuery ? `Search: ${searchQuery} | TrendWise` : 'TrendWise - Latest Tech Trends & Insights'}</title>
//         <meta name="description" content="Stay ahead with the latest technology trends, AI insights, and digital transformation stories. Expert analysis and trending topics updated daily." />
//         <meta name="keywords" content="technology trends, AI insights, digital transformation, tech news, innovation" />
        
//         {/* Open Graph */}
//         <meta property="og:title" content="TrendWise - Latest Tech Trends & Insights" />
//         <meta property="og:description" content="Stay ahead with the latest technology trends, AI insights, and digital transformation stories." />
//         <meta property="og:type" content="website" />
//         <meta property="og:image" content="https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1200" />
        
//         {/* Twitter Card */}
//         <meta name="twitter:card" content="summary_large_image" />
//         <meta name="twitter:title" content="TrendWise - Latest Tech Trends & Insights" />
//         <meta name="twitter:description" content="Stay ahead with the latest technology trends, AI insights, and digital transformation stories." />
//       </Helmet>

//       <div className="min-h-screen bg-gray-50">
//         {/* Hero Section */}
//         {!searchQuery && (
//           <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-purple-800 text-white py-16">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//               <div className="text-center">
//                 <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
//                   Stay Ahead of the Curve
//                 </h1>
//                 <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
//                   Discover the latest trends in technology, AI, and digital transformation with expert insights and analysis.
//                 </p>
//                 <div className="flex items-center justify-center space-x-8 text-blue-200">
//                   <div className="flex items-center space-x-2">
//                     <TrendingUp className="w-5 h-5" />
//                     {/* <span>{trendingCount} Trending Articles</span> */}
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <SearchIcon className="w-5 h-5" />
//                     <span>{articles.length} Total Articles</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </section>
//         )}

//         {/* Search Results Header */}
//         {searchQuery && (
//           <section className="bg-white border-b border-gray-200 py-8">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//               <h1 className="text-3xl font-bold text-gray-900 mb-2">
//                 Search Results
//               </h1>
//               <p className="text-gray-600">
//                 {filteredArticles.length} {filteredArticles.length === 1 ? 'result' : 'results'} for "{searchQuery}"
//               </p>
//             </div>
//           </section>
//         )}

//         {/* Articles Section */}
//         <section className="py-12">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             {filteredArticles.length > 0 ? (
//               <ArticleGrid articles={filteredArticles} showFeatured={!searchQuery} />
//             ) : (
//               <div className="text-center py-16">
//                 <SearchIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//                 <h2 className="text-2xl font-bold text-gray-900 mb-2">No articles found</h2>
//                 <p className="text-gray-600">
//                   Try adjusting your search terms or browse our latest articles instead.
//                 </p>
//               </div>
//             )}
//           </div>
//         </section>
//       </div>
//     </>
//   );
// };

// export default HomePage;



import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { TrendingUp, Search as SearchIcon } from 'lucide-react';
import ArticleGrid from '../components/articles/ArticleGrid';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { articlesAPI } from '../services/api';
import { Article } from '../types';

const HomePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const searchQuery = searchParams.get('search') || '';

  const transformArticle = (apiArticle: any): Article => {
    const wordCount = apiArticle.content.split(/\s+/).length;
    const readTime = Math.ceil(wordCount / 200);
  
    return {
      ...apiArticle,
      id: apiArticle.id || apiArticle._id,
      imageUrl: apiArticle.media?.images?.[0] || 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg',
      excerpt: apiArticle.meta?.description || apiArticle.content.substring(0, 100) + '...',
      readTime,
      publishedAt: apiArticle.createdAt,
      author: 'TrendWise Editor',
      tags: apiArticle.meta?.keywords || ['Technology'],
      trending: Math.random() > 0.7,
      isLiked: false,
    };
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        let data;
        
        if (searchQuery) {
          // Use search endpoint when there's a query
          data = await articlesAPI.searchArticles(searchQuery);
        } else {
          // Use regular articles endpoint otherwise
          const response = await articlesAPI.getArticles();
          data = response.articles;
        }
        
        const transformed = data.map(transformArticle);
        setArticles(transformed);
      } catch (error) {
        console.error('Error fetching articles:', error);
        setArticles([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [searchQuery]); // Re-run when search query changes

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
        <title>{searchQuery ? `Search: ${searchQuery} | TrendWise` : 'TrendWise - Latest Tech Trends & Insights'}</title>
        {/* ... other meta tags ... */}
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section - Only shown when not searching */}
        {!searchQuery && (
          <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-purple-800 text-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  Stay Ahead of the Curve
                </h1>
                <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
                  Discover the latest trends in technology, AI, and digital transformation with expert insights and analysis.
                </p>
                <div className="flex items-center justify-center space-x-8 text-blue-200">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <SearchIcon className="w-5 h-5" />
                    <span>{articles.length} Total Articles</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Search Results Header - Only shown when searching */}
        {searchQuery && (
          <section className="bg-white border-b border-gray-200 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Search Results
              </h1>
              <p className="text-gray-600">
                {articles.length} {articles.length === 1 ? 'result' : 'results'} for "{searchQuery}"
              </p>
            </div>
          </section>
        )}

        {/* Articles Section */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {articles.length > 0 ? (
              <ArticleGrid 
                articles={articles} 
                showFeatured={!searchQuery} // Only show featured articles when not searching
              />
            ) : (
              <div className="text-center py-16">
                <SearchIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {searchQuery ? 'No articles found' : 'No articles available'}
                </h2>
                <p className="text-gray-600">
                  {searchQuery 
                    ? 'Try adjusting your search terms or browse our latest articles instead.'
                    : 'Please check back later for new articles.'}
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default HomePage;