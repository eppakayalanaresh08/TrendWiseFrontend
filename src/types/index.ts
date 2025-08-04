export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'user' | 'admin';
}

export interface Admin {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'admin';
  permissions: string[];
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  readTime: number;
  tags: string[];
  imageUrl: string;
  meta: {
    title: string;
    description: string;
    keywords: string[];
  };
  likes: number;
  isLiked?: boolean;
  trending?: boolean;
}

export interface Comment {
  id: string;
  articleSlug: string;
  user: User;
  content: string;
  createdAt: string;
  likes: number;
  isLiked?: boolean;
}

export interface AuthContextType {
  user: User | null;
  admin: Admin | null;
  login: () => void;
  adminLogin: (credentials: { email: string; password: string }) => Promise<boolean>;
  logout: () => void;
  adminLogout: () => void;
  isLoading: boolean;
}