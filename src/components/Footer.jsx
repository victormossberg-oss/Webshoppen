import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-black text-white mt-16">

      {/* HUVUDDELEN — tre kolumner */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Kolumn 1: Om butiken */}
        <div>
          <h3 className="text-xl font-black uppercase tracking-tight mb-4">Webshoppen</h3>
          <p className="text-gray-400 text-sm">
            Din lilla testbutik byggd med React, Tailwind och DummyJSON.
          </p>
        </div>

        {/* Kolumn 2: Snabblänkar */}
        <div>
          <h3 className="font-bold uppercase tracking-wide text-sm mb-4">Snabblänkar</h3>
          <ul className="space-y-2 text-gray-400 text-sm uppercase tracking-wide">
            <li><Link to="/" className="hover:text-white">Hem</Link></li>
            <li><Link to="/products" className="hover:text-white">Produkter</Link></li>
            <li><Link to="/cart" className="hover:text-white">Kundvagn</Link></li>
          </ul>
        </div>

        {/* Kolumn 3: Kontakt */}
        <div>
          <h3 className="font-bold uppercase tracking-wide text-sm mb-4">Kontakt</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>kontakt@webshoppen.se</li>
            <li>070-123 45 67</li>
            <li>Stockholm, Sverige</li>
          </ul>
        </div>

      </div>

      {/* BOTTOM ROW — copyright */}
      <div className="border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-4 text-center text-xs text-gray-500 uppercase tracking-wide">
          © {new Date().getFullYear()} Webshoppen. Alla rättigheter förbehållna.
        </div>
      </div>

    </footer>
  );
}
