
import React from 'react';

export default function Settings() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-white">Admin Settings</h1>
      
      {/* Payment Gateways */}
      <section className="bg-white/5 border border-white/10 rounded-xl p-6">
          <h2 className="text-lg font-bold text-white mb-4">Gateway Integrations</h2>
          <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-black/20 rounded-lg">
                  <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary/20 rounded flex items-center justify-center text-primary">
                          <span className="material-symbols-outlined">credit_card</span>
                      </div>
                      <div>
                          <p className="font-bold text-white">Stripe</p>
                          <p className="text-xs text-green-500 flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500"></span> Connected</p>
                      </div>
                  </div>
                  <button className="px-4 py-2 border border-white/20 rounded-lg text-sm text-white hover:bg-white/5">Configure</button>
              </div>
              <div className="flex items-center justify-between p-4 bg-black/20 rounded-lg">
                  <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary/20 rounded flex items-center justify-center text-primary">
                          <span className="material-symbols-outlined">payments</span>
                      </div>
                      <div>
                          <p className="font-bold text-white">PayPal</p>
                          <p className="text-xs text-green-500 flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500"></span> Connected</p>
                      </div>
                  </div>
                  <button className="px-4 py-2 border border-white/20 rounded-lg text-sm text-white hover:bg-white/5">Configure</button>
              </div>
          </div>
      </section>

      {/* Fees */}
      <section className="bg-white/5 border border-white/10 rounded-xl p-6">
          <h2 className="text-lg font-bold text-white mb-4">Transaction Fees</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Percentage Fee (%)</label>
                  <input type="text" defaultValue="2.9" className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white" />
              </div>
              <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Fixed Fee ($)</label>
                  <input type="text" defaultValue="0.30" className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white" />
              </div>
          </div>
      </section>

      <div className="fixed bottom-6 right-6">
        <button className="flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105">
            <span className="material-symbols-outlined text-base">save</span>
            Save Changes
        </button>
      </div>
    </div>
  );
}
