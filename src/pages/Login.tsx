import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth, db } from '../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { motion } from 'motion/react';
import { LogIn, Lock, Mail, ArrowRight, Leaf, Loader2, Home } from 'lucide-react';

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
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      // Check if profile exists
      const userDoc = await getDoc(doc(db, 'users', result.user.uid));
      if (!userDoc.exists()) {
        // If no profile, they need to select a role or we default to customer
        // For simplicity in this demo, let's redirect to register if they don't have a profile
        // but technically they just logged in with Google.
        // Actually, let's just send them to dashboard and the provider will handle profile fetching.
        // If profile is null in provider, we might need a "complete profile" step.
      }
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.message || 'Google login failed.');
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
