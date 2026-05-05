import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Header = () => {
  const { cartItems } = useCart();

  const navLink = "text-[10px] font-black uppercase tracking-[0.28em] text-zinc-300 hover:text-[#D4AF37] transition duration-300";

  return (
    <header className="bg-[#050505]/90 backdrop-blur-xl border-b border-[#D4AF37]/20 sticky top-0 z-50 shadow-[0_10px_40px_rgba(0,0,0,0.45)]">
      <div className="max-w-7xl mx-auto px-4 h-20 flex justify-between items-center">
        <nav className="hidden md:flex gap-8 items-center flex-1">
          <Link to="/femme" className={navLink}>Femme</Link>
          <Link to="/homme" className={navLink}>Homme</Link>
          <Link to="/about" className={navLink}>Notre Histoire</Link>
          <Link to="/avis">Avis</Link>
        </nav>

        <Link to="/" className="flex justify-center items-center group">
          <div className="w-16 h-16 rounded-full overflow-hidden border border-[#D4AF37]/60 shadow-[0_0_35px_rgba(212,175,55,0.25)] group-hover:shadow-[0_0_55px_rgba(212,175,55,0.45)] transition duration-500 bg-black">
            <img src="/logo.jpeg" alt="Sahaba 306 Logo" className="w-full h-full object-cover" />
          </div>
        </Link>

        <div className="flex-1 flex justify-end">
          <Link to="/cart" className="relative p-3 group rounded-full border border-[#D4AF37]/20 hover:border-[#D4AF37]/70 transition">
            <svg className="w-5 h-5 text-[#D4AF37] group-hover:scale-110 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {cartItems?.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#D4AF37] text-black text-[9px] font-black rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                {cartItems.length}
              </span>
            )}
          </Link>
        </div>
      </div>

      <div className="md:hidden flex justify-center gap-5 pb-3 border-t border-[#D4AF37]/10 pt-3 bg-black/60">
        <Link to="/femme" className="text-[9px] font-black uppercase tracking-widest text-zinc-300 hover:text-[#D4AF37] transition">Femme</Link>
        <Link to="/homme" className="text-[9px] font-black uppercase tracking-widest text-zinc-300 hover:text-[#D4AF37] transition">Homme</Link>
        <Link to="/about" className="text-[9px] font-black uppercase tracking-widest text-[#D4AF37] border-l pl-5 border-[#D4AF37]/20">Notre Histoire</Link>
        <Link to="/avis" className="text-[9px] font-black uppercase tracking-widest text-zinc-300 hover:text-[#D4AF37] transition">Avis</Link>
      </div>
    </header>
  );
};

export default Header;
