import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Home() {
  const { user, transactions } = useApp();
  const [showBalance, setShowBalance] = useState(true);
  const navigate = useNavigate();

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
  
  // Get recent transactions (last 3)
  const recentTx = transactions.slice(0, 4);

  return (
    <div className="flex flex-col h-full overflow-y-auto pb-24 bg-background-light dark:bg-background-dark">
      {/* Header */}
      <div className="flex items-center justify-between p-4 sticky top-0 z-10 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <img src={user?.avatar} alt="Profile" className="w-10 h-10 rounded-full object-cover border border-gray-200" />
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">{greeting}</p>
            <h1 className="text-lg font-bold text-slate-900 dark:text-white">Hello, {user?.name.split(' ')[0]}</h1>
          </div>
        </div>
        <Link to="/flow/notifications" className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center text-slate-700 dark:text-gray-200 shadow-sm border border-gray-100 dark:border-gray-700">
          <span className="material-symbols-outlined">notifications</span>
        </Link>
      </div>

      {/* Balance Card */}
      <div className="px-4 py-2">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-purple-500 p-6 shadow-xl shadow-purple-500/20 text-white">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
          
          <div className="flex justify-between items-center mb-2">
            <span className="text-white/80 text-sm font-medium">Total Balance</span>
            <button onClick={() => setShowBalance(!showBalance)} className="text-white/80 hover:text-white">
              <span className="material-symbols-outlined">{showBalance ? 'visibility' : 'visibility_off'}</span>
            </button>
          </div>
          <h2 className="text-4xl font-bold tracking-tight mb-6">
            {showBalance ? `$${user?.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}` : '••••••'}
          </h2>
          
          <div className="flex gap-2">
            <button onClick={() => navigate('/flow/send/contacts')} className="flex-1 bg-white/20 hover:bg-white/30 backdrop-blur-md py-2.5 rounded-xl font-semibold text-sm transition-colors flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-lg">arrow_upward</span> Send
            </button>
            <button className="flex-1 bg-white/20 hover:bg-white/30 backdrop-blur-md py-2.5 rounded-xl font-semibold text-sm transition-colors flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-lg">add</span> Top Up
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-4 gap-4 px-4 py-6">
        {[
          { icon: 'arrow_upward', label: 'Send', path: '/flow/send/contacts' },
          { icon: 'arrow_downward', label: 'Request', path: '#' },
          { icon: 'qr_code_scanner', label: 'Scan', path: '/flow/scan' },
          { icon: 'more_horiz', label: 'More', path: '#' },
        ].map((action, i) => (
          <Link key={i} to={action.path} className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 rounded-2xl bg-white dark:bg-gray-800 flex items-center justify-center shadow-sm text-primary hover:scale-105 transition-transform border border-gray-100 dark:border-gray-700">
              <span className="material-symbols-outlined text-2xl">{action.icon}</span>
            </div>
            <span className="text-xs font-medium text-slate-700 dark:text-gray-300">{action.label}</span>
          </Link>
        ))}
      </div>

      {/* Recent Transactions */}
      <div className="px-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg text-slate-900 dark:text-white">Transactions</h3>
          <Link to="/app/transactions" className="text-primary text-sm font-bold">See All</Link>
        </div>

        <div className="flex flex-col gap-3">
          {recentTx.map(tx => (
            <div key={tx.id} className="flex items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700/50">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${tx.type === 'received' ? 'bg-green-100 text-green-600' : tx.type === 'sent' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                  {tx.counterpartyAvatar ? (
                    <img src={tx.counterpartyAvatar} className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <span className="material-symbols-outlined">{tx.category || (tx.type === 'sent' ? 'arrow_upward' : 'arrow_downward')}</span>
                  )}
                </div>
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">{tx.counterpartyName}</p>
                  <p className="text-xs text-gray-500">{tx.description}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-bold ${tx.type === 'received' || tx.type === 'topup' ? 'text-green-600' : 'text-slate-900 dark:text-white'}`}>
                  {tx.type === 'received' || tx.type === 'topup' ? '+' : '-'}${tx.amount.toFixed(2)}
                </p>
                <p className="text-[10px] text-gray-400">{new Date(tx.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
