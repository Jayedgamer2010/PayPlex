
import React, { useState, useRef, useEffect } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { useNavigate } from 'react-router-dom';

export default function AdminAuth() {
  const { authStep, loginStep1, loginStep2, loginStep3, isLoading } = useAdmin();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const otpInputs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (authStep === 'authenticated') {
      navigate('/admin/dashboard');
    }
  }, [authStep, navigate]);

  const handlePasswordSubmit = async () => {
    await loginStep1(password);
  };

  const handleOtpChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return false;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Focus next input
    if (element.value !== '' && index < 5) {
      otpInputs.current[index + 1]?.focus();
    }
    
    // Submit if complete
    if (index === 5 && element.value !== '') {
        loginStep2(newOtp.join('') + element.value);
    }
  };

  const handleOtpVerify = () => {
      loginStep2(otp.join(''));
  }

  // STEP 1: MASTER PASSWORD
  if (authStep === 'login') {
    return (
      <div className="relative flex h-screen min-h-screen w-full flex-col items-center justify-center bg-background-dark overflow-hidden p-4 font-display">
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#191022] via-[#2a1a3d] to-[#120c1a]"></div>
        <div className="relative z-10 flex w-full max-w-sm flex-col items-center">
          <div className="flex flex-col items-center gap-2 pb-8 text-center">
            <span className="material-symbols-outlined text-white text-4xl">shield</span>
            <h1 className="text-white tracking-light text-[28px] font-bold leading-tight">PayFlex Admin Portal</h1>
          </div>
          <div className="w-full rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-lg">
            <div className="flex flex-col gap-6">
              <label className="flex flex-col w-full">
                <p className="text-white text-base font-medium leading-normal pb-2">Master Password</p>
                <div className="flex w-full items-stretch rounded-lg bg-[#362348] ring-1 ring-transparent focus-within:ring-primary">
                  <div className="text-[#ad92c9] flex items-center justify-center pl-4">
                    <span className="material-symbols-outlined text-xl">lock</span>
                  </div>
                  <input 
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden text-white focus:outline-0 focus:ring-0 border-none bg-transparent h-14 placeholder:text-[#ad92c9] p-4 pr-2 text-base font-normal leading-normal" 
                    placeholder="Enter your master password" 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handlePasswordSubmit()}
                  />
                </div>
              </label>
              <div className="flex">
                <button 
                  onClick={handlePasswordSubmit}
                  disabled={isLoading}
                  className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 flex-1 bg-gradient-to-r from-primary to-[#4a63f7] text-white text-base font-bold leading-normal tracking-[0.015em] transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
                >
                  {isLoading ? 'Verifying...' : 'Next'}
                </button>
              </div>
            </div>
            <div className="pt-6">
              <p className="text-[#ad92c9] text-sm font-normal leading-normal text-center underline cursor-pointer hover:text-white">Forgot Password?</p>
            </div>
          </div>
          <div className="w-full max-w-sm pt-12">
            <div className="gap-2 px-4 grid-cols-3 grid">
              <div className="flex flex-col items-center gap-2 text-center">
                <div className="rounded-full bg-[#362348]/60 p-2.5 border border-white/10">
                  <span className="material-symbols-outlined text-white text-xl">https</span>
                </div>
                <p className="text-[#ad92c9] text-sm font-medium leading-normal">SSL</p>
              </div>
              <div className="flex flex-col items-center gap-2 text-center">
                <div className="rounded-full bg-[#362348]/60 p-2.5 border border-white/10">
                  <span className="material-symbols-outlined text-white text-xl">enhanced_encryption</span>
                </div>
                <p className="text-[#ad92c9] text-sm font-medium leading-normal">Encrypted</p>
              </div>
              <div className="flex flex-col items-center gap-2 text-center">
                <div className="rounded-full bg-[#362348]/60 p-2.5 border border-white/10">
                  <span className="material-symbols-outlined text-white text-xl">verified_user</span>
                </div>
                <p className="text-[#ad92c9] text-sm font-medium leading-normal">Secure</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // STEP 2: OTP VERIFICATION
  if (authStep === 'otp') {
    return (
      <div className="relative flex h-screen min-h-screen w-full flex-col bg-background-dark font-display">
         <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#191022] via-[#2a1a3d] to-[#120c1a]"></div>
        <div className="relative z-10 flex flex-1 flex-col justify-center px-4">
          <div className="flex flex-col items-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/20 mb-6">
              <span className="material-symbols-outlined text-4xl text-primary">shield</span>
            </div>
            <h1 className="text-white tracking-light text-3xl font-bold leading-tight text-center pb-3">Verify Your Identity</h1>
            <p className="text-white/70 text-base font-normal leading-normal pb-3 text-center">Enter 6-digit code sent to<br/>admin@payflex.com</p>
            
            <div className="flex justify-center py-6 gap-3">
              {otp.map((data, index) => (
                <input
                  key={index}
                  ref={el => otpInputs.current[index] = el}
                  className="w-12 h-14 rounded-lg border-2 border-[#4d3267] bg-transparent text-center text-xl font-bold text-white focus:border-primary focus:ring-0 focus:outline-none"
                  type="text"
                  maxLength={1}
                  value={data}
                  onChange={e => handleOtpChange(e.target, index)}
                  onFocus={e => e.target.select()}
                />
              ))}
            </div>

            <p className="text-white/70 text-base font-normal leading-normal text-center pt-4">Resend code in <span className="text-white font-semibold">00:45</span></p>
          </div>
          
          <div className="mt-8 w-full max-w-sm mx-auto">
            <button 
                onClick={handleOtpVerify}
                disabled={isLoading}
                className="flex h-14 w-full items-center justify-center rounded-xl bg-gradient-to-r from-primary to-blue-500 px-6 text-base font-bold text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
            >
                {isLoading ? 'Checking...' : 'Verify'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // STEP 3: BIOMETRIC / 2FA
  if (authStep === '2fa') {
    return (
      <div className="relative flex h-screen min-h-screen w-full flex-col bg-background-dark font-display">
         <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#191022] via-[#2a1a3d] to-[#120c1a]"></div>
         <div className="relative z-10 flex flex-col h-full">
            <div className="flex items-center p-4 pb-2 justify-between">
            <button className="text-white flex size-12 shrink-0 items-center justify-start" onClick={() => window.location.reload()}>
                <span className="material-symbols-outlined text-3xl">arrow_back_ios_new</span>
            </button>
            <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">Final Security Check</h2>
            </div>
            
            <div className="flex flex-col flex-grow items-center justify-center px-4">
                <div className="w-full flex flex-col items-center">
                    <button 
                        onClick={() => loginStep3('biometric')}
                        className="flex w-full grow flex-col items-center justify-center pt-16 pb-8 hover:scale-110 transition-transform duration-500 cursor-pointer"
                    >
                         <span className="material-symbols-outlined !text-9xl text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-purple-600">fingerprint</span>
                    </button>
                    <p className="text-white text-base font-normal leading-normal pb-3 pt-1 px-4 text-center">Place your finger to authenticate</p>
                    <p className="text-zinc-400 text-sm font-normal leading-normal py-4 px-4 text-center">OR</p>
                    
                    <div className="w-full max-w-sm flex flex-col items-center gap-6">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-zinc-400 !text-2xl">shield_lock</span>
                            <p className="text-zinc-400 text-sm font-normal leading-normal text-center">Enter the code from your authenticator app</p>
                        </div>
                        <div className="flex justify-center gap-2">
                             {[1,2,3,4,5,6].map(i => (
                                 <div key={i} className="w-10 h-14 border border-zinc-600 rounded-lg"></div>
                             ))}
                        </div>
                    </div>
                </div>

                <div className="w-full max-w-sm px-4 py-8 mt-auto">
                    <button 
                        onClick={() => loginStep3('totp')}
                        className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-4 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em]"
                    >
                        <span className="truncate">{isLoading ? 'Authenticating...' : 'Authenticate'}</span>
                    </button>
                </div>
            </div>
         </div>
      </div>
    );
  }

  return null;
}
