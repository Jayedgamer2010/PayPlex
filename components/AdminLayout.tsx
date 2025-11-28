
import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';

export default function AdminLayout() {
  const { admin } = useAdmin();
  const location = useLocation();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (path: string) => location.pathname.includes(path);

  const NavItem = ({ to, icon, label }: { to: string, icon: string, label: string }) => (
    <Link 
      to={to} 
      className={`flex h-12 items-center gap-4 rounded-lg px-4 transition-colors ${isActive(to) ? 'bg-primary/20 text-primary' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
      onClick={() => setSidebarOpen(false)}
    >
      <span className={`material-symbols-outlined ${isActive(to) ? 'filled' : ''}`}>{icon}</span>
      <span className="text-sm font-semibold">{label}</span>
    </Link>
  );

  return (
    <div className="flex min-h-screen bg-background-dark text-white font-display">
      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
            className="fixed inset-0 z-40 bg-black/60 lg:hidden" 
            onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#120c1a] border-r border-white/5 transform transition-transform duration-300 lg:translate-x-0 lg:static ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-full flex flex-col p-4">
          <div className="flex items-center gap-3 px-2 pb-8 pt-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-white">shield</span>
            </div>
            <span className="text-xl font-bold">PayFlex Admin</span>
          </div>

          <nav className="flex-1 flex flex-col gap-2 overflow-y-auto">
             <NavItem to="/admin/dashboard" icon="dashboard" label="Dashboard" />
             <NavItem to="/admin/users" icon="group" label="User Management" />
             <NavItem to="/admin/transactions" icon="receipt_long" label="Transactions" />
             <NavItem to="/admin/cards" icon="credit_card" label="Card Management" />
             <NavItem to="/admin/analytics" icon="bar_chart" label="Analytics" />
             <NavItem to="/admin/security" icon="security" label="Security Center" />
             <NavItem to="/admin/notifications" icon="notifications" label="Notifications" />
             <NavItem to="/admin/reports" icon="summarize" label="Reports" />
             <NavItem to="/admin/logs" icon="article" label="Audit Logs" />
             <NavItem to="/admin/settings" icon="settings" label="Settings" />
          </nav>

          <div className="pt-4 border-t border-white/10 mt-2">
             <Link to="/admin/profile" className="flex items-center gap-3 px-2 py-2 hover:bg-white/5 rounded-lg transition-colors">
                 <img src={admin?.avatar} alt="Admin" className="w-10 h-10 rounded-full border border-white/10" />
                 <div className="flex-1 min-w-0">
                     <p className="text-sm font-bold truncate">{admin?.name}</p>
                     <p className="text-xs text-gray-500 capitalize">{admin?.role.replace('_', ' ')}</p>
                 </div>
             </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-background-dark">
         {/* Top Bar */}
         <header className="h-16 flex items-center justify-between px-4 lg:px-8 border-b border-white/5 bg-[#191022]/80 backdrop-blur-md sticky top-0 z-30">
            <button 
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 text-white hover:bg-white/10 rounded-lg"
            >
                <span className="material-symbols-outlined">menu</span>
            </button>
            
            <div className="hidden lg:block text-sm text-gray-400">
                Welcome back, {admin?.name}
            </div>

            <div className="flex items-center gap-4">
                 <div className="relative hidden md:block">
                     <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg">search</span>
                     <input 
                        type="text" 
                        placeholder="Quick search..." 
                        className="bg-white/5 border-none rounded-full py-2 pl-10 pr-4 text-sm text-white focus:ring-1 focus:ring-primary w-64" 
                     />
                 </div>
                 <Link to="/admin/notifications" className="relative p-2 hover:bg-white/10 rounded-full transition-colors">
                     <span className="material-symbols-outlined">notifications</span>
                     <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
                 </Link>
            </div>
         </header>

         {/* Page Content */}
         <div className="flex-1 overflow-auto p-4 lg:p-8">
            <Outlet />
         </div>
      </main>
    </div>
  );
}
