import axios from 'axios';

// import {mockArticles} from '../data/mockData'

// console.log(mockArticles)

const API_BASE_URL = 'http://localhost:3000';



// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Important for cookies/sessions
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(config => {
  const tempToken = localStorage.getItem('temp_token');
  
  if (tempToken && !config.headers['Authorization']) {
    config.headers['Authorization'] = `Bearer ${tempToken}`;
  }
  
  return config;
});

// Auth API endpoints
export const authAPI = {
  // Google OAuth login
  googleLogin: () => {
    window.location.href = `${API_BASE_URL}/auth/google`;
  },

  // Check current user session
  getCurrentUser: async () => {
    try {
      const response = await api.get('/auth/user');
      return response.data;
      console.log(response.data,'data')
    } catch (error) {
      return null;
    }
  },

  // Logout
  logout: async () => {
    try {
      await api.post('/auth/logout');
      return true;
    } catch (error) {
      console.error('Logout error:', error);
      return false;
    }
  },
};

// Articles API endpoints
export const articlesAPI = {

   getAdminArticles: async () => {
    try {
      const response = await api.get('/api/admin/articles');
      return response.data;
    } catch (error) {
      console.error('Error fetching admin articles:', error);
      throw error;
    }
  },

  deleteArticle: async (articleId: string) => {
    try {
      await api.delete(`/api/admin/articles/${articleId}`);
    } catch (error) {
      console.error('Error deleting article:', error);
      throw error;
    }
  },

  updateArticle: async (articleId: string, updateData: any) => {
    try {
      const response = await api.put(`/api/admin/articles/${articleId}`, updateData);
      return response.data;
    } catch (error) {
      console.error('Error updating article:', error);
      throw error;
    }
  },

  createArticle: async (articleData: any) => {
    try {
      const response = await api.post('/api/admin/articles', articleData);
      return response.data;
    } catch (error) {
      console.error('Error creating article:', error);
      throw error;
    }
  },
  

  searchArticles: async (query: string) => {
    try {
      const response = await api.get(`/api/articles/search/${query}`);
      return response.data;
    } catch (error) {
      console.error('Error searching articles:', error);
      throw error;
    }
  },



  // Get all articles
  getArticles: async (searchQuery?: string) => {
    try {
      const params = searchQuery ? { search: searchQuery } : {};
      const response = await api.get('/api/articles', { params });
      console.log(response,'response')
      return response.data;
      // return mockArticles
    } catch (error) {
      console.error('Error fetching articles:', error);
      throw error;
    }
  },

  // Get single article by slug
  getArticle: async (slug: string) => {
    try {
      const response = await api.get(`/api/articles/${slug}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching article:', error);
      throw error;
    }
  },

  // Create new article (admin only)
  // createArticle: async (articleData: any) => {
  //   try {
  //     const response = await api.post('/api/article', articleData);
  //     return response.data;
  //   } catch (error) {
  //     console.error('Error creating article:', error);
  //     throw error;
  //   }
  // },

  // Generate article using ChatGPT (admin only)
  generateArticle: async (topic?: string) => {
    try {
      const response = await api.post('/api/admin/generate', { topic });
      // const response = await api.post('/api/generate', { topic });
      console.log(response,'response')
      return response.data;
      
    } catch (error) {
      console.error('Error generating article:', error);
      throw error;
    }
  },
};

// Comments API endpoints
export const commentsAPI = {
  // Get comments for article
  getComments: async (slug: string) => {
    try {
      const response = await api.get(`/api/comments/${slug}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching comments:', error);
      throw error;
    }
  },

  // Post new comment
  postComment: async (slug: string, content: string,userId: string) => {
    console.log(slug,'slugslug')
    console.log(content,'contentcontent')
    console.log(userId ,'userId userId userId ')

    try {
      const response = await api.post('/api/comments', { articleSlug:slug, text:content,userId:userId  });
      console.log(response,'responseslug')
      return response.data;
    } catch (error) {
      console.error('Error posting comment:', error);
      throw error;
    }
  },

  
};

// Articles interaction API
export const interactionAPI = {
  // Like/unlike article
  likeArticle: async (slug: string) => {
    try {
      const response = await api.post(`/api/article/${slug}/like`);
      return response.data;
    } catch (error) {
      console.error('Error liking article:', error);
      throw error;
    }
  },
};

export default api;