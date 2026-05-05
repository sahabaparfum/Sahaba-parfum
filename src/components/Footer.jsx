import React, { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { doc, onSnapshot } from 'firebase/firestore';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [whatsappPhone, setWhatsappPhone] = useState("212693312011");

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "settings", "whatsapp"), (doc) => {
      if (doc.exists()) setWhatsappPhone(doc.data().phone);
    });
    return () => unsub();
  }, []);

  return (
    <footer className="bg-black text-white py-14 mt-20 border-t border-[#D4AF37]/20 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[180px] bg-[#D4AF37]/10 blur-[100px] rounded-full" />
      <div className="relative max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
        <div>
          <h3 className="text-[#D4AF37] font-black mb-4 uppercase tracking-[0.25em] text-sm">Sahaba Parfum 306</h3>
          <p className="text-zinc-500 text-sm leading-relaxed">Spécialiste des parfums haut de gamme. Qualité et tenue longue durée garanties.</p>
        </div>
        <div>
          <h4 className="font-black mb-4 text-sm uppercase tracking-widest text-white">Livraison</h4>
          <p className="text-zinc-500 text-sm">Livraison rapide partout au Maroc avec une expérience premium.</p>
        </div>
        <div>
          <h4 className="font-black mb-4 text-sm uppercase tracking-widest text-white">Contact</h4>
          <p className="text-[#D4AF37] text-sm mb-1 uppercase font-black text-[10px] tracking-widest">WhatsApp direct</p>
          <a href={`https://wa.me/${whatsappPhone}`} target="_blank" rel="noopener noreferrer" className="text-zinc-500 text-sm hover:text-[#D4AF37] transition-colors block">+{whatsappPhone}</a>
          <p className="text-zinc-500 text-sm mt-2">Email: sahabaparfum@gmail.com</p>
        </div>
      </div>

      <div className="relative border-t border-[#D4AF37]/10 mt-10 pt-6 text-center text-[10px] text-zinc-600 uppercase tracking-widest">
        &copy; 2026
        <Link to="/admin" className="cursor-default hover:text-[#D4AF37] transition ml-1" style={{ textDecoration: 'none' }}>
          Sahaba Parfum 306
        </Link>
        . Powered by Hipatya Dev.
      </div>
    </footer>
  );
};

export default Footer;
