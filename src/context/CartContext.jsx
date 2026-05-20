// Filen innehåller bara själva "lådan" och en hook för att komma åt den
// Provider-komponenten ligger separat i CartProvider.jsx
// (delningen krävs av Fast Refresh — komponenter och vanliga funktioner
// får inte ligga i samma fil)

import { createContext, useContext } from "react";

// Skapar själva "lådan" (Context) — exporteras så CartProvider kan använda den
export const CartContext = createContext();

// "Genväg" så andra komponenter slipper importera useContext varje gång
export function useCart() {
  return useContext(CartContext);
}
