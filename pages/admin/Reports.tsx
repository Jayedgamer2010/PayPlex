
import React from 'react';

export default function Reports() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-white">Generate Custom Report</h1>

      <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-6">
          <div>
              <label className="block text-sm font-medium text-white mb-2">Report Type</label>
              <div className="flex flex-wrap gap-2">
                  {['User Report', 'Transaction', 'Revenue', 'Audit Log', 'Custom'].map(type => (
                      <button key={type} className="px-4 py-2 rounded-lg bg-[#482323] hover:bg-primary text-white text-sm transition-colors">
                          {type}
                      </button>
                  ))}
              </div>
          </div>

          <div>
              <label className="block text-sm font-medium text-white mb-2">Date Range</label>
              <div className="flex items-center bg-[#331919] border border-[#673232] rounded-lg px-4 py-3">
                  <input type="text" readOnly value="Aug 1, 2024 - Aug 31, 2024" className="bg-transparent border-none text-white w-full focus:ring-0" />
                  <span className="material-symbols-outlined text-gray-400">calendar_month</span>
              </div>
          </div>

          <div>
              <label className="block text-sm font-medium text-white mb-2">Export Format</label>
              <div className="flex gap-3">
                  <button className="flex-1 py-3 rounded-lg bg-[#482323] text-white text-sm font-bold">PDF</button>
                  <button className="flex-1 py-3 rounded-lg bg-primary text-white text-sm font-bold">Excel</button>
                  <button className="flex-1 py-3 rounded-lg bg-[#482323] text-white text-sm font-bold">CSV</button>
              </div>
          </div>
      </div>

      <button className="w-full py-4 bg-primary rounded-xl text-white font-bold text-lg hover:bg-primary/90 transition-colors">
          Generate Report
      </button>
    </div>
  );
}
