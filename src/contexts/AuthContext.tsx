import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';
import { AuthContextType, User, Admin } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock admin data
const mockAdmin: Admin = {
  id: 'admin-1',
  name: 'Admin User',
  email: 'admin@trendwise.com',
  avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
  role: 'admin',
  permissions: ['create_article', 'edit_article', 'delete_article', 'manage_users', 'generate_content']
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // const [user, setUser] = useState<User | null>(null);
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  console.log(user,'gloable user')

  

  useEffect(() => {
    // Check for existing user session on app load
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
    const checkUserSession = async () => {

      try {
        const userData = await authAPI.getCurrentUser();
        console.log(userData,'userData')
        if (userData) {
          setUser(userData);
        }
      } catch (error) {
        console.error('Error checking user session:', error);
      }
      
      // Check for saved admin session
      const savedAdmin = localStorage.getItem('admin');
      if (savedAdmin) {
        setAdmin(JSON.parse(savedAdmin));
      }
      
      setIsLoading(false);
    };

    checkUserSession();
  }, [user]);




 const getUserId = () => user?.id || '';
 console.log(user,'useruseruseruseruser')
//  const value=getUserId()

//  console.log(value,'getUserId')

  const login = () => {
    // Redirect to Google OAuth
    // authAPI.googleLogin();
    window.location.href = 'https://trendwisebackend-vbmx.onrender.com/auth/google';

    // window.location.href = 'http://localhost:3000/auth/google';



  };

  const adminLogin = async (credentials: { email: string; password: string }): Promise<boolean> => {
    // Simulate admin login with credentials
    return new Promise((resolve) => {
      setTimeout(() => {
        if (credentials.email === 'admin@trendwise.com' && credentials.password === 'admin123') {
          setAdmin(mockAdmin);
          localStorage.setItem('admin', JSON.stringify(mockAdmin));
          resolve(true);
        } else {
          resolve(false);
        }
      }, 1000);
    });
  };

  const logout = async () => {
    try {
      await authAPI.logout();
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      // Still clear user state even if API call fails
      setUser(null);
    }finally {
      setUser(null); // This will trigger the useEffect to remove from localStorage
    }
  };

  const adminLogout = () => {
    setAdmin(null);
    localStorage.removeItem('admin');
  };

  return (
    <AuthContext.Provider value={{ user, admin, login,setUser, adminLogin, logout, adminLogout, isLoading ,getUserId}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};




// useEffect(() => {
//   const checkUserSession = async () => {
//     try {
//       // Save token from redirect URL if exists
//       const urlParams = new URLSearchParams(window.location.search);
//       const token = urlParams.get('token');
      
//       if (token) {
//         localStorage.setItem('token', token);
//         window.history.replaceState({}, document.title, window.location.pathname);
//       }

//       // Fetch user using token
//       const tokenFromStorage = localStorage.getItem('token');
//       if (tokenFromStorage) {
//         const userData = await authAPI.getCurrentUser();
//         setUser(userData);
//       }
//     } catch (error) {
//       console.error('Error checking user session:', error);
//     } finally {
//       setIsLoading(false);
//     }

//           const savedAdmin = localStorage.getItem('admin');
//     if (savedAdmin) {
//       setAdmin(JSON.parse(savedAdmin));
//     }
//   };

//   checkUserSession();
// }, []);
