import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { TEST_CREDENTIALS } from '../constants';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const { login, isLoading } = useApp();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '', name: '', phone: '' });

  const handleSubmit = async () => {
    // Simple validation
    if (!form.email || !form.password) return;
    
    await login(form.email);
    navigate('/app/home');
  };

  const fillTestCredentials = () => {
    setForm({
      ...form,
      email: TEST_CREDENTIALS.email,
      password: TEST_CREDENTIALS.password,
    });
    setIsLogin(true);
  };

  return (
    <div className="flex h-full w-full flex-col bg-background-light dark:bg-background-dark p-6 overflow-y-auto">
      <div className="flex flex-col items-center pt-10 pb-8">
        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4">
          <span className="material-symbols-outlined text-white text-4xl">account_balance_wallet</span>
        </div>
        <h1 className="text-slate-900 dark:text-white text-3xl font-bold">PayFlex</h1>
      </div>

      <h2 className="text-slate-900 dark:text-white text-xl font-bold text-center mb-6">
        {isLogin ? 'Welcome Back' : 'Create Account'}
      </h2>

      <div className="flex flex-col gap-4 w-full">
        {!isLogin && (
          <>
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700 dark:text-gray-300">Full Name</label>
              <input 
                type="text" 
                className="w-full h-14 rounded-xl border-gray-300 dark:border-gray-700 bg-white dark:bg-background-dark dark:text-white px-4 focus:ring-primary focus:border-primary"
                placeholder="John Doe"
                value={form.name}
                onChange={e => setForm({...form, name: e.target.value})}
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700 dark:text-gray-300">Phone</label>
              <input 
                type="tel" 
                className="w-full h-14 rounded-xl border-gray-300 dark:border-gray-700 bg-white dark:bg-background-dark dark:text-white px-4 focus:ring-primary focus:border-primary"
                placeholder="+1 234 567 890"
                value={form.phone}
                onChange={e => setForm({...form, phone: e.target.value})}
              />
            </div>
          </>
        )}

        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700 dark:text-gray-300">Email</label>
          <input 
            type="email" 
            className="w-full h-14 rounded-xl border-gray-300 dark:border-gray-700 bg-white dark:bg-background-dark dark:text-white px-4 focus:ring-primary focus:border-primary"
            placeholder="name@example.com"
            value={form.email}
            onChange={e => setForm({...form, email: e.target.value})}
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700 dark:text-gray-300">Password</label>
          <div className="relative">
            <input 
              type="password" 
              className="w-full h-14 rounded-xl border-gray-300 dark:border-gray-700 bg-white dark:bg-background-dark dark:text-white px-4 pr-12 focus:ring-primary focus:border-primary"
              placeholder="••••••••"
              value={form.password}
              onChange={e => setForm({...form, password: e.target.value})}
            />
            <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
              <span className="material-symbols-outlined">visibility</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center w-full py-4">
        {isLogin && (
          <button 
            type="button" 
            onClick={fillTestCredentials} 
            className="text-primary text-sm font-medium hover:underline flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-sm">science</span>
            Use Test Account
          </button>
        )}
        {isLogin && (
          <button className="text-primary text-sm font-medium hover:underline">Forgot Password?</button>
        )}
      </div>

      <div className={`w-full ${!isLogin ? 'mt-8' : ''}`}>
        <button 
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full h-14 rounded-xl bg-gradient-to-r from-blue-600 to-primary text-white font-bold text-lg shadow-lg active:scale-95 transition-transform flex items-center justify-center"
        >
          {isLoading ? <span className="material-symbols-outlined animate-spin">refresh</span> : (isLogin ? 'Log In' : 'Create Account')}
        </button>
      </div>

      {isLogin && (
        <div className="flex flex-col items-center mt-8 gap-3">
          <button className="h-14 w-14 rounded-full border-2 border-primary/30 flex items-center justify-center text-primary hover:bg-primary/5 transition-colors">
            <span className="material-symbols-outlined text-3xl">fingerprint</span>
          </button>
          <span className="text-sm text-gray-500">Log in with Biometrics</span>
        </div>
      )}

      <div className="mt-auto pt-6 text-center">
        <p className="text-gray-600 dark:text-gray-400">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button onClick={() => setIsLogin(!isLogin)} className="ml-2 font-bold text-primary hover:underline">
            {isLogin ? 'Sign Up' : 'Log In'}
          </button>
        </p>
      </div>
    </div>
  );
}