import React from 'react';
import { useAuth } from '../components/FirebaseProvider';
import { motion } from 'motion/react';
import { 
  LogOut, 
  User, 
  LayoutDashboard, 
  Link as LinkIcon, 
  TrendingUp, 
  Users, 
  Settings,
  ShieldAlert,
  ChevronRight,
  ExternalLink,
  Sparkles,
  MessageCircle
} from 'lucide-react';
import { UserRole } from '../types';
import { UserManagement } from '../components/UserManagement';

export const Dashboard = () => {
  const { profile, logout, user } = useAuth();
  const [activeTab, setActiveTab] = React.useState('dashboard');
  
  if (!profile) {
    if (user) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-brand-light p-6 text-slate-800">
          <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl border border-brand-soft text-center">
            <ShieldAlert className="w-16 h-16 text-amber-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Profil Tidak Ditemukan</h2>
            <p className="text-slate-600 mb-6">Akun Anda terdeteksi, namun data profil member belum tersedia. Silakan hubungi admin atau coba daftar ulang.</p>
            <div className="space-y-4">
              <button 
                onClick={logout}
                className="w-full bg-brand-green text-white py-3 rounded-xl font-bold hover:bg-[#1B3518] transition-all shadow-lg shadow-brand-green/20"
              >
                Keluar & Coba Lagi
              </button>
            </div>
          </div>
        </div>
      );
    }
    return null;
  }

  const isAdmin = profile.role === UserRole.SUPER_ADMIN || profile.role === UserRole.ADMIN;

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'referral', label: 'Referral Link', icon: LinkIcon, hide: isAdmin },
    { id: 'statistik', label: 'Statistik', icon: TrendingUp },
    { id: 'network', label: 'Network', icon: Users, hide: isAdmin },
    { id: 'users', label: 'User Admin', icon: ShieldAlert, showOnly: isAdmin },
    { id: 'settings', label: 'Pengaturan', icon: Settings }
  ].filter(item => {
    if (item.hide) return false;
    if (item.showOnly && !isAdmin) return false;
    return true;
  });

  const getDashboardTitle = (role: UserRole) => {
    switch (role) {
      case UserRole.SUPER_ADMIN: return "Super Admin Dashboard";
      case UserRole.ADMIN: return "Admin Portal";
      case UserRole.RESELLER: return "Reseller Hub";
      case UserRole.AFFILIATE: return "Affiliate Center";
      default: return "Member Dashboard";
    }
  };

  const referralUrl = profile.referral_code 
    ? `${window.location.origin}/?ref=${profile.referral_code}`
    : "Referral code tidak tersedia";

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Link disalin ke clipboard!');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'users':
        return <UserManagement />;
      case 'dashboard':
      default:
        return (
          <div className="space-y-8">
            {/* Welcome Card */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-brand-green text-white p-8 rounded-[2.5rem] relative overflow-hidden shadow-2xl shadow-brand-green/20"
            >
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div>
                  <h2 className="text-3xl md:text-4xl font-display font-bold mb-2 tracking-tight">Halo, {profile.name.split(' ')[0]}! 👋</h2>
                  <p className="text-brand-soft opacity-80 text-lg">Senang melihat Anda kembali. Apa target Anda hari ini?</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md p-4 rounded-3xl border border-white/20">
                   <div className="text-sm opacity-60 mb-1">Status Keanggotaan</div>
                   <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-brand-gold rounded-full animate-pulse"></div>
                      <span className="font-bold text-xl capitalize text-brand-gold">{profile.role.replace('_', ' ')}</span>
                   </div>
                </div>
              </div>
              {/* Background Decoration */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Total Klik', value: '1,280', icon: TrendingUp, color: 'text-blue-500' },
                { label: 'Member Baru', value: '12', icon: Users, color: 'text-emerald-500' },
                { label: 'Estimasi Komisi', value: 'Rp 450.000', icon: TrendingUp, color: 'text-brand-green' },
                { label: 'Referral Rank', value: '#4', icon: layoutStats, color: 'text-brand-gold' }
              ].map((stat, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className={`p-3 rounded-2xl bg-slate-50 ${stat.color}`}>
                      <LayoutDashboard className="w-6 h-6" />
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-300" />
                  </div>
                  <div className="text-sm text-slate-400 font-medium mb-1">{stat.label}</div>
                  <div className="text-2xl font-bold text-slate-900 tracking-tight">{stat.value}</div>
                </motion.div>
              ))}
            </div>

            {/* Referral & Quick Links */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden relative">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-brand-soft rounded-lg">
                      <LinkIcon className="w-6 h-6 text-brand-green" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 tracking-tight">Referral Link Anda</h3>
                  </div>
                  <p className="text-slate-500 mb-6 font-medium">Bagikan link ini untuk mendapatkan komisi dari setiap pembeli yang login melalui link Anda.</p>
                  
                  <div className="flex flex-col md:flex-row gap-3">
                    <div className="flex-grow bg-slate-50 p-4 rounded-xl font-mono text-sm border border-slate-100 truncate flex items-center text-slate-600">
                      {referralUrl}
                    </div>
                    <button 
                      onClick={() => copyToClipboard(referralUrl)}
                      className="bg-brand-green text-white px-8 py-4 rounded-xl font-bold whitespace-nowrap hover:bg-[#1B3518] transition-all"
                    >
                      Salin Link
                    </button>
                  </div>
                </div>

                {/* Notice or Announcement */}
                <div className="bg-amber-50 border border-amber-100 p-6 rounded-[2rem] flex items-start gap-4">
                  <div className="p-2 bg-amber-100 rounded-xl text-amber-600">
                     <ShieldAlert className="w-6 h-6" />
                  </div>
                  <div>
                     <h4 className="font-bold text-amber-900 mb-1 leading-none">Pemberitahuan Sistem</h4>
                     <p className="text-amber-700 text-sm">Sistem member baru saja diaktifkan. Silakan lengkapi profil Anda untuk mulai menggunakan fitur affiliate dan reseller.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                 <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm h-full">
                    <h3 className="text-xl font-bold text-slate-800 mb-6 tracking-tight">Quick Actions</h3>
                    <div className="space-y-3">
                      {[
                        { label: 'Generate Konten AI', icon: Sparkles },
                        { label: 'Marketplace Link', icon: ExternalLink },
                        { label: 'Bantuan Seller', icon: MessageCircle }
                      ].map((btn, i) => (
                        <button key={i} className="flex items-center justify-between w-full p-4 rounded-2xl bg-slate-50 hover:bg-brand-soft transition-all text-slate-700 hover:text-brand-green group">
                          <div className="flex items-center gap-3 font-bold">
                             <btn.icon className="w-5 h-5 opacity-60 group-hover:opacity-100" />
                             {btn.label}
                          </div>
                          <ChevronRight className="w-4 h-4 opacity-30" />
                        </button>
                      ))}
                    </div>
                 </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar - Desktop Only for now */}
      <aside className="w-64 bg-brand-green text-white hidden lg:flex flex-col p-6 space-y-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center font-black text-xl">B</div>
          <span className="font-display font-bold tracking-tight">Bidoyi Portal</span>
        </div>

        <nav className="flex-grow space-y-2">
          {navItems.map((item) => (
            <button 
              key={item.id} 
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-3 w-full p-3 rounded-xl transition-all ${activeTab === item.id ? 'bg-white/10 text-brand-gold font-bold' : 'hover:bg-white/5 opacity-70 hover:opacity-100'}`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>

        <button 
          onClick={logout}
          className="flex items-center gap-3 w-full p-3 rounded-xl border border-white/20 hover:bg-white/10 transition-all opacity-80"
        >
          <LogOut className="w-5 h-5" />
          Keluar
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-grow overflow-y-auto">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 p-6 flex justify-between items-center sticky top-0 z-20">
          <h1 className="text-xl font-bold text-slate-800">{getDashboardTitle(profile.role)}</h1>
          <div className="flex items-center gap-4">
            <div className="text-right hidden md:block">
              <div className="text-sm font-bold text-slate-900">{profile.name}</div>
              <div className="text-xs text-slate-400 capitalize">{profile.role.replace('_', ' ')}</div>
            </div>
            <div className="w-10 h-10 bg-brand-soft rounded-full flex items-center justify-center text-brand-green font-bold">
              {profile.name[0]}
            </div>
            <button onClick={logout} className="lg:hidden p-2 text-slate-400 hover:text-red-500">
               <LogOut className="w-5 h-5" />
            </button>
          </div>
        </header>

        <div className="p-6 md:p-10 max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

// Placeholder for layoutStats to avoid lint error if not defined
const layoutStats = TrendingUp;
