import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth, db, handleFirestoreError, OperationType } from '../lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { motion } from 'motion/react';
import { LogIn, Lock, Mail, ArrowRight, Leaf, Loader2, Home } from 'lucide-react';
import { UserRole } from '../types';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate(from, { replace: true });
    } catch (err: any) {
      console.error("Login Error:", err);
      if (err.code === 'auth/operation-not-allowed') {
        setError('Metode login Email/Password belum diaktifkan di Firebase Console.');
      } else if (err.code === 'auth/invalid-credential') {
        setError('Email atau password salah. Pastikan Anda sudah mendaftar (Register) terlebih dahulu sebelum login.');
      } else {
        setError(err.message || 'Login gagal. Silakan periksa kembali data Anda.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (!userDoc.exists()) {
          // Create basic profile for new Google user
          const referralCode = user.displayName 
            ? user.displayName.toLowerCase().replace(/[^a-z0-9]/g, '') + Math.floor(Math.random() * 1000)
            : `user${user.uid.substring(0, 5)}`;
            
          const userProfile = {
            uid: user.uid,
            name: user.displayName || 'User',
            email: user.email || '',
            role: UserRole.CUSTOMER,
            referral_code: referralCode,
            is_active: true,
            created_at: new Date().toISOString(),
          };
          
          await setDoc(doc(db, 'users', user.uid), userProfile);
          await setDoc(doc(db, 'referral_codes', referralCode), { ownerId: user.uid });
        }
      } catch (err) {
        handleFirestoreError(err, OperationType.WRITE, `users/${user.uid}`);
      }
      navigate(from, { replace: true });
    } catch (err: any) {
      console.error("Google Auth Error:", err);
      setError(err.message || 'Google login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-light flex items-center justify-center p-6 bg-gradient-to-br from-brand-soft/20 to-white">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-brand-soft"
      >
        <div className="p-8 md:p-12">
          <div className="flex items-center gap-2 text-brand-green mb-8 justify-center">
            <Leaf className="w-8 h-8" />
            <span className="font-display font-bold text-2xl tracking-tight">Bidoyi</span>
          </div>

          <h2 className="text-3xl font-display font-bold text-slate-900 mb-2 text-center">Selamat Datang</h2>
          <p className="text-slate-500 text-center mb-8">Masuk ke akun member Anda</p>

          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100 italic">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-brand-green transition-colors">
                <Mail className="w-5 h-5" />
              </div>
              <input
                type="email"
                required
                className="block w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green outline-none transition-all placeholder:text-slate-400"
                placeholder="Email Anda"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-brand-green transition-colors">
                <Lock className="w-5 h-5" />
              </div>
              <input
                type="password"
                required
                className="block w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green outline-none transition-all placeholder:text-slate-400"
                placeholder="Kata Sandi"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-green hover:bg-[#1B3518] text-white font-bold py-4 rounded-2xl shadow-lg shadow-brand-green/20 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-1 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <LogIn className="w-5 h-5" />}
              Masuk Sekarang
            </button>
          </form>

          <div className="mt-6">
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-100"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-slate-400 font-medium tracking-widest">Atau masuk dengan</span>
              </div>
            </div>

            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold py-4 rounded-2xl border border-slate-100 flex items-center justify-center gap-3 transition-all active:scale-95 disabled:opacity-70"
            >
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
              Google Akun
            </button>
          </div>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-slate-500">Belum punya akun?</span>
              <Link to="/register" className="text-brand-green font-bold hover:underline flex items-center gap-1">
                Daftar Disini <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            
            <Link to="/" className="flex items-center gap-2 text-slate-400 hover:text-brand-green transition-colors font-medium">
              <Home className="w-4 h-4" />
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
