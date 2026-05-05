import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="w-full bg-[#050505]">
      <div className="relative w-full overflow-hidden min-h-[72vh] flex items-center justify-center">
        <img src="/hero.jpg" alt="Sahaba Parfum 306" className="absolute inset-0 w-full h-full object-cover opacity-55 scale-105" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/35 to-[#050505]" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[420px] h-[420px] bg-[#D4AF37]/10 blur-[120px] rounded-full" />

        <div className="relative z-10 flex flex-col items-center justify-center text-center text-white px-4 max-w-5xl mx-auto">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-10 bg-[#D4AF37]/70" />
            <p className="text-[#D4AF37] text-[10px] md:text-xs uppercase tracking-[0.6em] font-black">Luxury Fragrance</p>
            <span className="h-px w-10 bg-[#D4AF37]/70" />
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black uppercase tracking-[0.12em] md:tracking-[0.22em] mb-4 bg-gradient-to-b from-white via-[#F9E27E] to-[#B8860B] bg-clip-text text-transparent drop-shadow-[0_20px_60px_rgba(212,175,55,0.22)]">
            SAHABA 306
          </h1>
          <p className="text-[10px] sm:text-xs md:text-base font-light uppercase tracking-[0.45em] mb-9 text-zinc-200">
            L'essence de l'élégance marocaine
          </p>

          <Link to="/" className="group relative inline-flex items-center justify-center px-10 md:px-14 py-4 overflow-hidden border border-[#D4AF37]/70 rounded-full transition-all duration-500 hover:shadow-[0_0_45px_rgba(212,175,55,0.28)]">
            <span className="absolute inset-0 bg-[#D4AF37] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
            <span className="relative z-10 text-[#D4AF37] group-hover:text-black font-black uppercase text-[10px] md:text-xs tracking-[0.3em]">Découvrir</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
