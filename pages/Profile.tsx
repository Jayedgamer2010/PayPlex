import React from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const { user, logout, toggleTheme, isDarkMode } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  return (
    <div className="flex flex-col h-full bg-background-light dark:bg-background-dark pb-24 overflow-y-auto">
      <div className="p-4 flex items-center justify-center relative">
        <h1 className="text-lg font-bold text-slate-900 dark:text-white">Profile</h1>
      </div>

      <div className="flex flex-col items-center py-6">
        <div className="relative">
          <img src={user?.avatar} alt="Profile" className="w-28 h-28 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-lg" />
          <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white border-2 border-white dark:border-gray-800">
            <span className="material-symbols-outlined text-sm">edit</span>
          </button>
        </div>
        <h2 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">{user?.name}</h2>
        <p className="text-gray-500">{user?.email}</p>
      </div>

      <div className="px-4 space-y-2 mt-4">
        {[
          { icon: 'account_balance', label: 'Linked Banks', path: '#' },
          { icon: 'shield', label: 'Security', path: '#' },
          { icon: 'notifications', label: 'Notifications', path: '/flow/notifications' },
          { icon: 'help', label: 'Help & Support', path: '#' },
        ].map((item, i) => (
          <button key={i} className="w-full flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">{item.icon}</span>
              </div>
              <span className="font-medium text-slate-900 dark:text-white">{item.label}</span>
            </div>
            <span className="material-symbols-outlined text-gray-400">chevron_right</span>
          </button>
        ))}

        <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm mt-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300">
                <span className="material-symbols-outlined">dark_mode</span>
              </div>
              <span className="font-medium text-slate-900 dark:text-white">Dark Mode</span>
            </div>
            <button onClick={toggleTheme} className={`w-12 h-6 rounded-full p-1 transition-colors ${isDarkMode ? 'bg-primary' : 'bg-gray-300'}`}>
              <div className={`w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform ${isDarkMode ? 'translate-x-6' : ''}`} />
            </button>
        </div>

        <button onClick={handleLogout} className="w-full flex items-center gap-4 p-4 mt-6 text-red-500 font-medium hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-colors">
          <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
            <span className="material-symbols-outlined">logout</span>
          </div>
          Log Out
        </button>
      </div>
    </div>
  );
}
