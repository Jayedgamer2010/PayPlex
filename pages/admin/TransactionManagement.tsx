
import React from 'react';

export default function TransactionManagement() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-white">All Transactions</h1>
      
      <div className="flex flex-wrap gap-2">
         {['Date Range', 'Type', 'Status', 'Amount'].map(label => (
             <button key={label} className="flex items-center gap-2 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg border border-white/10 text-sm text-gray-300">
                 {label} <span className="material-symbols-outlined text-lg">arrow_drop_down</span>
             </button>
         ))}
      </div>

      <div className="space-y-4">
          {[
              { id: 'TX7892345', user: 'Alex Morgan', type: 'received', amount: 50.00, status: 'Success', date: 'Today, 10:45 AM' },
              { id: 'TX7892346', user: 'Olivia Chen', type: 'sent', amount: 120.75, status: 'Pending', date: 'Today, 09:12 AM' },
              { id: 'TX7892347', user: 'Ben Carter', type: 'received', amount: 250.00, status: 'Failed', date: 'Yesterday, 06:30 PM' },
          ].map(tx => (
              <div key={tx.id} className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          tx.status === 'Success' ? 'bg-green-500/20 text-green-500' :
                          tx.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-500' :
                          'bg-red-500/20 text-red-500'
                      }`}>
                          <span className="material-symbols-outlined">
                              {tx.type === 'received' ? 'arrow_downward' : 'arrow_upward'}
                          </span>
                      </div>
                      <div>
                          <p className="font-bold text-white">{tx.type === 'received' ? 'From' : 'To'}: {tx.user}</p>
                          <p className="text-sm text-gray-400">{tx.date} • <span className="font-mono">{tx.id}</span></p>
                      </div>
                  </div>
                  
                  <div className="flex flex-row sm:flex-col items-center sm:items-end w-full sm:w-auto justify-between">
                      <span className={`font-bold text-lg ${tx.type === 'received' ? 'text-green-400' : 'text-white'}`}>
                          {tx.type === 'received' ? '+' : '-'}${tx.amount.toFixed(2)}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-xs font-medium mt-1 ${
                          tx.status === 'Success' ? 'bg-green-500/10 text-green-400' :
                          tx.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-400' :
                          'bg-red-500/10 text-red-400'
                      }`}>
                          {tx.status}
                      </span>
                  </div>
              </div>
          ))}
      </div>
    </div>
  );
}
