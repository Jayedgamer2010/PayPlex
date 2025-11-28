import React from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

export default function Notifications() {
  const { notifications, markNotificationRead } = useApp();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full bg-background-light dark:bg-background-dark">
      <div className="p-4 flex items-center gap-4 sticky top-0 bg-background-light/95 dark:bg-background-dark/95 z-10 backdrop-blur-sm">
        <button onClick={() => navigate(-1)} className="text-slate-900 dark:text-white">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-xl font-bold text-slate-900 dark:text-white">Notifications</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-6 space-y-3">
        {notifications.map(item => (
          <div 
            key={item.id} 
            onClick={() => markNotificationRead(item.id)}
            className={`flex gap-4 p-4 rounded-xl border border-gray-100 dark:border-gray-700/50 ${item.read ? 'bg-white/50 dark:bg-gray-800/50' : 'bg-white dark:bg-gray-800 shadow-sm border-l-4 border-l-primary'}`}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
              item.type === 'payment' ? 'bg-blue-100 text-blue-600' : 
              item.type === 'security' ? 'bg-orange-100 text-orange-600' : 'bg-purple-100 text-purple-600'
            }`}>
              <span className="material-symbols-outlined text-xl">
                {item.type === 'payment' ? 'payments' : item.type === 'security' ? 'security' : 'redeem'}
              </span>
            </div>
            <div className="flex-1">
               <div className="flex justify-between items-start">
                  <h4 className={`font-bold text-sm mb-1 ${item.read ? 'text-gray-700 dark:text-gray-300' : 'text-slate-900 dark:text-white'}`}>{item.title}</h4>
                  <span className="text-[10px] text-gray-400 whitespace-nowrap ml-2">{item.date}</span>
               </div>
               <p className="text-xs text-gray-500 leading-relaxed">{item.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
