/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { 
  CheckCircle2, 
  XCircle, 
  MessageCircle, 
  ShieldCheck, 
  Leaf, 
  Droplets, 
  Star,
  ShoppingBag,
  Sparkles,
  Info
} from 'lucide-react';

const WA_LINK = "https://wa.me/6285225403076";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const Section = ({ children, className = "", id }: { children: React.ReactNode, className?: string, id?: string }) => (
  <section id={id} className={`py-12 px-6 lg:py-16 ${className}`}>
    <div className="landing-container">
      {children}
    </div>
  </section>
);

const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-bottom border-brand-soft py-4 px-6 md:px-12">
    <div className="landing-container flex justify-between items-center text-brand-green">
      <div className="flex items-center gap-2">
        <Leaf className="w-6 h-6" />
        <span className="font-display font-bold text-xl tracking-tight">Bidoyi Citronella</span>
      </div>
      <div className="hidden md:flex gap-4 items-center">
        <div className="flex items-center gap-1 text-xs font-semibold bg-brand-soft px-3 py-1 rounded-full">
          <ShieldCheck className="w-3 h-3" />
          BPOM NA18210500991
        </div>
      </div>
    </div>
  </nav>
);

export default function App() {
  return (
    <div className="min-h-screen pt-16 selection:bg-brand-soft selection:text-brand-green">
      <Navbar />

      {/* 1. HERO SECTION */}
      <Section className="bg-white overflow-hidden">
        {/* Centered Headline & Tagline */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.div {...fadeIn}>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-soft text-brand-green rounded-full text-sm font-semibold mb-6">
              <Sparkles className="w-4 h-4" />
              <span>100% Herbal Ingredients</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl leading-tight mb-8 text-slate-900 font-display">
              <span className="bg-[linear-gradient(to_top,#fde047_50%,transparent_50%)] box-decoration-clone px-1">
                Wajah Kusam & Berminyak?
              </span>{' '}
              Saatnya Rawat Kulit dengan Sabun Herbal Alami
            </h1>
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed mx-auto max-w-2xl">
              Sabun herbal dengan kombinasi minyak sereh merah, propolis, lemon, dan olive oil untuk membantu membersihkan wajah & tubuh setiap hari.
            </p>
          </motion.div>
        </div>

        {/* Single Column Layout: Image -> Benefits -> Button */}
        <div className="flex flex-col items-center max-w-4xl mx-auto space-y-16">
          {/* 1. Image First */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative w-full max-w-2xl"
          >
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl shadow-brand-green/20 bg-white">
              <img 
                src="https://i.ibb.co/DDZKSZZq/Chat-GPT-Image-May-12-2026-09-37-32-PM.png" 
                alt="Sabun Herbal Bidoyi Citronella" 
                className="w-full h-auto block"
              />
            </div>
            {/* Abstract decorative elements */}
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-brand-soft rounded-full -z-0 blur-3xl opacity-50"></div>
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-brand-green/10 rounded-full -z-0 blur-3xl opacity-50"></div>
          </motion.div>

          {/* 2. Benefits & Button */}
          <motion.div {...fadeIn} className="flex flex-col items-center text-center w-full">
            <div className="grid md:grid-cols-2 gap-4 md:gap-8 mb-12 w-full max-w-3xl">
              {[
                "Membantu merawat kulit berjerawat",
                "Membantu menyamarkan noda hitam",
                "Membantu menjaga kulit tetap bersih & segar",
                "Cocok digunakan untuk wajah & tubuh"
              ].map((benefit, i) => (
                <div key={i} className="flex items-center gap-3 text-left bg-brand-soft/30 p-4 rounded-2xl border border-brand-soft/50">
                  <CheckCircle2 className="w-6 h-6 text-brand-green shrink-0" />
                  <span className="text-lg text-slate-700 font-medium leading-tight">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-8 w-full max-w-xl">
              <a 
                href={WA_LINK}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white font-bold py-5 px-10 rounded-2xl shadow-lg shadow-green-200 transition-all transform hover:-translate-y-1 active:scale-95 text-xl md:text-2xl"
                id="hero-cta"
              >
                <MessageCircle className="w-8 h-8" />
                Konsultasi & Order via WhatsApp
              </a>

              <div className="flex items-center justify-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all">
                <div className="text-center">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">BPOM RI</div>
                  <div className="font-mono text-sm font-bold text-slate-800">NA18210500991</div>
                </div>
                <div className="h-10 w-px bg-slate-200"></div>
                <div className="text-center">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Halal</div>
                  <div className="font-mono text-sm font-bold text-slate-800">LPPOM MUI</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* 2. SECTION MASALAH */}
      <Section className="bg-brand-soft/30 border-y border-brand-soft">
        <motion.div 
          className="text-center mb-12"
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl lg:text-4xl text-slate-900 mb-4">Masih Mengalami Masalah Kulit Seperti Ini?</h2>
          <div className="w-20 h-1.5 bg-brand-green mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Wajah Cepat Berminyak", icon: <Droplets className="w-8 h-8 text-red-500" /> },
            { title: "Bekas Jerawat Sulit Memudar", icon: <Sparkles className="w-8 h-8 text-red-500" /> },
            { title: "Kulit Kusam & Pori Besar", icon: <XCircle className="w-8 h-8 text-red-500" /> },
            { title: "Bau Badan Selepas Aktivitas", icon: <Info className="w-8 h-8 text-red-500" /> },
            { title: "Kulit Kurang Bersih & Segar", icon: <Droplets className="w-8 h-8 text-red-500" /> }
          ].map((item, i) => (
            <motion.div 
              key={i}
              whileInView={{ opacity: 1, scale: 1 }}
              initial={{ opacity: 0, scale: 0.95 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 rounded-2xl border border-brand-soft flex items-center gap-4 shadow-sm"
            >
              <div className="bg-red-50 p-4 rounded-xl">
                {item.icon}
              </div>
              <h3 className="text-xl text-slate-800 font-bold">{item.title}</h3>
            </motion.div>
          ))}
        </div>
        
        <p className="text-center mt-12 text-slate-500 text-lg font-bold">
          Perawatan harian yang tepat membantu kulit tetap bersih, nyaman, dan terawat.
        </p>
      </Section>

      {/* 3. SECTION SOLUSI / PRODUK */}
      <Section className="bg-white">
        <div className="flex flex-col items-center max-w-4xl mx-auto space-y-16">
          {/* 1. Image First */}
          <motion.div 
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 30 }}
            viewport={{ once: true }}
            className="w-full max-w-2xl"
          >
            <div className="relative">
              <img 
                src="https://i.ibb.co/MD7fDj2F/Chat-GPT-Image-May-12-2026-09-47-27-PM.png" 
                alt="Bahan Alami Sereh Merah dan Minyak Zaitun" 
                className="rounded-3xl shadow-xl border-4 border-brand-soft w-full h-auto block"
              />
              <div className="absolute -bottom-6 -left-4 md:-left-6 bg-brand-green text-white p-4 md:p-6 rounded-2xl shadow-xl max-w-[160px] md:max-w-[200px] z-10">
                <p className="text-xs md:text-sm font-bold leading-tight">Racikan Herbal Alami Pilihan Grade A+</p>
              </div>
            </div>
          </motion.div>

          {/* 2. Content Underneath */}
          <motion.div 
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 30 }}
            viewport={{ once: true }}
            className="space-y-12 w-full text-center"
          >
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl lg:text-4xl text-slate-900 mb-6 font-display leading-tight">
                Kenapa Banyak Orang Memilih Bidoyi Citronella?
              </h2>
              <p className="text-lg md:text-xl text-slate-600 leading-relaxed px-4">
                Diperkaya bahan herbal alami pilihan untuk membantu membersihkan sekaligus merawat kulit setiap hari.
              </p>
            </div>

            {/* KANDUNGAN UTAMA */}
            <div className="bg-brand-soft/20 p-8 rounded-[2rem] border border-brand-soft max-w-2xl mx-auto">
              <h3 className="text-brand-green text-xl mb-6 flex items-center justify-center gap-2">
                <Leaf className="w-6 h-6" />
                6 Kandungan Alami Utama
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {[
                  "Minyak Sereh Merah",
                  "Natural Collagen",
                  "Madu Propolis",
                  "Olive Oil",
                  "Lemon Oil",
                  "Coconut Oil"
                ].map((ing, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white py-4 px-6 rounded-full border border-brand-soft shadow-sm">
                    <CheckCircle2 className="w-5 h-5 text-brand-green" />
                    <span className="text-base font-bold text-slate-700">{ing}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* MANFAAT UTAMA */}
            <div className="space-y-6 max-w-2xl mx-auto text-left">
              <h3 className="text-slate-900 text-xl flex items-center justify-center gap-2 px-2">
                <Sparkles className="w-6 h-6 text-brand-gold" />
                Manfaat Untuk Kulit Anda
              </h3>
              <div className="grid gap-4">
                {[
                  { title: "Deep Cleansing", text: "Membersihkan hingga ke pori dari kotoran & minyak berlebih" },
                  { title: "Acne Care", text: "Membantu merawat dan menenangkan kulit berjerawat" },
                  { title: "Smooth Texture", text: "Membantu permukaan kulit terasa lebih halus & lembut" },
                  { title: "Long Lasting Freshness", text: "Menjaga kesegaran area tubuh sepanjang hari" }
                ].map((benefit, i) => (
                  <div key={i} className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-slate-100 hover:border-brand-green/30 transition-all shadow-sm">
                    <div className="bg-brand-soft p-2 rounded-xl text-brand-green shrink-0">
                      <Droplets className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-lg text-slate-900 font-bold mb-1">{benefit.title}</h4>
                      <p className="text-slate-600 text-base leading-relaxed">{benefit.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* 4. SECTION TESTIMONI */}
      <Section className="bg-brand-green text-white">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl mb-4">Apa Kata Mereka?</h2>
          <p className="text-brand-soft opacity-80">Ribuan orang sudah merasakan kebersihan alami Bidoyi</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: "Dina", city: "Bandung", text: "Baru rutin pakai beberapa minggu, wajah terasa lebih bersih dan minyak mulai berkurang." },
            { name: "Rina", city: "Bekasi", text: "Dipakai mandi setelah aktivitas luar rumah bikin badan terasa lebih segar." },
            { name: "Maya", city: "Surabaya", text: "Suka karena busanya lembut dan nggak bikin kulit terasa ketarik." }
          ].map((testi, i) => (
            <motion.div 
              key={i}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 30 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/10 backdrop-blur-sm border border-white/20 p-8 rounded-3xl"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />)}
              </div>
              <p className="text-base md:text-lg italic mb-6 leading-relaxed font-medium">"{testi.text}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-brand-soft rounded-full flex items-center justify-center text-brand-green font-bold text-lg">
                  {testi.name[0]}
                </div>
                <div>
                  <div className="font-bold text-lg">{testi.name}</div>
                  <div className="text-sm opacity-70">{testi.city}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* 5. SECTION LEGALITAS + TRUST */}
      <Section className="bg-white">
        <div className="flex flex-col items-center gap-12 bg-brand-light rounded-[40px] p-8 md:p-16 border border-brand-soft max-w-4xl mx-auto">
          {/* 1. Image on top */}
          <div className="w-full">
            <div className="relative">
              <img 
                src="https://i.ibb.co/qYL5TbYY/Chat-GPT-Image-12-Mei-2026-22-01-10.png" 
                alt="Sertifikasi BPOM dan Halal Resmi" 
                className="rounded-3xl shadow-2xl relative z-10 w-full h-auto block"
              />
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-gold/10 rounded-full blur-2xl"></div>
              <div className="absolute inset-0 rounded-3xl border border-white/20 z-20 pointer-events-none"></div>
            </div>
          </div>

          {/* 2. Text Content below */}
          <div className="w-full text-center">
            <h2 className="text-3xl lg:text-4xl text-slate-900 mb-6">Sudah Terdaftar BPOM & Halal</h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-2xl mx-auto">
              Kualitas dan keamanan produk adalah prioritas kami. Semua produk diproduksi sesuai standar GMP dengan bahan herbal pilihan.
            </p>
            <div className="space-y-4 max-w-lg mx-auto">
              {[
                { label: "BPOM RI", code: "NA18210500991", color: "text-brand-green" },
                { label: "Halal Indonesia", code: "LPPOM-00150092991218", color: "text-brand-green" },
                { label: "Herbal Certified", code: "100% Bahan Alami", color: "text-brand-green" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-brand-soft/50 text-left">
                  <div className="bg-brand-soft p-3 rounded-xl text-brand-green">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <div>
                    <div className="text-sm font-bold uppercase text-slate-400">{item.label}</div>
                    <div className="text-xl md:text-2xl text-brand-green font-display font-bold">{item.code}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* 6. SECTION HARGA */}
      <Section id="pricing" className="bg-brand-soft/20">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl mb-4">Pilih Paket Perawatan Anda</h2>
          <p className="text-slate-600">Investasi terbaik untuk kulit masa depan Anda</p>
        </div>

        <div className="flex flex-col gap-8 max-w-2xl mx-auto">
          {/* Paket 1 Pcs */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white rounded-[32px] p-8 border border-brand-soft shadow-xl relative overflow-hidden flex flex-col md:flex-row md:items-center gap-8"
          >
            <div className="absolute top-0 right-0 bg-brand-soft text-brand-green text-xs font-bold px-6 py-2 rounded-bl-2xl">Hemat</div>
            <div className="flex-grow">
              <h3 className="text-2xl font-bold text-slate-900 mb-1">Paket 1 Pcs</h3>
              <div className="text-sm text-slate-400 mb-4 font-medium italic">Netto 80 gram</div>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-slate-600 font-semibold">
                  <CheckCircle2 className="w-5 h-5 text-brand-green shrink-0" /> 1 Bar Citronella Soap
                </li>
                <li className="flex items-center gap-3 text-slate-400 font-semibold">
                  <CheckCircle2 className="w-5 h-5 opacity-20 shrink-0" /> Free Konsultasi
                </li>
              </ul>
            </div>
            <div className="md:text-right flex flex-col shrink-0">
              <div className="mb-4">
                <div className="text-slate-400 line-through text-sm">Rp75.000</div>
                <div className="text-4xl font-display font-extrabold text-brand-green leading-none">Rp55.000</div>
              </div>
              <a 
                href={WA_LINK} 
                className="inline-flex items-center justify-center px-8 py-3 bg-brand-soft border-2 border-brand-green text-brand-green font-bold rounded-xl hover:bg-brand-green hover:text-white transition-all shadow-sm"
              >
                Order Paket 1 Pcs
              </a>
            </div>
          </motion.div>

          {/* Paket 3 Pcs */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-brand-light rounded-[32px] p-8 border-2 border-brand-green shadow-2xl relative overflow-hidden flex flex-col md:flex-row md:items-center gap-8"
          >
            <div className="absolute top-0 right-0 bg-brand-green text-white text-xs font-bold px-6 py-2 rounded-bl-2xl">Paling Populer</div>
            <div className="flex-grow">
              <h3 className="text-2xl font-bold text-slate-900 mb-1">Paket 3 Pcs</h3>
              <div className="text-sm text-brand-green mb-4 font-medium italic">Netto 3x 80 gram (Lebih Hemat)</div>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-slate-700 font-bold">
                  <CheckCircle2 className="w-6 h-6 text-brand-green shrink-0" /> 3 Bar Citronella Soap
                </li>
                <li className="flex items-center gap-3 text-slate-700 font-bold">
                  <CheckCircle2 className="w-6 h-6 text-brand-green shrink-0" /> Free Konsultasi
                </li>
                <li className="flex items-center gap-3 text-slate-700 font-bold">
                  <CheckCircle2 className="w-6 h-6 text-brand-green shrink-0" /> Free Ongkir (Area P. Jawa)
                </li>
              </ul>
            </div>
            <div className="md:text-right flex flex-col shrink-0">
              <div className="mb-4">
                <div className="text-slate-400 line-through text-sm">Rp225.000</div>
                <div className="text-4xl font-display font-extrabold text-slate-900 leading-none">Rp160.000</div>
              </div>
              <a 
                href={WA_LINK} 
                className="inline-flex items-center justify-center px-8 py-4 bg-brand-green text-white font-bold rounded-xl hover:bg-[#1B3518] transition-all shadow-lg hover:shadow-brand-green/20"
              >
                Ambil Promo 3 Pcs
              </a>
            </div>
          </motion.div>

          {/* Paket Box */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-brand-green rounded-[32px] p-8 border-4 border-brand-gold shadow-2xl relative overflow-hidden flex flex-col md:flex-row md:items-center gap-8 text-white"
          >
            <div className="absolute top-0 right-0 bg-brand-gold text-brand-green text-sm font-black px-6 py-2 rounded-bl-2xl uppercase tracking-tighter shadow-lg">Bestseller</div>
            <div className="flex-grow">
              <h3 className="text-2xl font-bold text-white mb-1">1 Box (Isi 5 Pcs)</h3>
              <div className="text-sm text-brand-gold mb-4 font-medium italic">Stok Persediaan 1-2 Bulan</div>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 font-bold text-lg">
                  <CheckCircle2 className="w-6 h-6 text-brand-gold shrink-0" /> 5 Bar Citronella Soap
                </li>
                <li className="flex items-center gap-3 font-bold text-lg text-brand-soft">
                  <CheckCircle2 className="w-6 h-6 text-brand-gold shrink-0" /> Harga lebih ekonomis
                </li>
                <li className="flex items-center gap-3 font-bold text-lg text-brand-soft">
                  <CheckCircle2 className="w-6 h-6 text-brand-gold shrink-0" /> Free Ongkir (Area P. Jawa)
                </li>
              </ul>
            </div>
            <div className="md:text-right flex flex-col shrink-0">
              <div className="mb-4">
                <div className="text-white/40 line-through text-sm">Rp275.000</div>
                <div className="text-5xl font-display font-extrabold text-white leading-none">Rp200.000</div>
              </div>
              <a 
                href={WA_LINK} 
                className="inline-flex items-center justify-center px-8 py-4 bg-brand-gold text-brand-green font-black rounded-xl hover:scale-105 transition-all shadow-xl shadow-black/20 text-lg uppercase"
              >
                Ambil Promo Box
              </a>
            </div>
          </motion.div>
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex flex-col items-center gap-4">
             <h3 className="text-2xl text-slate-900">💬 Tanya Stok & Order Sekarang</h3>
             <p className="text-slate-500 font-medium">Respon cepat via WhatsApp - Konsultasi Gratis!</p>
          </div>
        </div>
      </Section>

      {/* 7. SECTION CARA PAKAI */}
      <Section className="bg-white">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl text-brand-green mb-4">Cara Penggunaan</h2>
          <div className="w-16 h-1 bg-brand-gold mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-12 text-center max-w-5xl mx-auto">
          {[
            { step: "1️⃣", title: "Basahi", text: "Basahi wajah atau tubuh dengan air bersih." },
            { step: "2️⃣", title: "Usapkan", text: "Usapkan busa sabun secara merata ±30-60 detik agar meresap." },
            { step: "3️⃣", title: "Bilas", text: "Bilas hingga bersih dengan air mengalir." }
          ].map((item, i) => (
            <motion.div 
              key={i}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative px-4"
            >
              <div className="text-6xl mb-6">{item.step}</div>
              <h4 className="text-2xl text-brand-green mb-4 tracking-tight font-black">{item.title}</h4>
              <p className="text-slate-600 text-lg md:text-xl leading-relaxed font-medium">{item.text}</p>
              {i < 2 && <div className="hidden lg:block absolute top-1/2 -right-6 translate-x-1/2 text-brand-soft text-4xl">➔</div>}
            </motion.div>
          ))}
        </div>

        <div className="mt-16 bg-brand-soft/30 p-8 rounded-3xl text-center border-2 border-dashed border-brand-soft max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 text-brand-green font-bold mb-2">
            <Info className="w-5 h-5" /> Anjuran
          </div>
          <p className="text-slate-600 font-medium">Gunakan rutin pagi & malam untuk hasil maksimal perawatan harian.</p>
        </div>
      </Section>

      {/* 8. FINAL CTA */}
      <Section className="bg-gradient-to-br from-brand-green to-[#1B3518] text-white overflow-hidden relative">
        {/* Decorative Circles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-gold/10 rounded-full blur-3xl -ml-32 -mb-32"></div>

        <div className="text-center relative z-10 py-12">
          <motion.div
             whileInView={{ scale: 1, opacity: 1 }}
             initial={{ scale: 0.9, opacity: 0 }}
             viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-5xl mb-8 leading-tight">
              Mulai Rawat Kulit Lebih Bersih & Segar Setiap Hari
            </h2>
            <p className="text-xl text-brand-soft/80 mb-12 max-w-2xl mx-auto">
              Sabun herbal alami untuk membantu menjaga kebersihan dan kenyamanan kulit wajah maupun tubuh tanpa bahan kimia keras.
            </p>
            
            <a 
              href={WA_LINK}
              className="inline-flex items-center justify-center gap-4 bg-white text-brand-green text-xl md:text-2xl font-black py-6 px-12 rounded-[2rem] shadow-2xl hover:bg-brand-soft transition-all transform hover:-translate-y-2 active:scale-95 group"
            >
              <MessageCircle className="w-8 h-8 text-green-500 group-hover:scale-110 transition-transform" />
              Order via WhatsApp Sekarang
            </a>
            
            <div className="mt-12 flex flex-wrap justify-center gap-8 opacity-60">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-brand-gold" />
                <span className="text-sm font-bold">100% Original</span>
              </div>
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-brand-gold" />
                <span className="text-sm font-bold">Ready Stock</span>
              </div>
              <div className="flex items-center gap-2 text-brand-gold">
                <Star className="w-5 h-5 fill-brand-gold" />
                <span className="text-sm font-bold text-white">4.9/5 Rating</span>
              </div>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="py-12 bg-white text-center border-t border-slate-100">
        <div className="landing-container opacity-40">
          <div className="flex justify-center items-center gap-2 h-6 mb-4">
             <Leaf className="w-4 h-4" />
             <span className="font-display font-bold">BIDOYI CITRONELLA</span>
          </div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] mb-2">BPOM NA18210500991</p>
          <p className="text-[10px]">&copy; 2024 Bidoyi Citronella Indonesia. All rights reserved.</p>
        </div>
      </footer>

      {/* Floating WA Button for Mobile */}
      <a 
        href={WA_LINK}
        className="fixed bottom-6 right-6 z-[60] md:hidden bg-green-500 text-white p-4 rounded-full shadow-2xl animate-bounce hover:animate-none"
      >
        <MessageCircle className="w-8 h-8" />
      </a>
    </div>
  );
}
