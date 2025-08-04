// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Helmet } from 'react-helmet-async';
// import { 
//   PlusCircle, 
//   Eye, 
//   Edit, 
//   Trash2, 
//   TrendingUp, 
//   MessageCircle, 
//   Heart,
//   Users,
//   BarChart3,
//   Bot
// } from 'lucide-react';
// import { useAuth } from '../contexts/AuthContext';
// import { articlesAPI } from '../services/api';
// import LoadingSpinner from '../components/common/LoadingSpinner';
// import AdminHeader from '../components/admin/AdminHeader';

// const AdminPage: React.FC = () => {
//   const { admin } = useAuth();
//   const navigate = useNavigate();
//   const [articles, setArticles] = useState([]);
//   const [stats, setStats] = useState({
//     totalArticles: 0,
//     totalComments: 0,
//     totalLikes: 0,
//     trendingArticles: 0
//   });
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [generationStatus, setGenerationStatus] = useState('');

//   useEffect(() => {
//     if (!admin) {
//       navigate('/admin/login');
//     }
//   }, [admin, navigate]);

//   const transformAdminArticle = (apiArticle: any) => {
//     const wordCount = apiArticle.content.split(/\s+/).length;
//     const readTime = Math.ceil(wordCount / 200);
    
//     return {
//       ...apiArticle,
//       id: apiArticle.id || apiArticle._id,
//       imageUrl: apiArticle.media?.images?.[0] || 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg',
//       author: apiArticle.author || 'TrendWise Editor',
//       tags: apiArticle.meta?.keywords || ['General'],
//       trending: apiArticle.trending || false,
//       likes: apiArticle.likes?.length || 0,
//       comments: apiArticle.comments?.length || 0,
//       publishedAt: apiArticle.createdAt || new Date().toISOString(),
//       readTime
//     };
//   };

//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         const articlesData = await articlesAPI.getArticles();
//         console.log(articlesData,'admin')
//         const transformedArticles = articlesData.articles.map(transformAdminArticle);
//         setArticles(transformedArticles);

//         // setArticles(articlesData);
        
//         // Calculate stats
//         // const totalLikes = articlesData.reduce((sum, article) => sum + article.likes, 0);
//         // const trendingCount = articlesData.filter(article => article.trending).length;
        
//         const totalLikes = transformedArticles.reduce((sum, article) => sum + article.likes, 0);
//       const totalComments = transformedArticles.reduce((sum, article) => sum + article.comments, 0);
//       const trendingCount = transformedArticles.filter(article => article.trending).length;
      
//         // setStats({
//         //   totalArticles: articlesData.length,
//         //   totalComments: 0, // Will be calculated from comments API
//         //   totalLikes,
//         //   trendingArticles: trendingCount
//         // });

//         setStats({
//           totalArticles: transformedArticles.length,
//           totalComments,
//           totalLikes,
//           trendingArticles: trendingCount
//         });
  
//       } catch (error) {
//         console.error('Error fetching dashboard data:', error);
//       }
//     };

//     if (admin) {
//       fetchDashboardData();
//     }
//   }, [admin]);

//   const handleGenerateArticle = async () => {
//     try {
//       setIsGenerating(true);
//       setGenerationStatus('Fetching trending topics...');
      
//       const result = await articlesAPI.generateArticle();
//       console.log('resultresult')
//       console.log(result,'result')
      
//       setGenerationStatus('Article generated successfully!');
      
//       // Refresh articles list
//       const updatedArticles = await articlesAPI.getArticles();
//       setArticles(updatedArticles);
      
//       setTimeout(() => {
//         setIsGenerating(false);
//         setGenerationStatus('');
//       }, 2000);
//     } catch (error) {
//       console.error('Error generating article:', error);
//       setGenerationStatus('Error generating article. Please try again.');
//       setTimeout(() => {
//         setIsGenerating(false);
//         setGenerationStatus('');
//       }, 3000);
//     }
//   };

//   const handleDeleteArticle = async (articleId: string) => {
//     if (window.confirm('Are you sure you want to delete this article?')) {
//       try {
//         // await articlesAPI.deleteArticle(articleId);
//         // Refresh articles list
//         const updatedArticles = await articlesAPI.getArticles();
//         setArticles(updatedArticles);
//       } catch (error) {
//         console.error('Error deleting article:', error);
//       }
//     }
//   };

//   const handleToggleTrending = async (articleId: string) => {
//     try {
//       // await articlesAPI.toggleTrending(articleId);
//       // Refresh articles list
//       const updatedArticles = await articlesAPI.getArticles();
//       setArticles(updatedArticles);
//     } catch (error) {
//       console.error('Error toggling trending status:', error);
//     }
//   };

//   if (!admin) {
//     return <LoadingSpinner size="lg" className="min-h-screen" />;
//   }

//   return (
//     <>
//       <Helmet>
//         <title>Admin Dashboard | TrendWise</title>
//         <meta name="description" content="Admin dashboard for managing TrendWise articles and content." />
//         <meta name="robots" content="noindex, nofollow" />
//       </Helmet>

//       <div className="min-h-screen bg-gray-50">
//         <AdminHeader />

//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           {/* Dashboard Header */}
//           <div className="mb-8">
//             <div className="flex items-center justify-between">
//               <div>
//                 <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
//                 <p className="text-gray-600 mt-1">Manage your content and monitor performance</p>
//               </div>
//               <button
//                 onClick={handleGenerateArticle}
//                 disabled={isGenerating}
//                 className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
//               >
//                 <Bot className="w-5 h-5" />
//                 <span>{isGenerating ? 'Generating...' : 'Generate Article'}</span>
//               </button>
//             </div>
//           </div>

//           {/* Generation Status */}
//           {isGenerating && (
//             <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
//               <div className="flex items-center space-x-3">
//                 <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
//                 <span className="text-blue-800 font-medium">{generationStatus}</span>
//               </div>
//             </div>
//           )}

//           {/* Stats Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//             <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//               <div className="flex items-center">
//                 <div className="p-2 bg-blue-50 rounded-lg">
//                   <BarChart3 className="w-6 h-6 text-blue-600" />
//                 </div>
//                 <div className="ml-4">
//                   <p className="text-sm font-medium text-gray-600">Total Articles</p>
//                   <p className="text-2xl font-bold text-gray-900">{stats.totalArticles}</p>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//               <div className="flex items-center">
//                 <div className="p-2 bg-green-50 rounded-lg">
//                   <MessageCircle className="w-6 h-6 text-green-600" />
//                 </div>
//                 <div className="ml-4">
//                   <p className="text-sm font-medium text-gray-600">Total Comments</p>
//                   <p className="text-2xl font-bold text-gray-900">{stats.totalComments}</p>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//               <div className="flex items-center">
//                 <div className="p-2 bg-red-50 rounded-lg">
//                   <Heart className="w-6 h-6 text-red-600" />
//                 </div>
//                 <div className="ml-4">
//                   <p className="text-sm font-medium text-gray-600">Total Likes</p>
//                   <p className="text-2xl font-bold text-gray-900">{stats.totalLikes}</p>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//               <div className="flex items-center">
//                 <div className="p-2 bg-orange-50 rounded-lg">
//                   <TrendingUp className="w-6 h-6 text-orange-600" />
//                 </div>
//                 <div className="ml-4">
//                   <p className="text-sm font-medium text-gray-600">Trending</p>
//                   <p className="text-2xl font-bold text-gray-900">{stats.trendingArticles}</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Articles Management */}
//           <div className="bg-white rounded-lg shadow-sm border border-gray-200">
//             <div className="px-6 py-4 border-b border-gray-200">
//               <div className="flex items-center justify-between">
//                 <h2 className="text-lg font-semibold text-gray-900">Articles Management</h2>
//                 <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
//                   <PlusCircle className="w-4 h-4" />
//                   <span>New Article</span>
//                 </button>
//               </div>
//             </div>

//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Article
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Author
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Published
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Stats
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>
//                 {/* <tbody className="bg-white divide-y divide-gray-200">
//                   {articles.map((article) => (
//                     <tr key={article.id} className="hover:bg-gray-50 transition-colors duration-200">
//                       <td className="px-6 py-4">
//                         <div className="flex items-center">
//                           <img
//                             className="h-12 w-12 rounded-lg object-cover"
//                             src={article.imageUrl}
//                             alt={article.title}
//                           />
//                           <div className="ml-4">
//                             <div className="text-sm font-medium text-gray-900 line-clamp-2">
//                               {article.title}
//                             </div>
//                             <div className="flex items-center space-x-2 mt-1">
//                               <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full">
//                                 {article.tags[0]}
//                               </span>
//                               {article.trending && (
//                                 <span className="text-xs bg-orange-50 text-orange-600 px-2 py-1 rounded-full">
//                                   Trending
//                                 </span>
//                               )}
//                             </div>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm text-gray-900">{article.author}</div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm text-gray-900">
//                           {new Date(article.publishedAt).toLocaleDateString()}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="flex space-x-4 text-sm text-gray-500">
//                           <span className="flex items-center space-x-1">
//                             <Heart className="w-4 h-4" />
//                             <span>{article.likes}</span>
//                           </span>
//                           <span className="flex items-center space-x-1">
//                             <MessageCircle className="w-4 h-4" />
//                             <span>0</span>
//                           </span>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                         <div className="flex space-x-2">
//                           <button
//                             onClick={() => navigate(`/article/${article.slug}`)}
//                             className="text-blue-600 hover:text-blue-900 transition-colors duration-200"
//                             title="View Article"
//                           >
//                             <Eye className="w-4 h-4" />
//                           </button>
//                           <button 
//                             className="text-yellow-600 hover:text-yellow-900 transition-colors duration-200"
//                             title="Edit Article"
//                           >
//                             <Edit className="w-4 h-4" />
//                           </button>
//                           <button 
//                             onClick={() => handleDeleteArticle(article.id)}
//                             className="text-red-600 hover:text-red-900 transition-colors duration-200"
//                             title="Delete Article"
//                           >
//                             <Trash2 className="w-4 h-4" />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody> */}

// <tbody className="bg-white divide-y divide-gray-200">
//   {articles.map((article) => (
//     <tr key={article.id} className="hover:bg-gray-50 transition-colors duration-200">
//       <td className="px-6 py-4">
//         <div className="flex items-center">
//           <img
//             className="h-12 w-12 rounded-lg object-cover"
//             src={article.imageUrl}
//             alt={article.title}
//           />
//           <div className="ml-4">
//             <div className="text-sm font-medium text-gray-900 line-clamp-2">
//               {article.title}
//             </div>
//             <div className="flex items-center space-x-2 mt-1">
//               <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full">
//                 {article.tags[0]}
//               </span>
//               {article.trending && (
//                 <span className="text-xs bg-orange-50 text-orange-600 px-2 py-1 rounded-full">
//                   Trending
//                 </span>
//               )}
//             </div>
//           </div>
//         </div>
//       </td>
//       <td className="px-6 py-4 whitespace-nowrap">
//         <div className="text-sm text-gray-900">{article.author}</div>
//       </td>
//       <td className="px-6 py-4 whitespace-nowrap">
//         <div className="text-sm text-gray-900">
//           {new Date(article.publishedAt).toLocaleDateString()}
//         </div>
//       </td>
//       <td className="px-6 py-4 whitespace-nowrap">
//         <div className="flex space-x-4 text-sm text-gray-500">
//           <span className="flex items-center space-x-1">
//             <Heart className="w-4 h-4" />
//             <span>{article.likes}</span>
//           </span>
//           <span className="flex items-center space-x-1">
//             <MessageCircle className="w-4 h-4" />
//             <span>{article.comments}</span>
//           </span>
//         </div>
//       </td>
//       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//         <div className="flex space-x-2">
//           <button
//             onClick={() => navigate(`/article/${article.slug}`)}
//             className="text-blue-600 hover:text-blue-900 transition-colors duration-200"
//             title="View Article"
//           >
//             <Eye className="w-4 h-4" />
//           </button>
//           <button 
//             className="text-yellow-600 hover:text-yellow-900 transition-colors duration-200"
//             title="Edit Article"
//           >
//             <Edit className="w-4 h-4" />
//           </button>
//           <button 
//             onClick={() => handleDeleteArticle(article.id)}
//             className="text-red-600 hover:text-red-900 transition-colors duration-200"
//             title="Delete Article"
//           >
//             <Trash2 className="w-4 h-4" />
//           </button>
//           <button
//             onClick={() => handleToggleTrending(article.id)}
//             className={`${
//               article.trending 
//                 ? 'text-green-600 hover:text-green-900' 
//                 : 'text-gray-600 hover:text-gray-900'
//             } transition-colors duration-200`}
//             title={article.trending ? 'Remove Trending' : 'Mark as Trending'}
//           >
//             <TrendingUp className="w-4 h-4" />
//           </button>
//         </div>
//       </td>
//     </tr>
//   ))}
// </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AdminPage;



import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  PlusCircle, 
  Eye, 
  Edit, 
  Trash2, 
  TrendingUp, 
  MessageCircle, 
  Heart,
  Users,
  BarChart3,
  Bot,
  X
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { articlesAPI } from '../services/api';
import LoadingSpinner from '../components/common/LoadingSpinner';
import AdminHeader from '../components/admin/AdminHeader';

interface Article {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  imageUrl: string;
  author: string;
  tags: string[];
  trending: boolean;
  likes: number;
  comments: number;
  publishedAt: string;
  readTime: number;
}

const AdminPage: React.FC = () => {
  const { admin } = useAuth();
  const navigate = useNavigate();
  const [articles, setArticles] = useState<Article[]>([]);
  const [stats, setStats] = useState({
    totalArticles: 0,
    totalComments: 0,
    totalLikes: 0,
    trendingArticles: 0
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStatus, setGenerationStatus] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentArticle, setCurrentArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const [articleForm, setArticleForm] = useState({
    title: '',
    content: '',
    excerpt: '',
    tags: ['General'],
    imageUrl: '',
    trending: false
  });

  useEffect(() => {
    if (!admin) {
      navigate('/admin/login');
    } else {
      fetchDashboardData();
    }
  }, [admin, navigate]);

  const transformAdminArticle = (apiArticle: any): Article => {
    const wordCount = apiArticle.content.split(/\s+/).length;
    const readTime = Math.ceil(wordCount / 200);
    
    return {
      id: apiArticle.id || apiArticle._id,
      title: apiArticle.title,
      content: apiArticle.content,
      excerpt: apiArticle.excerpt || apiArticle.content.substring(0, 150) + '...',
      slug: apiArticle.slug,
      imageUrl: apiArticle.media?.images?.[0] || 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg',
      author: apiArticle.author?.name || 'TrendWise Editor',
      tags: apiArticle.tags || ['General'],
      trending: apiArticle.trending || false,
      likes: apiArticle.likes?.length || 0,
      comments: apiArticle.comments?.length || 0,
      commentcount:apiArticle.commentCount,
      publishedAt: apiArticle.createdAt || new Date().toISOString(),
      readTime
    };
  };

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      
            const articlesData = await articlesAPI.getAdminArticles();

      // const articlesData = await articlesAPI.getArticles();
      console.log(articlesData,'articlesData')
      const transformedArticles = articlesData.articles.map(transformAdminArticle);
      console.log(transformedArticles,'transformedArticles')
      setArticles(transformedArticles);

      const totalLikes = transformedArticles.reduce((sum, article) => sum + article.likes, 0);
      const totalComments = transformedArticles.reduce((sum, article) => sum + article.commentcount, 0);
      const trendingCount = transformedArticles.filter(article => article.trending).length;

      console.log(totalComments,'totalComments')
      
      setStats({
        totalArticles: transformedArticles.length,
        totalComments,
        totalLikes,
        trendingArticles: trendingCount
      });
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setIsLoading(false);
    }
  };

  const handleGenerateArticle = async () => {
    try {
      setIsGenerating(true);
      setGenerationStatus('Fetching trending topics...');
      
      await articlesAPI.generateArticle();
      
      setGenerationStatus('Article generated successfully!');
      
      // Refresh articles list after a short delay
      setTimeout(() => {
        fetchDashboardData();
        setIsGenerating(false);
        setGenerationStatus('');
      }, 2000);
    } catch (error) {
      console.error('Error generating article:', error);
      setGenerationStatus('Error generating article. Please try again.');
      setTimeout(() => {
        setIsGenerating(false);
        setGenerationStatus('');
      }, 3000);
    }
  };

  const handleDeleteArticle = async (articleId: string) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      try {
        await articlesAPI.deleteArticle(articleId);
        fetchDashboardData();
      } catch (error) {
        console.error('Error deleting article:', error);
      }
    }
  };

  const handleToggleTrending = async (articleId: string) => {
    try {
      const article = articles.find(a => a.id === articleId);
      if (article) {
        await articlesAPI.updateArticle(articleId, { trending: !article.trending });
        fetchDashboardData();
      }
    } catch (error) {
      console.error('Error toggling trending status:', error);
    }
  };

  const handleCreateArticle = async () => {
    try {
      console.log(articleForm,'articleFormarticleFormnaresh')
      await articlesAPI.createArticle(articleForm);
      console.log(articleForm,'articleFormarticleForm')
      setIsCreating(false);
      setArticleForm({
        title: '',
        content: '',
        excerpt: '',
        tags: ['General'],
        imageUrl: '',
        trending: false
      });
      fetchDashboardData();
    } catch (error) {
      console.error('Error creating article:', error);
    }
  };

  const handleEditArticle = async () => {
    if (!currentArticle) return;
    
    try {
      await articlesAPI.updateArticle(currentArticle.id, articleForm);
      setIsEditing(false);
      setArticleForm({
        title: '',
        content: '',
        excerpt: '',
        tags: ['General'],
        imageUrl: '',
        trending: false
      });
      setCurrentArticle(null);
      fetchDashboardData();
    } catch (error) {
      console.error('Error updating article:', error);
    }
  };

  const openEditModal = (article: Article) => {
    setCurrentArticle(article);
    setArticleForm({
      title: article.title,
      content: article.content,
      excerpt: article.excerpt,
      tags: article.tags,
      imageUrl: article.imageUrl,
      trending: article.trending
    });
    setIsEditing(true);
  };

  const handleTagChange = (index: number, value: string) => {
    const newTags = [...articleForm.tags];
    newTags[index] = value;
    setArticleForm({...articleForm, tags: newTags});
  };

  const addTag = () => {
    if (articleForm.tags.length < 5) {
      setArticleForm({...articleForm, tags: [...articleForm.tags, '']});
    }
  };

  const removeTag = (index: number) => {
    if (articleForm.tags.length > 1) {
      const newTags = articleForm.tags.filter((_, i) => i !== index);
      setArticleForm({...articleForm, tags: newTags});
    }
  };

  const resetForm = () => {
    setArticleForm({
      title: '',
      content: '',
      excerpt: '',
      tags: ['General'],
      imageUrl: '',
      trending: false
    });
    setIsCreating(false);
    setIsEditing(false);
    setCurrentArticle(null);
  };

  if (!admin) {
    return <LoadingSpinner size="lg" className="min-h-screen" />;
  }

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | TrendWise</title>
        <meta name="description" content="Admin dashboard for managing TrendWise articles and content." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <AdminHeader />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Dashboard Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600 mt-1">Manage your content and monitor performance</p>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={handleGenerateArticle}
                  disabled={isGenerating}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  <Bot className="w-5 h-5" />
                  <span>{isGenerating ? 'Generating...' : 'Generate Article'}</span>
                </button>
                <button 
                  onClick={() => setIsCreating(true)}
                  className="flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors duration-200"
                >
                  <PlusCircle className="w-5 h-5" />
                  <span>New Article</span>
                </button>
              </div>
            </div>
          </div>

          {/* Generation Status */}
          {generationStatus && (
            <div className={`mb-8 p-4 rounded-lg ${
              generationStatus.includes('Error') 
                ? 'bg-red-50 border border-red-200 text-red-800' 
                : 'bg-green-50 border border-green-200 text-green-800'
            }`}>
              <div className="flex items-center space-x-3">
                {generationStatus.includes('Error') ? (
                  <X className="w-5 h-5 text-red-600" />
                ) : (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-green-600"></div>
                )}
                <span className="font-medium">{generationStatus}</span>
              </div>
            </div>
          )}

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Articles</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalArticles}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-50 rounded-lg">
                  <MessageCircle className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Comments</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalComments}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="p-2 bg-red-50 rounded-lg">
                  <Heart className="w-6 h-6 text-red-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Likes</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalLikes}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="p-2 bg-orange-50 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-orange-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Trending</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.trendingArticles}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Articles Management */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Articles Management</h2>
                <div className="text-sm text-gray-500">
                  {articles.length} articles
                </div>
              </div>
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <LoadingSpinner size="md" />
              </div>
            ) : articles.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-500 mb-4">No articles found</div>
                <button
                  onClick={() => setIsCreating(true)}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Create your first article
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Article
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Author
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Published
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Stats
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {articles.map((article) => (
                      <tr key={article.id} className="hover:bg-gray-50 transition-colors duration-200">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <img
                              className="h-12 w-12 rounded-lg object-cover"
                              src={article.imageUrl}
                              alt={article.title}
                            />
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900 line-clamp-2">
                                {article.title}
                              </div>
                              <div className="flex items-center space-x-2 mt-1">
                                <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full">
                                  {article.tags[0]}
                                </span>
                                {article.trending && (
                                  <span className="text-xs bg-orange-50 text-orange-600 px-2 py-1 rounded-full">
                                    Trending
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{article.author}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {new Date(article.publishedAt).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex space-x-4 text-sm text-gray-500">
                            <span className="flex items-center space-x-1">
                              <Heart className="w-4 h-4" />
                              <span>{article.likes}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <MessageCircle className="w-4 h-4" />
                              <span>{article.commentcount}</span>
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => navigate(`/article/${article.slug}`)}
                              className="text-blue-600 hover:text-blue-900 transition-colors duration-200"
                              title="View Article"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => openEditModal(article)}
                              className="text-yellow-600 hover:text-yellow-900 transition-colors duration-200"
                              title="Edit Article"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleDeleteArticle(article.id)}
                              className="text-red-600 hover:text-red-900 transition-colors duration-200"
                              title="Delete Article"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleToggleTrending(article.id)}
                              className={`${
                                article.trending 
                                  ? 'text-green-600 hover:text-green-900' 
                                  : 'text-gray-600 hover:text-gray-900'
                              } transition-colors duration-200`}
                              title={article.trending ? 'Remove Trending' : 'Mark as Trending'}
                            >
                              <TrendingUp className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Create/Edit Article Modal */}
      {(isCreating || isEditing) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                {isEditing ? 'Edit Article' : 'Create New Article'}
              </h2>
              <button
                onClick={resetForm}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                <input
                  type="text"
                  value={articleForm.title}
                  onChange={(e) => setArticleForm({...articleForm, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Enter article title"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt</label>
                <textarea
                  value={articleForm.excerpt}
                  onChange={(e) => setArticleForm({...articleForm, excerpt: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows={3}
                  placeholder="Enter a short excerpt"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Content *</label>
                <textarea
                  value={articleForm.content}
                  onChange={(e) => setArticleForm({...articleForm, content: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows={8}
                  placeholder="Enter article content (Markdown supported)"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <input
                  type="text"
                  value={articleForm.imageUrl}
                  onChange={(e) => setArticleForm({...articleForm, imageUrl: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="https://example.com/image.jpg"
                />
                {articleForm.imageUrl && (
                  <div className="mt-2">
                    <img 
                      src={articleForm.imageUrl} 
                      alt="Preview" 
                      className="max-h-40 rounded-md object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/600x400?text=Image+not+found';
                      }}
                    />
                  </div>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                <div className="space-y-2">
                  {articleForm.tags.map((tag, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={tag}
                        onChange={(e) => handleTagChange(index, e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        placeholder={`Tag ${index + 1}`}
                      />
                      {articleForm.tags.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeTag(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  ))}
                  {articleForm.tags.length < 5 && (
                    <button
                      type="button"
                      onClick={addTag}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                    >
                      <PlusCircle className="w-4 h-4 mr-1" />
                      Add tag
                    </button>
                  )}
                </div>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="trending"
                  checked={articleForm.trending}
                  onChange={(e) => setArticleForm({...articleForm, trending: e.target.checked})}
                  className="mr-2 h-4 w-4 text-blue-600 rounded"
                />
                <label htmlFor="trending" className="text-sm text-gray-700">
                  Mark as Trending
                </label>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={resetForm}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={isEditing ? handleEditArticle : handleCreateArticle}
                  disabled={!articleForm.title || !articleForm.content}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isEditing ? 'Update Article' : 'Create Article'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminPage;