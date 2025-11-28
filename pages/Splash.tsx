import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/onboarding');
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-b from-[#6A3093] to-[#A044FF]">
      <div className="flex flex-col items-center animate-bounce">
        <div className="flex h-32 w-32 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white/30">
            <span className="material-symbols-outlined text-6xl text-white">payments</span>
          </div>
        </div>
        <h1 className="text-white tracking-tight text-[40px] font-bold leading-tight pt-8 pb-3 text-center">PayFlex</h1>
      </div>
      <div className="absolute bottom-12 w-full px-4">
        <p className="text-white/80 text-lg font-normal leading-normal text-center animate-pulse">Send Money Instantly</p>
      </div>
    </div>
  );
}
