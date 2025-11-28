import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const slides = [
  {
    title: "Send Money in Seconds",
    desc: "Fast, secure transfers to anyone, anywhere.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCPr8zC2VB6xHa7ltsvYWEYl5a5Pn5PZtpHnio5k5YqE4MEqYm0_EFZJwLJm3DkFlEgmM9LpNDdWSdkAs-rwo56bSXJH56w9M-1v0ce8_wA8JJIDScNp1tNUR5ys3mdfQIZUD_fDz6h7gigd456WCRz2Vcd2yVncWr98xIUX0ITlfI_lAdkKObSxtwg7fUxJHYd_FRrJ9k0YwVVdyMVN9AACvBi2_VdLSbl_Nd7Hto530k-Bun_7XV1hGQsKID8B0l-cjwm_1fYAUOd"
  },
  {
    title: "Bank-Level Security",
    desc: "Your money is protected with 256-bit encryption.",
    icon: "shield"
  },
  {
    title: "Earn Rewards",
    desc: "Get cashback on every transaction and unlock exclusive perks.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAwC97UkNWWVS_kLstjHRrU5FfJQ9Kz1rC5fxoYYkcsUsZnATPjwUJFghAxxfpimSlBhw-ZVKZlhPD_tXBp9hVeKPJd2v8XaiP2ws_D_JHzAqyZj1DV47elri_KoIuy-Rj7-lQ1azm-0o0Nx1_PeIbcaD1i6Ndull09WGkD8hiO3wSbyf9imSDNhE4OOgr7CcSSUkga4Aa7BX6J-8PMRZtp142RONRESmaF73LjB1l6JnBKFVAVTFacTePsw7ExdKttXjD3mDeo47bl"
  }
];

export default function Onboarding() {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (current < slides.length - 1) {
      setCurrent(current + 1);
    } else {
      navigate('/auth');
    }
  };

  const handleSkip = () => {
    navigate('/auth');
  };

  return (
    <div className={`relative flex h-full w-full flex-col overflow-hidden ${current === 1 ? 'bg-gradient-to-br from-blue-900 to-slate-900' : 'bg-background-light dark:bg-background-dark'}`}>
      {/* Top Bar */}
      <div className="flex items-center p-4 justify-end h-16">
        <button onClick={handleSkip} className={`text-base font-bold ${current === 1 ? 'text-white/80' : 'text-gray-400'}`}>Skip</button>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow items-center justify-center px-6">
        {current === 1 ? (
          <div className="w-48 h-48 mb-8 text-white flex items-center justify-center">
             <span className="material-symbols-outlined text-[150px]">shield</span>
          </div>
        ) : (
          <div className="w-full max-w-xs aspect-square flex items-center justify-center mb-6">
            <img src={slides[current].img} alt="Illustration" className="object-contain w-full h-full" />
          </div>
        )}

        <h1 className={`text-[32px] font-bold text-center mb-3 ${current === 1 ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
          {slides[current].title}
        </h1>
        <p className={`text-center text-base max-w-xs ${current === 1 ? 'text-white/80' : 'text-slate-600 dark:text-gray-400'}`}>
          {slides[current].desc}
        </p>
      </div>

      {/* Footer */}
      <div className="p-8 pb-10 w-full flex flex-col items-center">
        {/* Indicators */}
        <div className="flex gap-3 mb-8">
          {slides.map((_, idx) => (
            <div key={idx} className={`h-2 w-2 rounded-full transition-colors ${idx === current ? 'bg-primary' : 'bg-primary/20'}`} />
          ))}
        </div>

        <button onClick={handleNext} className="h-14 w-full rounded-xl bg-primary text-white font-bold text-lg shadow-lg active:scale-95 transition-transform">
          {current === slides.length - 1 ? 'Get Started' : 'Next'}
        </button>
      </div>
    </div>
  );
}
