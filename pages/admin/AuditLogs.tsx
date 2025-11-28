
import React from 'react';
import { useAdmin } from '../../context/AdminContext';

export default function AuditLogs() {
  const { auditLogs } = useAdmin();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-white">System Audit Logs</h1>
      
      <div className="relative">
         <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">search</span>
         <input type="text" placeholder="Search logs..." className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:ring-1 focus:ring-primary" />
      </div>

      <div className="space-y-3">
         {auditLogs.map(log => (
            <details key={log.id} className="group bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                <summary className="flex cursor-pointer items-center justify-between p-4 hover:bg-white/5 transition-colors">
                    <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${log.status === 'success' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                            <span className="material-symbols-outlined text-lg">{log.status === 'success' ? 'check_circle' : 'error'}</span>
                        </div>
                        <div>
                            <p className="font-bold text-white">{log.action}</p>
                            <p className="text-sm text-gray-400">{log.adminName} • {new Date(log.timestamp).toLocaleString()}</p>
                        </div>
                    </div>
                    <span className="material-symbols-outlined text-gray-400 transition-transform group-open:rotate-180">expand_more</span>
                </summary>
                <div className="p-4 bg-black/20 border-t border-white/10">
                    <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                        <div>
                            <span className="text-gray-500 block">IP Address</span>
                            <span className="text-white font-mono">{log.ip}</span>
                        </div>
                        <div>
                            <span className="text-gray-500 block">Target ID</span>
                            <span className="text-white font-mono">{log.target}</span>
                        </div>
                    </div>
                    <div>
                        <span className="text-gray-500 block mb-1">Details</span>
                        <div className="bg-black/40 p-3 rounded-lg font-mono text-xs text-gray-300">
                            {log.details}
                        </div>
                    </div>
                </div>
            </details>
         ))}
      </div>
    </div>
  );
}
