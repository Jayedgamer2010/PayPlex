
import React from 'react';
import { useAdmin } from '../../context/AdminContext';

export default function SecurityCenter() {
  const { securityAlerts, resolveAlert } = useAdmin();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Security Center</h1>
        <div className="flex items-center gap-2 bg-red-500/20 text-red-500 px-4 py-2 rounded-lg">
            <span className="material-symbols-outlined">warning</span>
            <span className="font-bold">{securityAlerts.length} Active Alerts</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <p className="text-gray-400 text-sm">Flagged Transactions</p>
              <p className="text-2xl font-bold text-white mt-1">12</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <p className="text-gray-400 text-sm">Blocked Users</p>
              <p className="text-2xl font-bold text-white mt-1">5</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <p className="text-gray-400 text-sm">Incidents (24h)</p>
              <p className="text-2xl font-bold text-white mt-1">2</p>
          </div>
      </div>

      <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold text-white">Active Alerts</h2>
          {securityAlerts.map(alert => (
              <div key={alert.id} className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                  <div>
                      <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-bold text-white text-lg">{alert.type}</h3>
                          <span className={`px-2 py-0.5 rounded text-xs uppercase font-bold ${
                              alert.severity === 'high' ? 'bg-red-500/20 text-red-500' :
                              alert.severity === 'medium' ? 'bg-yellow-500/20 text-yellow-500' :
                              'bg-blue-500/20 text-blue-500'
                          }`}>
                              {alert.severity} Risk
                          </span>
                      </div>
                      <p className="text-gray-400">{alert.description}</p>
                      <p className="text-xs text-gray-500 mt-2">{alert.timestamp}</p>
                  </div>
                  <div className="flex gap-2 w-full md:w-auto">
                      <button className="flex-1 md:flex-none px-4 py-2 bg-primary/20 text-primary hover:bg-primary/30 rounded-lg text-sm font-bold transition-colors">
                          Investigate
                      </button>
                      <button 
                        onClick={() => resolveAlert(alert.id)}
                        className="flex-1 md:flex-none px-4 py-2 bg-white/5 text-gray-300 hover:bg-white/10 rounded-lg text-sm font-bold transition-colors"
                      >
                          Resolve
                      </button>
                  </div>
              </div>
          ))}
          
          {securityAlerts.length === 0 && (
              <div className="text-center py-10 text-gray-500 bg-white/5 rounded-xl border border-white/5">
                  <span className="material-symbols-outlined text-4xl mb-2">verified_user</span>
                  <p>No active security alerts</p>
              </div>
          )}
      </div>
    </div>
  );
}
