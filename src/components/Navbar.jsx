import { Link } from "react-router-dom";

// Hämtar kundvagnen så vi kan visa antal varor
import { useCart } from "../context/CartContext";

export default function Navbar() {

  // Plockar ut totala antalet varor i kundvagnen
  const { itemCount } = useCart();

  return (
    <nav className="bg-white text-black px-6 py-4 flex justify-between items-center border-b border-black">

      {/* Logo / Titel — klickbar för att gå till startsidan */}
      <Link to="/" className="text-2xl font-black uppercase tracking-tight">
        Webshoppen
      </Link>

      {/* Länkar */}
      <div className="flex gap-10 items-center">

        <Link
          to="/"
          className="font-bold uppercase text-sm tracking-wide hover:underline"
        >
          Hem
        </Link>

        <Link
          to="/products"
          className="font-bold uppercase text-sm tracking-wide hover:underline"
        >
          Produkter
        </Link>

        {/* Kundvagn med liten siffra */}
        <Link
          to="/cart"
          className="font-bold uppercase text-sm tracking-wide hover:underline relative"
        >
          Kundvagn

          {/* Visar siffran bara om det finns något i vagnen */}
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-4 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </Link>

      </div>
    </nav>
  );
}
