// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { Helmet } from 'react-helmet-async';
// import { ArrowLeft, Clock, Heart, Share2, Calendar, User, Tag } from 'lucide-react';
// import { formatDistanceToNow, format } from 'date-fns';
// import CommentForm from '../components/comments/CommentForm';
// import CommentList from '../components/comments/CommentList';
// import LoadingSpinner from '../components/common/LoadingSpinner';
// import { articlesAPI, commentsAPI, interactionAPI } from '../services/api';
// import { Article, Comment } from '../types';
// import { useAuth } from '../contexts/AuthContext';
// // import {mockArticles} from '../data/mockData'

// const ArticlePage: React.FC = () => {
//   const { slug } = useParams<{ slug: string }>();
//   const navigate = useNavigate();
//   const { user ,getUserId} = useAuth();
//   console.log(user,'user')
//   const [article, setArticle] = useState<Article | null>(null);
//   const [comments, setComments] = useState<Comment[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isLiked, setIsLiked] = useState(false);
//   const [likes, setLikes] = useState(0);

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
//       author: apiArticle.author || 'TrendWise Editor',
//       tags: apiArticle.meta?.keywords || ['Technology'],
//       trending: apiArticle.trending || false,
//       isLiked: apiArticle.isLiked || false,
//       likes: apiArticle.likes || [],
//       content: apiArticle.content || ''
//     };
//   };


//   const transformComment = (backendComment: any): Comment => {
//     return {
//       id: backendComment._id,
//       user: {
//         name: backendComment.userId?.displayName || 'Anonymous',
//         avatar: backendComment.userId?.avatar || 
//           `https://ui-avatars.com/api/?name=${encodeURIComponent(
//             backendComment.userId?.displayName || 'A'
//           )}&background=random`
//       },
//       content: backendComment.text,
//       createdAt: backendComment.createdAt,
//       likes: backendComment.likes?.length || 0,  // Default to 0 if no likes array
//       isLiked: backendComment.isLiked || false  // Default to false
//     };
//   };

  

//   useEffect(() => {
//     if (!slug) return;

//     const fetchArticleData = async () => {
//       try {
//         setIsLoading(true);
        
//         // Fetch article and comments in parallel
//         const [articleData, backendComments] = await Promise.all([

//           articlesAPI.getArticle(slug),
//           commentsAPI.getComments(slug)
//         ]);
//         console.log(articleData,'articleData')
//         if (articleData) {
//           // setArticle(articleData);
//           // setIsLiked(articleData.isLiked || false);
//           // setLikes(articleData.likes);

//           const transformed = transformArticle(articleData);
//           setArticle(transformed);
//           setIsLiked(transformed.isLiked);
//           setLikes(transformed.likes?.length || 0);
//         }
        
//         // setComments(commentsData || []);
//         const transformedComments = backendComments.map(comment => 
//           transformComment(comment)
//         );
        
//         setComments(transformedComments);
//       } catch (error) {

        
//         console.error('Error fetching article data:', error);
//         setArticle(null);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchArticleData();
//   }, [slug]);

//   const handleLike = async () => {
//     if (!user) return;
    
//     try {
//       const result = await interactionAPI.likeArticle(slug!);
//       setIsLiked(result.isLiked);
//       setLikes(result.likes);
//     } catch (error) {
//       console.error('Error liking article:', error);
//     }
//   };

//   const handleShare = async () => {
//     if (navigator.share && article) {
//       try {
//         await navigator.share({
//           title: article.title,
//           text: article.excerpt,
//           url: window.location.href,
//         });
//       } catch (error) {
//         console.log('Share failed:', error);
//       }
//     } else {
//       // Fallback to clipboard
//       navigator.clipboard.writeText(window.location.href);
//       // You could show a toast notification here
//     }
//   };

//   const handleCommentSubmit = async (content: string) => {
//     if (!user || !article) return;

//     try {
//       const newComment = await commentsAPI.postComment(article.slug, content, getUserId() );
//       console.log(newComment,'newCommentnewComment')
//       // setComments(prev => [newComment, ...prev]);
//       const transformedComment = transformComment(newComment);
//     setComments(prev => [transformedComment, ...prev]);
//     } catch (error) {
//       console.error('Error posting comment:', error);
//     }
//   };

//   const handleCommentLike = async (commentId: string) => {
//     if (!user) return;

//     try {
//       const result = await commentsAPI.likeComment(commentId);
//       setComments(prev => prev.map(comment => {
//         if (comment.id === commentId) {
//           return {
//             ...comment,
//             isLiked: result.isLiked,
//             likes: result.likes
//           };
//         }
//         return comment;
//       }));
//     } catch (error) {
//       console.error('Error liking comment:', error);
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <LoadingSpinner size="lg" />
//       </div>
//     );
//   }

//   if (!article) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <h1 className="text-4xl font-bold text-gray-900 mb-4">Article Not Found</h1>
//           <p className="text-gray-600 mb-8">The article you're looking for doesn't exist.</p>
//           <button
//             onClick={() => navigate('/')}
//             className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
//           >
//             Back to Home
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <Helmet>
//         <title>{article.meta.title}</title>
//         <meta name="description" content={article.meta.description} />
//         <meta name="keywords" content={article.meta.keywords.join(', ')} />
        
//         {/* Open Graph */}
//         <meta property="og:title" content={article.meta.title} />
//         <meta property="og:description" content={article.meta.description} />
//         <meta property="og:type" content="article" />
//         <meta property="og:image" content={article.imageUrl} />
//         <meta property="og:url" content={window.location.href} />
        
//         {/* Twitter Card */}
//         <meta name="twitter:card" content="summary_large_image" />
//         <meta name="twitter:title" content={article.meta.title} />
//         <meta name="twitter:description" content={article.meta.description} />
//         <meta name="twitter:image" content={article.imageUrl} />
        
//         {/* Article specific meta */}
//         <meta property="article:author" content={article.author} />
//         <meta property="article:published_time" content={article.publishedAt} />
//         {article.tags.map(tag => (
//           <meta key={tag} property="article:tag" content={tag} />
//         ))}
//       </Helmet>

//       <div className="min-h-screen bg-gray-50">
//         {/* Back Button */}
//         <div className="bg-white border-b border-gray-200">
//           <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//             <button
//               onClick={() => navigate('/')}
//               className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
//             >
//               <ArrowLeft className="w-5 h-5" />
//               <span>Back to articles</span>
//             </button>
//           </div>
//         </div>

//         {/* Article Header */}
//         <article className="bg-white">
//           <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//             <header className="mb-8">
//               <div className="flex flex-wrap items-center gap-2 mb-4">
//                 {article.tags.map(tag => (
//                   <span
//                     key={tag}
//                     className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-medium"
//                   >
//                     {tag}
//                   </span>
//                 ))}
//               </div>
              
//               <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
//                 {article.title}
//               </h1>
              
//               <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8">
//                 <div className="flex items-center space-x-2">
//                   <User className="w-5 h-5" />
//                   <span className="font-medium">{article.author}</span>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <Calendar className="w-5 h-5" />
//                   <span>{format(new Date(article.publishedAt), 'MMMM d, yyyy')}</span>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <Clock className="w-5 h-5" />
//                   <span>{article.readTime} min read</span>
//                 </div>
//               </div>

//               {/* Action Buttons */}
//               <div className="flex items-center space-x-4 mb-8">
//                 <button
//                   onClick={handleLike}
//                   className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors duration-200 ${
//                     isLiked 
//                       ? 'bg-red-50 border-red-200 text-red-600' 
//                       : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-red-50 hover:border-red-200 hover:text-red-600'
//                   }`}
//                   disabled={!user}
//                 >
//                   <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
//                   <span>{likes}</span>
//                 </button>
                
//                 <button
//                   onClick={handleShare}
//                   className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors duration-200"
//                 >
//                   <Share2 className="w-5 h-5" />
//                   <span>Share</span>
//                 </button>
//               </div>
//             </header>

//             {/* Featured Image */}
//             <div className="mb-12">
//               <img
//                 src={article.imageUrl}
//                 alt={article.title}
//                 className="w-full h-96 object-cover rounded-xl"
//               />
//             </div>

//             {/* Article Content */}
//             <div 
//               className="prose prose-lg max-w-none mb-12"
//               dangerouslySetInnerHTML={{ __html: article.content }}
//             />
//           </div>
//         </article>

//         {/* Comments Section */}
//         <div className="bg-gray-50 py-12">
//           <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//             <h2 className="text-2xl font-bold text-gray-900 mb-8">
//               Comments ({comments.length})
//             </h2>
            
//             <div className="space-y-8">
//               <CommentForm 
//                 articleSlug={article.slug} 
//                 onCommentSubmit={handleCommentSubmit}
//               />
              
//               <CommentList 
//                 comments={comments}
//                 onLikeComment={handleCommentLike}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ArticlePage;




import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Clock, Heart, Share2, Calendar, User, Tag } from 'lucide-react';
import { formatDistanceToNow, format } from 'date-fns';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import CommentForm from '../components/comments/CommentForm';
import CommentList from '../components/comments/CommentList';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { articlesAPI, commentsAPI, interactionAPI } from '../services/api';
import { Article, Comment } from '../types';
import { useAuth } from '../contexts/AuthContext';

const ArticlePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { user, getUserId } = useAuth();
  const [article, setArticle] = useState<Article | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [likeLoading, setLikeLoading] = useState(false);

  console.log(isLiked,'isLiked')

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
      author: apiArticle.author || 'TrendWise Editor',
      tags: apiArticle.meta?.keywords || ['Technology'],
      trending: apiArticle.trending || false,
      isLiked: apiArticle.isLiked || false,
      likesCount: apiArticle.likesCount || apiArticle.likes?.length || 0,
      content: apiArticle.content || ''
    };
  };

  const transformComment = (backendComment: any): Comment => {
    return {
      id: backendComment._id,
      user: {
        name: backendComment.userId?.displayName || 'Anonymous',
        avatar: backendComment.userId?.avatar || 
          `https://ui-avatars.com/api/?name=${encodeURIComponent(
            backendComment.userId?.displayName || 'A'
          )}&background=random`
      },
      content: backendComment.text,
      createdAt: backendComment.createdAt,
      likes: backendComment.likes?.length || 0,
      isLiked: backendComment.isLiked || false
    };
  };

  useEffect(() => {
    if (!slug) return;

    const fetchArticleData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch article and comments in parallel
        const [articleData, backendComments] = await Promise.all([
          articlesAPI.getArticle(slug),
          commentsAPI.getComments(slug)
        ]);

        console.log(articleData,'articleData')

        if (articleData) {
          const transformed = transformArticle(articleData);
          console.log(transformed,'transformed')
          setArticle(transformed);
          setIsLiked(transformed.isLiked);
          setLikesCount(transformed.likesCount);
        }
        
        const transformedComments = backendComments.map(comment => 
          transformComment(comment)
        );
        setComments(transformedComments);
      } catch (error) {
        console.error('Error fetching article data:', error);
        toast.error('Failed to load article');
        setArticle(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticleData();
  }, [slug]);

  const handleLike = async () => {
    if (!user) {
      toast.info('Please login to like articles');
      navigate('/login');
      return;
    }
    
    if (likeLoading) return;
    
    setLikeLoading(true);
    try {
      const result = await interactionAPI.likeArticle(slug!);
      setIsLiked(result.isLiked);
      setLikesCount(result.likesCount);
      
      toast.success(result.isLiked ? 'Article liked!' : 'Article unliked');
    } catch (error) {
      console.error('Error liking article:', error);
      toast.error('Failed to update like status');
    } finally {
      setLikeLoading(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share && article) {
      try {
        await navigator.share({
          title: article.title,
          text: article.excerpt,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Share failed:', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  const handleCommentSubmit = async (content: string) => {
    if (!user || !article) return;

    try {
      const newComment = await commentsAPI.postComment(article.slug, content, getUserId());
      const transformedComment = transformComment(newComment);
      setComments(prev => [transformedComment, ...prev]);
      toast.success('Comment posted!');
    } catch (error) {
      console.error('Error posting comment:', error);
      toast.error('Failed to post comment');
    }
  };

  const handleCommentLike = async (commentId: string) => {
    if (!user) {
      toast.info('Please login to like comments');
      return;
    }

    try {
      const result = await commentsAPI.likeComment(commentId);
      setComments(prev => prev.map(comment => {
        if (comment.id === commentId) {
          return {
            ...comment,
            isLiked: result.isLiked,
            likes: result.likesCount
          };
        }
        return comment;
      }));
    } catch (error) {
      console.error('Error liking comment:', error);
      toast.error('Failed to like comment');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Article Not Found</h1>
          <p className="text-gray-600 mb-8">The article you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{article.title}</title>
        <meta name="description" content={article.excerpt} />
        <meta name="keywords" content={article.tags.join(', ')} />
        
        {/* Open Graph */}
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={article.imageUrl} />
        <meta property="og:url" content={window.location.href} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.title} />
        <meta name="twitter:description" content={article.excerpt} />
        <meta name="twitter:image" content={article.imageUrl} />
        
        {/* Article specific meta */}
        <meta property="article:author" content={article.author} />
        <meta property="article:published_time" content={article.publishedAt} />
        {article.tags.map(tag => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Back Button */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to articles</span>
            </button>
          </div>
        </div>

        {/* Article Header */}
        <article className="bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <header className="mb-8">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                {article.tags.map(tag => (
                  <span
                    key={tag}
                    className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                {article.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8">
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span className="font-medium">{article.author}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span>{format(new Date(article.publishedAt), 'MMMM d, yyyy')}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span>{article.readTime} min read</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-4 mb-8">
                <button
                  onClick={handleLike}
                  disabled={likeLoading}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors duration-200 ${
                    isLiked 
                      ? 'bg-red-50 border-red-200 text-red-600' 
                      : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-red-50 hover:border-red-200 hover:text-red-600'
                  } ${likeLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                  aria-label={isLiked ? 'Unlike article' : 'Like article'}
                >
                  {likeLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current"></div>
                  ) : (
                    <motion.span
                      animate={{ scale: isLiked ? [1, 1.2, 1] : 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                    </motion.span>
                  )}
                  <span>{likesCount}</span>
                </button>
                
                <button
                  onClick={handleShare}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors duration-200"
                >
                  <Share2 className="w-5 h-5" />
                  <span>Share</span>
                </button>
              </div>
            </header>

            {/* Featured Image */}
            <div className="mb-12">
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-96 object-cover rounded-xl"
              />
            </div>

            {/* Article Content */}
            <div 
              className="prose prose-lg max-w-none mb-12"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </div>
        </article>

        {/* Comments Section */}
        <div className="bg-gray-50 py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Comments ({comments.length})
            </h2>
            
            <div className="space-y-8">
              <CommentForm 
                articleSlug={article.slug} 
                onCommentSubmit={handleCommentSubmit}
              />
              
              <CommentList 
                comments={comments}
                onLikeComment={handleCommentLike}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArticlePage;