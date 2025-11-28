
import React from 'react';

export default function CardManagement() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-white">Virtual Cards Overview</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <p className="text-gray-400 text-sm">Total Cards</p>
              <p className="text-2xl font-bold text-white mt-1">1,482</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <p className="text-gray-400 text-sm">Active</p>
              <p className="text-2xl font-bold text-white mt-1">1,209</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <p className="text-gray-400 text-sm">Blocked</p>
              <p className="text-2xl font-bold text-white mt-1">88</p>
          </div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
         <div className="p-4 border-b border-white/10">
             <h3 className="font-bold text-white">Card List</h3>
         </div>
         <div className="divide-y divide-white/10">
            {[
                { user: 'Eleanor Pena', number: '**** **** **** 1234', type: 'Virtual', status: 'Active', color: 'bg-green-500' },
                { user: 'Cody Fisher', number: '**** **** **** 5678', type: 'Physical', status: 'Active', color: 'bg-green-500' },
                { user: 'Kristin Watson', number: '**** **** **** 8890', type: 'Virtual', status: 'Blocked', color: 'bg-red-500' },
            ].map((card, i) => (
                <div key={i} className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-8 bg-gray-700 rounded flex items-center justify-center">
                            <span className="material-symbols-outlined text-white text-sm">credit_card</span>
                        </div>
                        <div>
                            <p className="font-bold text-white">{card.user}</p>
                            <p className="text-sm text-gray-400">{card.number} • {card.type}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${card.color}`}></div>
                            <span className="text-sm text-gray-300">{card.status}</span>
                        </div>
                        <button className="text-gray-400 hover:text-white">
                            <span className="material-symbols-outlined">more_vert</span>
                        </button>
                    </div>
                </div>
            ))}
         </div>
      </div>
    </div>
  );
}
