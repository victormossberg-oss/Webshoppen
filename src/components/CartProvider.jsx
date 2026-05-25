// Innehåller själva komponenten som håller koll på kundvagnen
// (context-objektet och useCart-hooken ligger i CartContext.jsx)

import { useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";

// CartProvider = komponenten som håller i kundvagnen
// Allt som ligger inuti den kan komma åt kundvagnen via useCart()
export function CartProvider({ children }) {

  // State för kundvagnens innehåll
  // Läser från localStorage först → om inget finns blir det en tom array
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  // Sparar kundvagnen i localStorage varje gång den ändras
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Lägger till en produkt i kundvagnen
  // qty = 1 betyder "om inget antal anges → använd 1"
  const addToCart = (product, qty = 1) => {
    setCart(prev => {

      // Kollar om produkten redan finns i vagnen
      const existing = prev.find(item => item.id === product.id);

      if (existing) {
        // Finns redan → öka antalet med qty
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }

      // Finns inte → lägg till med valt antal
      return [...prev, { ...product, quantity: qty }];
    });
  };

  // Tar bort en produkt helt
  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  // Ökar antalet med 1
  const increase = (id) => {
    setCart(prev => prev.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  // Minskar antalet med 1 (tar bort om det blir 0)
  const decrease = (id) => {
    setCart(prev =>
      prev
        .map(item =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  // Tömmer hela kundvagnen
  const clearCart = () => setCart([]);

  // Totalpris (räknar ihop pris × antal för alla varor)
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Totalt antal varor (används till siffran i navbaren)
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Allt som ska vara tillgängligt för resten av appen
  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, increase, decrease, clearCart, total, itemCount }}
    >
      {children}
    </CartContext.Provider>
  );
}
