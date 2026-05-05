import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useCart } from '../context/CartContext';
import Swal from 'sweetalert2';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('30ML');
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() });
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return (
    <div className="flex justify-center items-center h-screen bg-[#050505]">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-[#D4AF37]"></div>
    </div>
  );
  
  if (!product) return <div className="p-10 text-center font-black uppercase tracking-widest text-white">Produit introuvable</div>;

  const currentPrice = selectedSize === '30ML' ? Number(product.price30) : Number(product.price25);
  const currentOldPrice = selectedSize === '30ML' 
    ? (product.oldPrice30 ? Number(product.oldPrice30) : null)
    : (product.oldPrice25 ? Number(product.oldPrice25) : null);

  const handleAddToCart = () => {
    if (!currentPrice || currentPrice === 0) {
      Swal.fire({ title: 'Erreur', text: 'Prix non disponible', icon: 'error', confirmButtonColor: '#000' });
      return;
    }
    addToCart({ ...product, price: currentPrice }, selectedSize, quantity);
    Swal.fire({
      title: 'AJOUTÉ !',
      text: `${product.name} est dans votre panier`,
      icon: 'success',
      timer: 2000,
      showConfirmButton: false,
      toast: true,
      position: 'top-end'
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-0 md:p-12 flex flex-col md:flex-row gap-0 md:gap-20 bg-[#050505] text-white min-h-screen">
      
      <div className="w-full md:w-1/2">
        <div className="aspect-[4/5] bg-zinc-950 rounded-[2rem] overflow-hidden relative border border-[#D4AF37]/20 shadow-[0_30px_90px_rgba(0,0,0,0.5)]">
          <img 
            src={product.imageUrl || product.image || 'https://via.placeholder.com/600'} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />
          {currentOldPrice > currentPrice && (
            <span className="absolute top-6 left-6 bg-[#D4AF37] text-white text-[11px] font-black px-4 py-2 uppercase tracking-widest rounded-none shadow-xl">
              OFFRE SPÉCIALE
            </span>
          )}
        </div>
      </div>

      <div className="w-full md:w-1/2 flex flex-col justify-center p-8 md:p-0 space-y-8">
        <div>
          <p className="text-[11px] text-zinc-400 uppercase tracking-[0.5em] font-bold mb-3">
            {product.category || "Collection Privée"}
          </p>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter bg-gradient-to-b from-white to-[#D4AF37] bg-clip-text text-transparent leading-[0.9]">
            {product.name}
          </h1>
          
          <div className="pt-8 flex items-baseline gap-6">
            <span className="text-4xl font-black text-[#D4AF37] tracking-tighter">
              {currentPrice} DH
            </span>
            {currentOldPrice && (
              <span className="text-xl text-zinc-200 line-through font-bold tracking-tighter">
                {currentOldPrice} DH
              </span>
            )}
          </div>
        </div>

        <div className="border-l-2 border-[#D4AF37] pl-6 py-2">
          <p className="text-zinc-300 leading-relaxed text-base md:text-lg font-medium whitespace-pre-line">
            {product.description ? product.description : "Découvrez l'essence du luxe avec cette fragrance signée Sahaba Parfum 306. Un mélange unique de notes olfactives raffinées pour une tenue exceptionnelle."}
          </p>
        </div>

        <div className="space-y-4">
          <p className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-400">Choisir le Format</p>
          <div className="grid grid-cols-2 gap-4">
            {['30ML', '25ML'].map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`py-5 text-[12px] font-black transition-all duration-300 border-2 rounded-none uppercase tracking-widest ${
                  selectedSize === size 
                    ? 'bg-[#D4AF37] text-black border-[#D4AF37] shadow-[0_0_35px_rgba(212,175,55,0.25)] scale-[1.02]' 
                    : 'bg-[#050505] text-white border-[#EEEEEE] hover:border-zinc-300'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4 pt-4">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between bg-black/70 h-16 w-full border-2 border-[#D4AF37]/50 rounded-full px-6">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))} 
                className="text-2xl font-black p-2 hover:text-zinc-400 transition-colors"
              >-</button>
              <span className="font-black text-sm uppercase tracking-widest text-white">Quantité: {quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)} 
                className="text-2xl font-black p-2 hover:text-zinc-400 transition-colors"
              >+</button>
            </div>
            
            <button 
              onClick={handleAddToCart}
              className="w-full bg-[#D4AF37] text-black h-16 rounded-none font-black uppercase tracking-[0.3em] text-[11px] hover:bg-white transition-all flex items-center justify-center gap-4 active:scale-[0.98] shadow-xl"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              Ajouter au panier
            </button>
          </div>
        </div>

        <div className="pt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-[#D4AF37]/20">
           <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-black text-white flex items-center justify-center rounded-none">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M5 13l4 4L19 7" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Disponibilité</p>
                <p className="text-[9px] font-bold text-green-600 uppercase">Produit en Stock</p>
              </div>
           </div>
           
           <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-zinc-900 text-[#D4AF37] flex items-center justify-center rounded-none border border-[#D4AF37]/20">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2.5"/>
                </svg>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Livraison</p>
                <p className="text-[9px] font-bold text-zinc-400 uppercase">Selon Votre Ville ✅</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;