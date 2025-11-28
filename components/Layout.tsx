import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const AppShell = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="relative mx-auto flex h-[100dvh] w-full max-w-md flex-col overflow-hidden bg-background-light dark:bg-background-dark shadow-2xl">
      {children}
    </div>
  );
};

export const BottomNav = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-20 mx-auto max-w-md">
      <div className="flex items-center justify-around border-t border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-background-dark/90 px-2 py-3 backdrop-blur-md">
        <Link to="/app/home" className={`flex flex-1 flex-col items-center gap-1 ${isActive('/app/home') ? 'text-primary' : 'text-text-muted dark:text-gray-400'}`}>
          <span className={`material-symbols-outlined text-2xl ${isActive('/app/home') ? 'filled' : ''}`}>home</span>
          <span className="text-[10px] font-bold">Home</span>
        </Link>
        <Link to="/app/cards" className={`flex flex-1 flex-col items-center gap-1 ${isActive('/app/cards') ? 'text-primary' : 'text-text-muted dark:text-gray-400'}`}>
          <span className={`material-symbols-outlined text-2xl ${isActive('/app/cards') ? 'filled' : ''}`}>credit_card</span>
          <span className="text-[10px] font-medium">Cards</span>
        </Link>
        <Link to="/app/transactions" className={`flex flex-1 flex-col items-center gap-1 ${isActive('/app/transactions') ? 'text-primary' : 'text-text-muted dark:text-gray-400'}`}>
          <span className={`material-symbols-outlined text-2xl ${isActive('/app/transactions') ? 'filled' : ''}`}>analytics</span>
          <span className="text-[10px] font-medium">History</span>
        </Link>
        <Link to="/app/profile" className={`flex flex-1 flex-col items-center gap-1 ${isActive('/app/profile') ? 'text-primary' : 'text-text-muted dark:text-gray-400'}`}>
          <span className={`material-symbols-outlined text-2xl ${isActive('/app/profile') ? 'filled' : ''}`}>person</span>
          <span className="text-[10px] font-medium">Profile</span>
        </Link>
      </div>
    </div>
  );
};