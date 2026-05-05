import React, { useEffect, useState } from 'react';
import { db } from '../firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import ProductCard from '../components/ProductCard';

const Homme = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); 
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const productsPerPage = 16;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, "products"));
        const docs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        const filtered = docs.filter(p => 
          p.category?.toLowerCase() === 'homme' && 
          (Number(p.stock30) > 0 || Number(p.stock25) > 0)
        );
        setProducts(filtered);
      } catch (err) {
        console.error("Firestore Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredSearch = products.filter(p => 
    p.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredSearch.slice(indexOfFirstProduct, indexOfLastProduct);

  if (loading) return (
    <div className="flex justify-center items-center h-screen bg-[#050505]">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-[#D4AF37]"></div>
    </div>
  );

  return (
    <div className="bg-[#050505] text-white max-w-7xl mx-auto px-4 py-12 min-h-screen">
      
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6 border-b border-[#D4AF37]/20 pb-8">
        <div>
          <h1 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter bg-gradient-to-r from-white to-[#D4AF37] bg-clip-text text-transparent">Collection Homme</h1>
          <p className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1">L'essence du caractère</p>
        </div>

        <div className="relative w-full md:w-80">
          <input 
            type="text"
            placeholder="RECHERCHER..."
            className="w-full border-b border-[#D4AF37]/25 py-3 px-2 focus:border-[#D4AF37] outline-none transition-all text-sm font-bold tracking-widest uppercase bg-transparent text-white placeholder:text-zinc-600"
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); 
            }}
          />
          <svg className="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
        {currentProducts.length > 0 ? (
          currentProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="col-span-full text-center py-20 text-zinc-500 italic text-sm font-bold uppercase tracking-widest">
            {searchTerm ? `Aucun résultat pour "${searchTerm}"` : "La collection est vide."}
          </div>
        )}
      </div>

      {filteredSearch.length > productsPerPage && (
        <div className="flex justify-center mt-16 gap-4">
          <button 
            disabled={currentPage === 1}
            onClick={() => {
              setCurrentPage(prev => prev - 1);
              window.scrollTo(0, 0);
            }}
            className="px-6 py-3 border border-[#D4AF37]/60 text-[#D4AF37] font-black text-[10px] uppercase tracking-widest disabled:opacity-20 transition rounded-full hover:bg-[#D4AF37] hover:text-black"
          >
            Précédent
          </button>
          <button 
            disabled={indexOfLastProduct >= filteredSearch.length}
            onClick={() => {
              setCurrentPage(prev => prev + 1);
              window.scrollTo(0, 0);
            }}
            className="px-6 py-3 bg-[#D4AF37] text-black font-black text-[10px] uppercase tracking-widest disabled:opacity-20 transition rounded-full hover:bg-white"
          >
            Suivant
          </button>
        </div>
      )}
    </div>
  );
};

export default Homme;