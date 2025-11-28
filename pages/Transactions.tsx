import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function Transactions() {
  const { transactions } = useApp();
  const [filter, setFilter] = useState('');

  const filtered = transactions.filter(t => 
    t.counterpartyName.toLowerCase().includes(filter.toLowerCase()) || 
    t.description.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-background-light dark:bg-background-dark pb-24 overflow-hidden">
      <div className="p-4 bg-background-light dark:bg-background-dark sticky top-0 z-10">
        <h1 className="text-xl font-bold text-center mb-4 text-slate-900 dark:text-white">Activity</h1>
        
        {/* Search */}
        <div className="relative">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">search</span>
          <input 
            type="text" 
            placeholder="Search transactions" 
            className="w-full h-12 bg-white dark:bg-gray-800 rounded-full pl-12 pr-4 border-none shadow-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {/* Group by date logic would go here, simplified for now */}
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-500 mb-3 ml-1">Recent</h3>
            <div className="space-y-3">
              {filtered.map(tx => (
                <div key={tx.id} className="flex items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${tx.type === 'received' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'}`}>
                       {tx.counterpartyAvatar ? (
                        <img src={tx.counterpartyAvatar} className="w-full h-full rounded-full object-cover" />
                      ) : (
                        <span className="material-symbols-outlined text-lg">{tx.category || 'payments'}</span>
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-slate-900 dark:text-white truncate">{tx.counterpartyName}</p>
                      <p className="text-xs text-gray-500 truncate">{tx.description} • {new Date(tx.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <span className={`font-bold whitespace-nowrap ${tx.type === 'sent' || tx.type === 'payment' ? 'text-slate-900 dark:text-white' : 'text-green-600'}`}>
                    {tx.type === 'sent' || tx.type === 'payment' ? '-' : '+'}${tx.amount.toFixed(2)}
                  </span>
                </div>
              ))}
              {filtered.length === 0 && (
                <div className="text-center py-10 text-gray-500">
                  No transactions found
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
