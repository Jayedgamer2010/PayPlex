import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ScanQR() {
  const navigate = useNavigate();
  const [scanning, setScanning] = useState(true);

  // Simulate scan success
  useEffect(() => {
    const timer = setTimeout(() => {
      setScanning(false);
      // Mock navigation to simulated scanned contact
      navigate('/flow/send/amount/c2'); // Redirect to send money to John Doe
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="relative h-full w-full bg-black flex flex-col">
       {/* Camera Overlay */}
       <div className="absolute inset-0 z-0">
          {/* Simulated camera noise/feed */}
          <div className="w-full h-full bg-gray-900 flex items-center justify-center text-gray-700">
             <span className="material-symbols-outlined text-9xl animate-pulse opacity-20">photo_camera</span>
          </div>
       </div>

       {/* UI Layer */}
       <div className="relative z-10 flex flex-col h-full justify-between p-6">
          <div className="flex justify-between items-center text-white">
             <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-black/40 flex items-center justify-center backdrop-blur-md">
               <span className="material-symbols-outlined">close</span>
             </button>
             <h2 className="font-bold">Scan QR Code</h2>
             <button className="w-10 h-10 rounded-full bg-black/40 flex items-center justify-center backdrop-blur-md">
               <span className="material-symbols-outlined">flash_on</span>
             </button>
          </div>

          <div className="self-center relative">
             <div className="w-64 h-64 border-2 border-white/50 rounded-3xl relative">
                {/* Scanner Line */}
                <div className="absolute left-0 top-0 w-full h-1 bg-primary shadow-[0_0_20px_rgba(124,58,237,0.8)] animate-[scan_2s_linear_infinite]"></div>
                {/* Corners */}
                <div className="absolute -top-1 -left-1 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-xl"></div>
                <div className="absolute -top-1 -right-1 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-xl"></div>
                <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-xl"></div>
                <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-xl"></div>
             </div>
             <p className="text-center text-white/80 mt-6 text-sm">Align QR code within the frame</p>
          </div>

          <div className="flex justify-center gap-6">
             <button className="flex flex-col items-center gap-2 text-white">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md">
                   <span className="material-symbols-outlined">image</span>
                </div>
                <span className="text-xs">Gallery</span>
             </button>
             <button className="flex flex-col items-center gap-2 text-white">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md">
                   <span className="material-symbols-outlined">123</span>
                </div>
                <span className="text-xs">Enter Code</span>
             </button>
          </div>
       </div>

       <style>{`
         @keyframes scan {
           0% { top: 0; opacity: 0; }
           10% { opacity: 1; }
           90% { opacity: 1; }
           100% { top: 100%; opacity: 0; }
         }
       `}</style>
    </div>
  );
}
