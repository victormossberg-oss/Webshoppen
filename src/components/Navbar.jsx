import { Link } from "react-router-dom";

// useState för att hålla koll på om mobilmenyn är öppen eller stängd
import { useState } from "react";

// Hämtar kundvagnen så vi kan visa antal varor
import { useCart } from "../context/CartContext";

export default function Navbar() {

  // Plockar ut totala antalet varor i kundvagnen
  const { itemCount } = useCart();

  // true = mobilmenyn är öppen, false = stängd. Börjar stängd.
  const [menuOpen, setMenuOpen] = useState(false);

  // Liten hjälpfunktion: stänger menyn.
  // Anropas när man klickat på en länk så menyn inte blir kvar öppen.
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="bg-white text-black px-6 py-4 border-b border-black">

      {/* ÖVERSTA RADEN: logo till vänster, länkar/hamburgare till höger */}
      <div className="flex justify-between items-center">

        {/* Logo / Titel — klickar man här går man till startsidan */}
        <Link
          to="/"
          onClick={closeMenu}
          className="text-2xl font-black uppercase tracking-tight"
        >
          Webshoppen
        </Link>

        {/* DESKTOP-LÄNKAR
            hidden = göms på mobil
            md:flex = visas (som flex) först från md-breakpointen (~768px) */}
        <div className="hidden md:flex gap-10 items-center">
          <Link to="/" className="font-bold uppercase text-sm tracking-wide hover:underline">
            Hem
          </Link>
          <Link to="/products" className="font-bold uppercase text-sm tracking-wide hover:underline">
            Produkter
          </Link>
          <Link to="/cart" className="font-bold uppercase text-sm tracking-wide hover:underline relative">
            Kundvagn
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-4 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>
        </div>

        {/* HAMBURGERKNAPP
            md:hidden = tvärtom mot ovan — visas bara på mobil, göms på desktop */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden relative"
          aria-label="Öppna meny"
        >
          {/* Byt ikon beroende på om menyn är öppen (✕) eller stängd (☰) */}
          <span className="text-3xl">{menuOpen ? "✕" : "☰"}</span>

          {/* Liten siffra på hamburgaren så man ser antal varor även med stängd meny */}
          {itemCount > 0 && !menuOpen && (
            <span className="absolute -top-1 -right-3 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </button>
      </div>

      {/* MOBILMENY — visas bara när menuOpen är true OCH på mobil (md:hidden) */}
      {menuOpen && (
        <div className="md:hidden flex flex-col gap-4 mt-4 pt-4 border-t border-black">
          <Link
            to="/"
            onClick={closeMenu}
            className="font-bold uppercase text-sm tracking-wide hover:underline"
          >
            Hem
          </Link>
          <Link
            to="/products"
            onClick={closeMenu}
            className="font-bold uppercase text-sm tracking-wide hover:underline"
          >
            Produkter
          </Link>
          <Link
            to="/cart"
            onClick={closeMenu}
            className="font-bold uppercase text-sm tracking-wide hover:underline"
          >
            Kundvagn {itemCount > 0 && `(${itemCount})`}
          </Link>
        </div>
      )}
    </nav>
  );
}
