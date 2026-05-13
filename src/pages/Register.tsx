import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getDocs, collection, query, where, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { motion } from 'motion/react';
import { UserPlus, Lock, Mail, User, Phone, ArrowRight, Leaf, Loader2, Home } from 'lucide-react';
import { UserRole } from '../types';

export const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const generateReferralCode = async (baseName: string) => {
    const slug = baseName.toLowerCase().replace(/[^a-z0-9]/g, '');
    let code = slug;
    let counter = 1;
    
    while (true) {
      const q = query(collection(db, 'users'), where('referral_code', '==', code));
      const snapshot = await getDocs(q);
      if (snapshot.empty) break;
      code = `${slug}${counter}`;
      counter++;
    }
    return code;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setError('Kata sandi tidak cocok.');
    }
    
    setLoading(true);
    setError('');
    
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      const referralCode = await generateReferralCode(name);
      
      const userProfile = {
        uid: user.uid,
        name,
        email,
        phone,
        role: UserRole.CUSTOMER, // Default role
        referral_code: referralCode,
        is_active: true,
        created_at: new Date().toISOString(), // Or serverTimestamp but blueprint needs format check if we strictly adhere
      };
      
      await setDoc(doc(db, 'users', user.uid), userProfile);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Pendaftaran gagal.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-light flex items-center justify-center p-6 bg-gradient-to-br from-brand-soft/20 to-white py-12">
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

          <h2 className="text-3xl font-display font-bold text-slate-900 mb-2 text-center">Daftar Member</h2>
          <p className="text-slate-500 text-center mb-8">Gabung komunitas Bidoyi Citronella</p>

          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100 italic">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-brand-green transition-colors">
                <User className="w-5 h-5" />
              </div>
              <input
                type="text"
                required
                className="block w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green outline-none transition-all placeholder:text-slate-400"
                placeholder="Nama Lengkap"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-brand-green transition-colors">
                <Mail className="w-5 h-5" />
              </div>
              <input
                type="email"
                required
                className="block w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green outline-none transition-all placeholder:text-slate-400"
                placeholder="Email Anda"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-brand-green transition-colors">
                <Phone className="w-5 h-5" />
              </div>
              <input
                type="tel"
                required
                className="block w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green outline-none transition-all placeholder:text-slate-400"
                placeholder="Nomor WA (08xxx)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-brand-green transition-colors">
                <Lock className="w-5 h-5" />
              </div>
              <input
                type="password"
                required
                className="block w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green outline-none transition-all placeholder:text-slate-400"
                placeholder="Kata Sandi"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-brand-green transition-colors">
                <Lock className="w-5 h-5" />
              </div>
              <input
                type="password"
                required
                className="block w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green outline-none transition-all placeholder:text-slate-400"
                placeholder="Konfirmasi Kata Sandi"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-green hover:bg-[#1B3518] text-white font-bold py-4 rounded-2xl shadow-lg shadow-brand-green/20 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-1 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed mt-4"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <UserPlus className="w-5 h-5" />}
              Daftar Member
            </button>
          </form>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-slate-500">Sudah punya akun?</span>
              <Link to="/login" className="text-brand-green font-bold hover:underline flex items-center gap-1">
                Masuk Sekarang <ArrowRight className="w-3 h-3" />
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
