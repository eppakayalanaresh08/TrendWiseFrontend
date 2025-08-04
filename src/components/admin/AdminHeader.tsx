import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Home, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const AdminHeader: React.FC = () => {
  const { admin, adminLogout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    adminLogout();
    navigate('/admin/login');
  };

  const handleBackToSite = () => {
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">TW</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">TrendWise Admin</h1>
              <p className="text-xs text-gray-500">Content Management System</p>
            </div>
          </div>

          {/* Admin Menu */}
          <div className="flex items-center space-x-4">
            <button
              onClick={handleBackToSite}
              className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:block">Back to Site</span>
            </button>

            <div className="flex items-center space-x-3 px-3 py-2 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-gray-900">{admin?.name}</p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-3 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:block">Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;