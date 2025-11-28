
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const revenueData = [
  { name: 'W1', value: 45000 },
  { name: 'W2', value: 52000 },
  { name: 'W3', value: 48000 },
  { name: 'W4', value: 61000 },
];

const pieData = [
  { name: 'P2P', value: 60, color: '#8A2BE2' },
  { name: 'Bill Pay', value: 25, color: '#4A90E2' },
  { name: 'Merchant', value: 15, color: '#38bdf8' },
];

export default function Analytics() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-white">Analytics Dashboard</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         {/* Revenue Trends */}
         <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Revenue Trends</h3>
            <div className="h-64">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData}>
                     <defs>
                        <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#4A90E2" stopOpacity={0.8}/>
                           <stop offset="95%" stopColor="#4A90E2" stopOpacity={0}/>
                        </linearGradient>
                     </defs>
                     <XAxis dataKey="name" stroke="#666" />
                     <YAxis stroke="#666" />
                     <Tooltip contentStyle={{ backgroundColor: '#191022', border: 'none' }} />
                     <Area type="monotone" dataKey="value" stroke="#4A90E2" fillOpacity={1} fill="url(#colorRev)" />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
         </div>

         {/* Transaction Distribution */}
         <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Transaction Distribution</h3>
            <div className="flex items-center justify-center h-64">
               <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                     <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                     >
                        {pieData.map((entry, index) => (
                           <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                     </Pie>
                     <Tooltip contentStyle={{ backgroundColor: '#191022', border: 'none' }} />
                  </PieChart>
               </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 mt-4">
                {pieData.map(item => (
                    <div key={item.name} className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                        <span className="text-sm text-gray-300">{item.name}</span>
                    </div>
                ))}
            </div>
         </div>
      </div>
    </div>
  );
}
