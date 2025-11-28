
import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';

export default function UserManagement() {
  const { users, updateUserStatus, deleteUser } = useAdmin();
  const [filter, setFilter] = useState<'all' | 'active' | 'suspended'>('all');
  const [search, setSearch] = useState('');

  const filteredUsers = users.filter(u => {
    const matchesFilter = filter === 'all' || u.status === filter;
    const matchesSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-white">User Management</h1>
        <button className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg transition-colors">
          <span className="material-symbols-outlined">add</span>
          Add User
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">search</span>
          <input 
            type="text" 
            placeholder="Search users..." 
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:ring-1 focus:ring-primary focus:border-primary"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2 bg-white/5 p-1 rounded-xl border border-white/10">
          {(['all', 'active', 'suspended'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${filter === f ? 'bg-primary text-white' : 'text-gray-400 hover:text-white'}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Users List */}
      <div className="grid gap-4">
        <div className="hidden md:grid grid-cols-12 gap-4 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
           <div className="col-span-5">User</div>
           <div className="col-span-3 text-right">Balance</div>
           <div className="col-span-3 text-center">Status</div>
           <div className="col-span-1"></div>
        </div>
        
        {filteredUsers.map(user => (
          <div key={user.id} className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col md:grid md:grid-cols-12 gap-4 items-center">
             <div className="flex items-center gap-4 w-full md:col-span-5">
               <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full object-cover" />
               <div>
                 <p className="font-bold text-white">{user.name}</p>
                 <p className="text-sm text-gray-400">{user.email}</p>
               </div>
             </div>
             
             <div className="w-full md:col-span-3 flex justify-between md:justify-end">
               <span className="md:hidden text-gray-400 text-sm">Balance:</span>
               <span className="font-mono text-white font-medium">${user.balance.toLocaleString()}</span>
             </div>

             <div className="w-full md:col-span-3 flex justify-between md:justify-center">
               <span className="md:hidden text-gray-400 text-sm">Status:</span>
               <span className={`px-3 py-1 rounded-full text-xs font-medium uppercase ${
                 user.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
               }`}>
                 {user.status}
               </span>
             </div>

             <div className="w-full md:col-span-1 flex justify-end">
               <div className="relative group">
                 <button className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white">
                   <span className="material-symbols-outlined">more_vert</span>
                 </button>
                 {/* Dropdown Menu (Hover based for demo) */}
                 <div className="absolute right-0 top-full mt-2 w-48 bg-[#191022] border border-white/10 rounded-xl shadow-xl z-20 hidden group-hover:block">
                    <button className="w-full text-left px-4 py-3 hover:bg-white/5 text-sm text-white flex items-center gap-2">
                       <span className="material-symbols-outlined text-lg">visibility</span> View Details
                    </button>
                    {user.status === 'active' ? (
                       <button onClick={() => updateUserStatus(user.id, 'suspended')} className="w-full text-left px-4 py-3 hover:bg-white/5 text-sm text-yellow-500 flex items-center gap-2">
                          <span className="material-symbols-outlined text-lg">block</span> Suspend
                       </button>
                    ) : (
                       <button onClick={() => updateUserStatus(user.id, 'active')} className="w-full text-left px-4 py-3 hover:bg-white/5 text-sm text-green-500 flex items-center gap-2">
                          <span className="material-symbols-outlined text-lg">check_circle</span> Activate
                       </button>
                    )}
                    <button onClick={() => deleteUser(user.id)} className="w-full text-left px-4 py-3 hover:bg-white/5 text-sm text-red-500 flex items-center gap-2">
                       <span className="material-symbols-outlined text-lg">delete</span> Delete
                    </button>
                 </div>
               </div>
             </div>
          </div>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No users found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
}
