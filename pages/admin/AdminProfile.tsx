
import React from 'react';
import { useAdmin } from '../../context/AdminContext';
import { useNavigate } from 'react-router-dom';

export default function AdminProfile() {
  const { admin, logout } = useAdmin();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/auth');
  };

  return (
    <div className="flex flex-col gap-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="text-white">
              <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="text-2xl font-bold text-white">Profile Settings</h1>
      </div>

      <div className="flex flex-col items-center py-8 bg-white/5 border border-white/10 rounded-xl">
          <div className="relative">
              <img src={admin?.avatar} alt="Admin" className="w-32 h-32 rounded-full object-cover border-4 border-[#191022]" />
              <button className="absolute bottom-0 right-0 bg-primary p-2 rounded-full text-white">
                  <span className="material-symbols-outlined text-sm">edit</span>
              </button>
          </div>
          <h2 className="mt-4 text-2xl font-bold text-white">{admin?.name}</h2>
          <p className="text-gray-400 capitalize">{admin?.role.replace('_', ' ')}</p>
      </div>

      <div className="space-y-4">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h3 className="font-bold text-white mb-4">Security</h3>
              <div className="space-y-4">
                  <button className="w-full flex items-center justify-between p-3 bg-black/20 rounded-lg hover:bg-white/5">
                      <div className="flex items-center gap-3 text-white">
                          <span className="material-symbols-outlined">lock</span>
                          <span>Change Password</span>
                      </div>
                      <span className="material-symbols-outlined text-gray-500">chevron_right</span>
                  </button>
                  <div className="flex items-center justify-between p-3 bg-black/20 rounded-lg">
                      <div className="flex items-center gap-3 text-white">
                          <span className="material-symbols-outlined">password_2</span>
                          <span>Two-Factor Authentication</span>
                      </div>
                      <div className="w-10 h-6 bg-primary rounded-full relative cursor-pointer">
                          <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                      </div>
                  </div>
              </div>
          </div>

          <button onClick={handleLogout} className="w-full py-4 bg-red-500/20 text-red-500 font-bold rounded-xl hover:bg-red-500/30 transition-colors">
              Log Out
          </button>
      </div>
    </div>
  );
}
