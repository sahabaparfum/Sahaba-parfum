import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const price = Number(product.price30);
  const oldPrice = product.oldPrice30 ? Number(product.oldPrice30) : null;
  const discount = (oldPrice && price < oldPrice) ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0;

  return (
    <div className="group relative bg-gradient-to-b from-zinc-950 to-black border border-[#D4AF37]/15 flex flex-col items-center p-2 md:p-4 hover:border-[#D4AF37]/60 hover:shadow-[0_25px_70px_rgba(212,175,55,0.14)] transition-all duration-500 h-full rounded-[1.5rem] overflow-hidden">
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.16),transparent_45%)]" />
      {discount > 0 && (
        <span className="absolute top-3 left-3 bg-[#D4AF37] text-black text-[10px] font-black px-3 py-1 z-10 uppercase tracking-tighter rounded-full">
          -{discount}%
        </span>
      )}

      <Link to={`/product/${product.id}`} className="relative z-10 aspect-[3/4] w-full overflow-hidden mb-4 bg-zinc-900 rounded-[1.1rem] border border-white/5">
        <img src={product.imageUrl || product.image || 'https://via.placeholder.com/400'} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-80" />
      </Link>

      <div className="relative z-10 text-center w-full space-y-2 mt-auto pb-2">
        <p className="text-[9px] text-[#D4AF37]/80 uppercase tracking-[0.3em] font-bold">{product.category}</p>
        <Link to={`/product/${product.id}`}>
          <h3 className="text-xs md:text-sm font-black text-white uppercase tracking-tight truncate group-hover:text-[#D4AF37] transition">
            {product.name}
          </h3>
        </Link>
        <div className="flex justify-center items-center gap-2">
          <span className="text-[#D4AF37] font-black text-sm md:text-lg">{price} DH</span>
          {oldPrice && <span className="text-zinc-600 line-through text-[10px] md:text-xs font-bold">{oldPrice} DH</span>}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
