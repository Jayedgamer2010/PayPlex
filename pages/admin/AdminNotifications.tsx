
import React from 'react';
import { useAdmin } from '../../context/AdminContext';

export default function AdminNotifications() {
  const { securityAlerts } = useAdmin();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-white">System Notifications</h1>

      <div className="flex gap-4 border-b border-white/10 pb-4">
          {['All', 'Critical', 'Warnings', 'Info'].map(tab => (
              <button key={tab} className={`text-sm font-bold ${tab === 'All' ? 'text-primary' : 'text-gray-500 hover:text-white'}`}>
                  {tab}
              </button>
          ))}
      </div>

      <div className="space-y-3">
          {securityAlerts.map(alert => (
              <div key={alert.id} className="bg-white/5 border border-white/10 rounded-xl p-4 flex gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
                      alert.severity === 'high' ? 'bg-red-500/20 text-red-500' :
                      alert.severity === 'medium' ? 'bg-yellow-500/20 text-yellow-500' :
                      'bg-blue-500/20 text-blue-500'
                  }`}>
                      <span className="material-symbols-outlined">security</span>
                  </div>
                  <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                          <span className={`text-xs font-bold px-2 py-0.5 rounded-full uppercase ${
                               alert.severity === 'high' ? 'bg-red-500/20 text-red-500' :
                               alert.severity === 'medium' ? 'bg-yellow-500/20 text-yellow-500' :
                               'bg-blue-500/20 text-blue-500'
                          }`}>
                              {alert.severity}
                          </span>
                          <span className="text-xs text-gray-500">{alert.timestamp}</span>
                      </div>
                      <p className="text-white font-medium">{alert.type}</p>
                      <p className="text-sm text-gray-400">{alert.description}</p>
                  </div>
              </div>
          ))}
      </div>
    </div>
  );
}
