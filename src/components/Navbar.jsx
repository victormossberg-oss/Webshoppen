import { Link } from "react-router-dom";

// Hämtar kundvagnen så vi kan visa antal varor
import { useCart } from "../context/CartContext";

export default function Navbar() {

  // Plockar ut totala antalet varor i kundvagnen
  const { itemCount } = useCart();

  return (
    <nav className="bg-blue-900 text-white p-4 flex justify-between items-center">

      {/* Logo / Titel */}
      <h1 className="text-xl font-bold">Webshoppen</h1>

      {/* Länkar */}
      <div className="flex gap-10 items-center">

        <Link
          to="/"
          className="hover:text-gray-300 transition"
        >
          Hem
        </Link>

        <Link
          to="/products"
          className="hover:text-gray-300 transition"
        >
          Produkter
        </Link>

        {/* Kundvagn med liten siffra */}
        <Link
          to="/cart"
          className="hover:text-gray-300 transition relative"
        >
          Kundvagn

          {/* Visar siffran bara om det finns något i vagnen */}
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </Link>

      </div>
    </nav>
  );
}
