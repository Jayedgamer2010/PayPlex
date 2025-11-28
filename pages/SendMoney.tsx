import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Contact } from '../types';

export function SelectContact() {
  const { contacts } = useApp();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const filtered = contacts.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="flex flex-col h-full bg-background-light dark:bg-background-dark">
      <div className="p-4 flex items-center gap-4 sticky top-0 bg-background-light dark:bg-background-dark z-10">
        <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center text-slate-900 dark:text-white">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-lg font-bold flex-1 text-center pr-10 text-slate-900 dark:text-white">Send Money</h1>
      </div>

      <div className="px-4 mb-4">
        <div className="relative">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">search</span>
          <input 
            type="text" 
            placeholder="Name, @handle, or phone" 
            className="w-full h-12 bg-white dark:bg-gray-800 rounded-xl pl-12 pr-4 border-none shadow-sm focus:ring-2 focus:ring-primary text-slate-900 dark:text-white"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-6">
        <h3 className="font-bold mb-3 text-slate-900 dark:text-white">Recent Contacts</h3>
        <div className="space-y-2">
          {filtered.map(contact => (
            <button 
              key={contact.id} 
              onClick={() => navigate(`/flow/send/amount/${contact.id}`)}
              className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white dark:hover:bg-gray-800 transition-colors group"
            >
              <div className="flex items-center gap-4">
                <img src={contact.avatar} alt={contact.name} className="w-12 h-12 rounded-full object-cover" />
                <div className="text-left">
                  <p className="font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">{contact.name}</p>
                  <p className="text-sm text-gray-500">{contact.handle}</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-gray-400">chevron_right</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function EnterAmount() {
  const { id } = useParams();
  const { contacts, sendMoney, isLoading } = useApp();
  const navigate = useNavigate();
  const [amount, setAmount] = useState('0');
  const [note, setNote] = useState('');

  const contact = contacts.find(c => c.id === id);

  const handleKey = (key: string) => {
    if (key === 'backspace') {
      setAmount(prev => prev.length > 1 ? prev.slice(0, -1) : '0');
    } else if (key === '.') {
      if (!amount.includes('.')) setAmount(prev => prev + '.');
    } else {
      setAmount(prev => prev === '0' ? key : prev + key);
    }
  };

  const handleSend = async () => {
    const val = parseFloat(amount);
    if (val > 0 && contact) {
      await sendMoney(contact.id, val, note);
      navigate('/flow/send/success', { state: { amount: val, contact } });
    }
  };

  if (!contact) return <div>Contact not found</div>;

  return (
    <div className="flex flex-col h-full bg-background-light dark:bg-background-dark">
      <div className="p-4 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="text-slate-900 dark:text-white"><span className="material-symbols-outlined">arrow_back</span></button>
        <h2 className="font-bold text-slate-900 dark:text-white">Send Money</h2>
        <div className="w-6"></div>
      </div>

      <div className="flex-1 flex flex-col items-center pt-6">
        <div className="flex items-center gap-3 bg-white dark:bg-gray-800 p-2 pr-4 rounded-full mb-8 shadow-sm">
          <img src={contact.avatar} alt={contact.name} className="w-10 h-10 rounded-full" />
          <div className="text-left">
             <p className="text-sm font-bold text-slate-900 dark:text-white">{contact.name}</p>
             <p className="text-xs text-gray-500">{contact.handle}</p>
          </div>
        </div>

        <div className="flex flex-col items-center">
           <span className="text-6xl font-bold text-slate-900 dark:text-white flex items-start">
             <span className="text-3xl mt-2">$</span>{amount}
           </span>
        </div>
      </div>

      <div className="p-6 bg-white dark:bg-background-dark rounded-t-3xl shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <div className="mb-6">
          <input 
             type="text" 
             placeholder="Add a note (optional)" 
             className="w-full bg-gray-100 dark:bg-gray-800 border-none rounded-xl py-3 px-4 text-center focus:ring-0 text-slate-900 dark:text-white placeholder:text-gray-400"
             value={note}
             onChange={e => setNote(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-3 gap-y-4 mb-6">
          {[1,2,3,4,5,6,7,8,9,'.',0,'backspace'].map(key => (
            <button 
              key={key} 
              onClick={() => handleKey(key.toString())}
              className="h-14 flex items-center justify-center text-2xl font-bold text-slate-900 dark:text-white active:bg-gray-100 dark:active:bg-gray-700 rounded-lg transition-colors"
            >
              {key === 'backspace' ? <span className="material-symbols-outlined">backspace</span> : key}
            </button>
          ))}
        </div>

        <button 
          onClick={handleSend}
          disabled={parseFloat(amount) === 0 || isLoading}
          className="w-full h-14 bg-primary text-white font-bold rounded-xl text-lg shadow-lg shadow-primary/30 disabled:opacity-50 flex items-center justify-center"
        >
          {isLoading ? <span className="material-symbols-outlined animate-spin">refresh</span> : 'Send Money'}
        </button>
      </div>
    </div>
  );
}

import { useLocation } from 'react-router-dom';

export function PaymentSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const { amount, contact } = location.state as { amount: number, contact: Contact } || {};

  return (
    <div className="flex flex-col h-full bg-background-light dark:bg-background-dark p-6 justify-between items-center relative overflow-hidden">
      {/* Confetti effect simplified */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-50">
        <div className="absolute top-10 left-[20%] w-2 h-2 bg-red-500 rounded-full animate-bounce"></div>
        <div className="absolute top-20 right-[20%] w-3 h-3 bg-blue-500 rounded-full animate-ping"></div>
        <div className="absolute top-40 left-[50%] w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center w-full">
        <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6 animate-bounce">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30">
            <span className="material-symbols-outlined text-4xl text-white">check</span>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Transfer Successful!</h1>
        <p className="text-3xl font-bold text-slate-900 dark:text-white mb-8">${amount?.toFixed(2)}</p>

        <div className="w-full bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex justify-between py-3 border-b border-gray-100 dark:border-gray-700">
            <span className="text-gray-500">To</span>
            <span className="font-bold text-slate-900 dark:text-white">{contact?.name}</span>
          </div>
           <div className="flex justify-between py-3 border-b border-gray-100 dark:border-gray-700">
            <span className="text-gray-500">Date</span>
            <span className="font-bold text-slate-900 dark:text-white">{new Date().toLocaleDateString()}</span>
          </div>
           <div className="flex justify-between py-3">
            <span className="text-gray-500">Ref ID</span>
            <span className="font-mono text-sm text-slate-900 dark:text-white">TX-{Math.floor(Math.random()*100000)}</span>
          </div>
        </div>
      </div>

      <button onClick={() => navigate('/app/home')} className="w-full h-14 bg-gray-900 dark:bg-white dark:text-slate-900 text-white font-bold rounded-xl text-lg mb-4">
        Done
      </button>
    </div>
  );
}
