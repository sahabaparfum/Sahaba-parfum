import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { db } from '../firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';

const shippingRates = {
  "Safi": 10,
  "Casablanca": 35,
  "Rabat": 35,
  "Salé": 35,
  "Kénitra": 35,
  "Agadir": 35,
  "Berrechid": 40,
  "El Jadida": 40,
  "Fès": 40,
  "Témara": 40,
  "Inzegane": 40,
  "Beni Mellal": 40,
  "Tétouan": 40,
  "Larache": 40,
  "Autre ville": 45 
};

const Cart = () => {
  const { cartItems, clearCart, removeFromCart } = useCart();
  const [adminPhone, setAdminPhone] = useState("");
  const [client, setClient] = useState({ nom: '', villeSelect: 'Safi', villeAutre: '', adresse: '', tele: '' });

  const delivery = shippingRates[client.villeSelect] || 0;
  const total = cartItems?.reduce((acc, item) => acc + (item.price * item.quantity), 0) || 0;

  useEffect(() => {
    const fetchSettings = async () => {
      const docRef = doc(db, "settings", "whatsapp");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) setAdminPhone(docSnap.data().phone);
    };
    fetchSettings();
  }, []);

  const handleWhatsAppOrder = (e) => {
    e.preventDefault();
    
    if (!cartItems || cartItems.length === 0) {
      Swal.fire({
        title: 'Panier vide',
        text: 'Votre panier est vide ! Ajoutez des produits avant de commander.',
        icon: 'info',
        confirmButtonText: 'OK',
        customClass: { confirmButton: 'bg-black text-white px-6 py-2 rounded-lg' },
        buttonsStyling: false
      });
      return;
    }

    const finalVille = client.villeSelect === 'Autre' ? client.villeAutre : client.villeSelect;

    let message = `*SAHABA PARFUM 306 - NOUVELLE COMMANDE*\n`;
    message += `━━━━━━━━━━━━━━━━━━━━\n\n`;
    message += `👤 *CLIENT*\n`;
    message += `• *Nom:* ${client.nom}\n`;
    message += `• *Télé:* ${client.tele}\n`;
    message += `• *Ville:* ${finalVille}\n`;
    message += `• *Adresse:* ${client.adresse}\n\n`;
    
    message += `📦 *PRODUITS*\n`;
    cartItems.forEach(item => {
      message += `• ${item.name} (${item.size})\n`;
      message += `   Qty: ${item.quantity} | ${item.price} DH\n`;
    });
    
    message += `\n━━━━━━━━━━━━━━━━━━━━\n`;
    message += `💰 *DÉTAILS DU PAIEMENT*\n`;
    message += `• Sous-total: ${total} DH\n`;
    message += `• Frais de livraison: ${delivery === 0 ? 'GRATUIT' : delivery + ' DH'}\n`;
    message += `• *TOTAL À PAYER: ${total + delivery} DH*\n\n`;
    message += `━━━━━━━━━━━━━━━━━━━━\n`;
    message += `_Commande envoyée depuis le site web._`;

    const waURL = `https://wa.me/${adminPhone}?text=${encodeURIComponent(message)}`;
    window.open(waURL, '_blank');
    
    clearCart();

    Swal.fire({
      title: 'Commande Envoyée',
      text: 'Votre commande a été transmise via WhatsApp.',
      icon: 'success',
      confirmButtonText: 'Super',
      customClass: { confirmButton: 'bg-green-600 text-white px-6 py-2 rounded-lg' },
      buttonsStyling: false
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-12 min-h-[70vh]">
      <div className="mb-12 border-b pb-6">
        <h1 className="text-3xl font-black uppercase italic tracking-tighter">Mon Panier</h1>
        <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-2">Finalisez votre commande de luxe</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

        <div className="space-y-6">
          {!cartItems || cartItems.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 border-2 border-dashed rounded-xl">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Votre panier est vide</p>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex gap-4 border-b pb-4 items-center group">
                    <img src={item.image} alt={item.name} className="w-16 h-20 object-cover rounded shadow-sm" />
                    <div className="flex-1">
                      <h3 className="font-black text-xs uppercase tracking-tight">{item.name}</h3>
                      <p className="text-[10px] text-gray-400 font-bold uppercase">{item.size} • Qté: {item.quantity}</p>
                      <p className="font-bold text-sm mt-1">{item.price} DH</p>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id, item.size, item.name)} 
                      className="text-gray-300 hover:text-red-500 transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>

              <div className="pt-6 space-y-2 border-t-2 border-black">
                <div className="flex justify-between text-[10px] font-bold uppercase text-gray-400">
                  <span>Sous-total</span>
                  <span>{total} DH</span>
                </div>
                <div className="flex justify-between text-[10px] font-bold uppercase text-green-600">
                  <span>Livraison</span>
                  <span>{delivery === 0 ? 'Gratuit' : `${delivery} DH`}</span>
                </div>
                <div className="flex justify-between text-xl font-black pt-2">
                  <span>TOTAL</span>
                  <span>{total + delivery} DH</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* FORM */}
        <div className="bg-white p-8 border rounded-xl shadow-sm h-fit">
          <h2 className="text-xs font-black mb-8 uppercase tracking-[0.3em] border-b pb-4 text-center">Détails de Livraison</h2>

          <form onSubmit={handleWhatsAppOrder} className="space-y-5">

            <input type="text" placeholder="Nom Complet" required
              className="w-full p-3 border rounded-lg bg-gray-50"
              onChange={(e) => setClient({...client, nom: e.target.value})}
            />

            <input type="tel" placeholder="Téléphone" required
              className="w-full p-3 border rounded-lg bg-gray-50"
              onChange={(e) => setClient({...client, tele: e.target.value})}
            />

            <div className="relative">
              <select
                value={client.villeSelect}
                onChange={(e) => setClient({...client, villeSelect: e.target.value})}
                className="w-full p-3 border rounded-lg bg-gray-50 appearance-none focus:border-black outline-none"
              >
                {Object.keys(shippingRates).map((city) => (
                  <option key={city} value={city}>
                    {city} (+{shippingRates[city]} DH)
                  </option>
                ))}
              </select>

              {/* custom arrow */}
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                ▼
              </div>
            </div>

            {client.villeSelect === 'Autre ville' && (
              <input
                type="text"
                placeholder="Votre ville"
                required
                className="w-full p-3 border rounded-lg bg-gray-50"
                onChange={(e) => setClient({...client, villeAutre: e.target.value})}
              />
            )}

            <textarea
              placeholder="Adresse Complète"
              required
              className="w-full p-3 border rounded-lg bg-gray-50"
              onChange={(e) => setClient({...client, adresse: e.target.value})}
            ></textarea>

            <button type="submit" className="w-full bg-[#25D366] text-white py-4 rounded-lg font-bold">
              CONFIRMER SUR WHATSAPP
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Cart;