
import React from 'react';
import { useAdmin } from '../../context/AdminContext';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const data = [
  { name: 'Mon', volume: 4000 },
  { name: 'Tue', volume: 3000 },
  { name: 'Wed', volume: 2000 },
  { name: 'Thu', volume: 2780 },
  { name: 'Fri', volume: 1890 },
  { name: 'Sat', volume: 2390 },
  { name: 'Sun', volume: 3490 },
];

export default function Dashboard() {
  const { users } = useAdmin();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
         <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
         <div className="text-sm text-gray-400">Last updated: Just now</div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Users', value: '15,234', trend: '+2.5%', icon: 'group', color: 'text-primary' },
          { label: 'Total Transactions', value: '$2.5M', trend: '-1.2%', icon: 'paid', color: 'text-green-500' },
          { label: 'Active Cards', value: '8,456', trend: '+5.0%', icon: 'credit_card', color: 'text-blue-500' },
          { label: 'Pending Issues', value: '12', trend: '+3.1%', icon: 'pending_actions', color: 'text-orange-500' },
        ].map((stat, i) => (
          <div key={i} className="flex flex-col gap-2 rounded-xl border border-[#4d3267] bg-white/5 p-4 hover:bg-white/10 transition-colors">
            <span className={`material-symbols-outlined ${stat.color} text-3xl`}>{stat.icon}</span>
            <p className="text-white/80 text-sm font-medium leading-normal">{stat.label}</p>
            <p className="tracking-light text-xl font-bold leading-tight text-white">{stat.value}</p>
            <div className="flex items-center gap-1">
              <span className={`material-symbols-outlined text-sm ${stat.trend.startsWith('+') ? 'text-[#0bda73] rotate-45' : 'text-[#fa6f38] rotate-[135deg]'}`}>arrow_upward</span>
              <p className={`text-xs font-medium leading-normal ${stat.trend.startsWith('+') ? 'text-[#0bda73]' : 'text-[#fa6f38]'}`}>{stat.trend}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="flex flex-col gap-4">
        <h2 className="text-[22px] font-bold leading-tight tracking-[-0.015em] text-white">Transaction Volume</h2>
        <div className="rounded-xl border border-[#4d3267] bg-white/5 p-4 h-80">
           <ResponsiveContainer width="100%" height="100%">
             <AreaChart data={data}>
               <defs>
                 <linearGradient id="colorVol" x1="0" y1="0" x2="0" y2="1">
                   <stop offset="5%" stopColor="#7f13ec" stopOpacity={0.8}/>
                   <stop offset="95%" stopColor="#7f13ec" stopOpacity={0}/>
                 </linearGradient>
               </defs>
               <XAxis dataKey="name" stroke="#666" />
               <YAxis stroke="#666" />
               <Tooltip contentStyle={{ backgroundColor: '#191022', border: 'none', borderRadius: '8px' }} />
               <Area type="monotone" dataKey="volume" stroke="#7f13ec" fillOpacity={1} fill="url(#colorVol)" />
             </AreaChart>
           </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="flex flex-col gap-4">
        <h2 className="text-[22px] font-bold leading-tight tracking-[-0.015em] text-white">Recent Activity</h2>
        <div className="bg-white/5 rounded-xl border border-[#4d3267] overflow-hidden">
          <ul className="divide-y divide-white/10">
            {[
              { text: 'New user registration: John D.', time: '2 min ago', icon: 'person_add', color: 'text-primary' },
              { text: 'Transaction approved: $1,250.00', time: '5 min ago', icon: 'credit_score', color: 'text-green-400' },
              { text: 'New support ticket created', time: '1 hour ago', icon: 'confirmation_number', color: 'text-yellow-400' },
              { text: 'System backup completed', time: '2 hours ago', icon: 'backup', color: 'text-blue-400' },
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-4 p-4 hover:bg-white/5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10">
                  <span className={`material-symbols-outlined ${item.color}`}>{item.icon}</span>
                </div>
                <div className="flex flex-1 flex-col">
                  <p className="text-sm font-semibold text-white">{item.text}</p>
                  <p className="text-xs text-white/60">{item.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
