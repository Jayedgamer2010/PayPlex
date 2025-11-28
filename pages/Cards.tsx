
import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';
import { Card } from '../types';

export default function Cards() {
  const { cards, updateCard } = useApp();
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [showSensitive, setShowSensitive] = useState(false);
  const [showToast, setShowToast] = useState('');

  // Default to the first card if available
  useEffect(() => {
    if (cards.length > 0 && !selectedCardId) {
      setSelectedCardId(cards[0].id);
    }
  }, [cards, selectedCardId]);

  const selectedCard = cards.find(c => c.id === selectedCardId) || cards[0];

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text.replace(/\s/g, ''));
    setShowToast('Card number copied!');
    setTimeout(() => setShowToast(''), 2000);
  };

  const toggleFreeze = () => {
    if (selectedCard) {
      updateCard(selectedCard.id, { 
        status: selectedCard.status === 'active' ? 'frozen' : 'active' 
      });
      setShowToast(selectedCard.status === 'active' ? 'Card Frozen' : 'Card Unfrozen');
      setTimeout(() => setShowToast(''), 2000);
    }
  };

  const formatCardNumber = (num: string, show: boolean) => {
    if (show) return num;
    // Show last 4, mask rest
    return `**** **** **** ${num.slice(-4)}`;
  };

  return (
    <div className="flex flex-col h-full bg-background-light dark:bg-background-dark pb-24 overflow-y-auto relative">
      {/* Toast Notification */}
      {showToast && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg animate-bounce">
          {showToast}
        </div>
      )}

      {/* Header */}
      <div className="p-4 flex items-center justify-between sticky top-0 z-10 bg-background-light dark:bg-background-dark">
        <h1 className="text-xl font-bold text-slate-900 dark:text-white">My Cards</h1>
        <Link to="/flow/add-card" className="w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center text-primary">
          <span className="material-symbols-outlined">add_card</span>
        </Link>
      </div>

      {/* Selected Card View */}
      <div className="px-4 mb-6">
        {selectedCard ? (
          <div className="perspective-1000">
            <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${selectedCard.color} p-6 text-white shadow-xl h-56 flex flex-col justify-between transition-all duration-500 transform ${selectedCard.status === 'frozen' ? 'grayscale opacity-90' : ''}`}>
               {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-12 -left-8 w-28 h-28 bg-white/10 rounded-full blur-xl"></div>
              
              {/* Overlay for frozen state */}
              {selectedCard.status === 'frozen' && (
                <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[1px] flex items-center justify-center z-10 pointer-events-none">
                  <div className="flex flex-col items-center">
                    <span className="material-symbols-outlined text-4xl mb-2">ac_unit</span>
                    <span className="font-bold tracking-wider uppercase">Frozen</span>
                  </div>
                </div>
              )}

              {/* Card Header */}
              <div className="flex justify-between items-start relative z-0">
                <span className="font-semibold text-lg opacity-90">
                  {selectedCard.isVirtual ? 'Virtual Card' : 'Physical Card'}
                </span>
                <span className="font-bold italic text-xl flex items-center gap-1">
                  {selectedCard.type === 'visa' && <span className="material-symbols-outlined text-3xl">visa</span>}
                  {selectedCard.type === 'mastercard' && <span className="material-symbols-outlined text-3xl">credit_card</span>}
                  {selectedCard.type === 'amex' && <span className="material-symbols-outlined text-3xl">wallet</span>}
                  {selectedCard.type.toUpperCase()}
                </span>
              </div>

              {/* Card Number */}
              <div className="my-2 relative z-0">
                <p className="text-2xl font-mono tracking-widest drop-shadow-md flex items-center gap-3">
                  {formatCardNumber(selectedCard.number, showSensitive)}
                  <button onClick={() => handleCopy(selectedCard.number)} className="opacity-0 hover:opacity-100 active:opacity-100 focus:opacity-100 transition-opacity">
                    <span className="material-symbols-outlined text-sm">content_copy</span>
                  </button>
                </p>
              </div>

              {/* Card Footer */}
              <div className="flex justify-between items-end relative z-0">
                <div>
                  <p className="text-[10px] text-white/70 uppercase tracking-wider">Card Holder</p>
                  <p className="font-medium tracking-wide text-sm">{selectedCard.holderName}</p>
                </div>
                <div className="flex gap-6">
                  <div>
                    <p className="text-[10px] text-white/70 uppercase tracking-wider">Expires</p>
                    <p className="font-medium text-sm">{selectedCard.expiry}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-white/70 uppercase tracking-wider">CVV</p>
                    <p className="font-medium text-sm">{showSensitive ? selectedCard.cvv : '•••'}</p>
                  </div>
                </div>
              </div>

              {/* Toggle Eye */}
              <div className="absolute bottom-6 right-1 z-20">
                 <button onClick={() => setShowSensitive(!showSensitive)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                   <span className="material-symbols-outlined text-lg">{showSensitive ? 'visibility_off' : 'visibility'}</span>
                 </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-56 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-700">
            <span className="text-gray-400">No Cards Found</span>
          </div>
        )}
      </div>

      {/* Action Grid */}
      <div className="px-4 mb-6">
        <div className="flex justify-between gap-2">
           <button onClick={toggleFreeze} className="flex flex-col items-center gap-2 flex-1 p-2">
             <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${selectedCard?.status === 'frozen' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300'}`}>
               <span className="material-symbols-outlined">{selectedCard?.status === 'frozen' ? 'ac_unit' : 'lock'}</span>
             </div>
             <span className="text-xs font-medium text-slate-900 dark:text-white">{selectedCard?.status === 'frozen' ? 'Unfreeze' : 'Freeze'}</span>
           </button>

           <button onClick={() => setShowSensitive(!showSensitive)} className="flex flex-col items-center gap-2 flex-1 p-2">
             <div className="w-12 h-12 rounded-full bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300 flex items-center justify-center">
               <span className="material-symbols-outlined">{showSensitive ? 'visibility_off' : 'visibility'}</span>
             </div>
             <span className="text-xs font-medium text-slate-900 dark:text-white">Details</span>
           </button>

           <button className="flex flex-col items-center gap-2 flex-1 p-2">
             <div className="w-12 h-12 rounded-full bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300 flex items-center justify-center">
               <span className="material-symbols-outlined">settings</span>
             </div>
             <span className="text-xs font-medium text-slate-900 dark:text-white">Settings</span>
           </button>

           <button className="flex flex-col items-center gap-2 flex-1 p-2">
             <div className="w-12 h-12 rounded-full bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300 flex items-center justify-center">
               <span className="material-symbols-outlined">equalizer</span>
             </div>
             <span className="text-xs font-medium text-slate-900 dark:text-white">Limits</span>
           </button>
        </div>
      </div>

      {/* Limits & Info */}
      <div className="px-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
           <div className="flex justify-between items-center mb-2">
             <span className="text-sm font-bold text-slate-900 dark:text-white">Monthly Spending Limit</span>
             <span className="text-xs font-medium text-primary cursor-pointer">Change</span>
           </div>
           <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
              <div className="bg-primary h-2 rounded-full" style={{ width: '45%' }}></div>
           </div>
           <div className="flex justify-between text-xs text-gray-500">
             <span>$2,250 spent</span>
             <span>${selectedCard?.spendingLimit.toLocaleString()} limit</span>
           </div>
        </div>
      </div>

      {/* Cards List */}
      <div className="px-4">
        <h3 className="font-bold text-lg mb-4 text-slate-900 dark:text-white">Your Cards</h3>
        <div className="space-y-3">
          {cards.map(card => (
            <button 
              key={card.id} 
              onClick={() => { setSelectedCardId(card.id); setShowSensitive(false); }}
              className={`w-full flex items-center gap-4 p-4 rounded-xl shadow-sm transition-all border ${selectedCardId === card.id ? 'bg-primary/5 border-primary ring-1 ring-primary' : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 hover:border-gray-300'}`}
            >
              <div className={`w-12 h-8 rounded flex items-center justify-center text-white font-bold text-[8px] ${card.status === 'frozen' ? 'bg-gray-400' : 'bg-slate-800'}`}>
                {card.type.toUpperCase()}
              </div>
              <div className="flex-1 text-left">
                <p className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  {card.type === 'visa' ? 'Visa' : card.type === 'mastercard' ? 'Mastercard' : 'Amex'}
                  {card.isVirtual && <span className="text-[10px] bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded font-medium">Virtual</span>}
                  {card.status === 'frozen' && <span className="text-[10px] bg-gray-200 text-gray-600 px-1.5 py-0.5 rounded font-medium">Frozen</span>}
                </p>
                <p className="text-sm text-gray-500">**** {card.number.slice(-4)}</p>
              </div>
              {selectedCardId === card.id && (
                <span className="material-symbols-outlined text-primary">check_circle</span>
              )}
            </button>
          ))}
          
          <Link to="/flow/add-card" className="flex items-center gap-4 p-4 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
            <div className="w-12 h-8 rounded flex items-center justify-center bg-gray-100 dark:bg-gray-700">
              <span className="material-symbols-outlined">add</span>
            </div>
            <span className="font-medium">Link new card</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
