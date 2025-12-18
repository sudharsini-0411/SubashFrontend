import React from 'react';
import { Wifi, Home, History, Settings, LogOut } from 'lucide-react';

const Navbar = ({ 
  user, 
  theme, 
  currentPage, 
  onPageChange, 
  onAuthClick, 
  onLogout 
}) => {
  return (
    <nav className="relative z-20 max-w-6xl mx-auto flex justify-between items-center mb-10">
      <div className="flex items-center gap-2">
        <div className={`p-2 rounded-xl bg-gradient-to-br ${theme.gradient} text-white shadow-md`}>
          <Wifi size={20} />
        </div>
        <span className="font-bold text-xl tracking-tight text-gray-900">
          Recharge<span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme.gradient}`}>Hub</span>
        </span>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-white rounded-full p-1 shadow-sm border border-gray-100">
          <button
            onClick={() => onPageChange('home')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              currentPage === 'home'
                ? `bg-gradient-to-r ${theme.gradient} text-white shadow-md`
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Home size={16} />
            Home
          </button>
          <button
            onClick={() => onPageChange('history')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              currentPage === 'history'
                ? `bg-gradient-to-r ${theme.gradient} text-white shadow-md`
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <History size={16} />
            History
          </button>
          {user?.isAdmin && (
            <button
              onClick={() => onPageChange('admin')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                currentPage === 'admin'
                  ? `bg-gradient-to-r ${theme.gradient} text-white shadow-md`
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Settings size={16} />
              Admin
            </button>
          )}
        </div>

        {user ? (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 bg-white pl-2 pr-4 py-1.5 rounded-full shadow-sm border border-gray-100">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold bg-gradient-to-r ${theme.gradient}`}>
                {user.name[0].toUpperCase()}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-gray-800 leading-none">{user.name}</span>
                <span className="text-xs text-gray-400 leading-none mt-1">Free User</span>
              </div>
            </div>
            <button 
              onClick={onLogout}
              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
              title="Logout"
            >
              <LogOut size={20} />
            </button>
          </div>
        ) : (
          <button 
            onClick={onAuthClick}
            className={`px-6 py-2.5 rounded-full font-semibold text-sm text-white shadow-lg transition-transform active:scale-95 bg-gradient-to-r ${theme.gradient}`}
          >
            Login / Sign Up
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
