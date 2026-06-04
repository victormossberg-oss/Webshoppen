// Importerar hooks från React
import { useEffect, useState } from "react";

// Importerar Link för navigation
import { Link } from "react-router-dom";

// Home-komponenten (startsidan)
export default function Home() {

  // State för utvalda produkter (vi visar bara några få här)
  const [featured, setFeatured] = useState([]);

  // State för loading — true medan vi väntar på API:et
  const [loading, setLoading] = useState(true);

  // Hämtar produkter när sidan laddas
  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        // limit=4 → vi hämtar bara 4 produkter
        const res = await fetch("https://dummyjson.com/products?limit=4");
        const data = await res.json();
        setFeatured(data.products);
      } catch (error) {
        console.log("Fel:", error);
      } finally {
        // Körs alltid — oavsett om det gick bra eller inte
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  return (
    <div>

      {/* HERO-SEKTION */}
      <section className="bg-black text-white text-center py-32 px-6">
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight mb-4">
          Välkommen till Webshoppen
        </h1>
        <p className="text-base mb-10 text-gray-300 uppercase tracking-widest">
          Allt skräp du behöver — direkt från dummyjson
        </p>
        <Link
          to="/products"
          className="inline-block bg-white text-black px-10 py-4 font-bold uppercase tracking-wide text-sm border border-white hover:bg-black hover:text-white transition"
        >
          Handla nu →
        </Link>
      </section>

      {/* UTVALDA PRODUKTER */}
      <section className="py-16 px-6">
        <h2 className="text-3xl font-black uppercase tracking-tight mb-10 text-center">
          Utvalda produkter
        </h2>

        {/* Visa "Laddar..."-text medan vi hämtar från API */}
        {loading ? (
          <p className="text-center mt-10 uppercase tracking-wide">Laddar produkter...</p>
        ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {featured.map(product => (
            <div
              key={product.id}
              className="bg-white border border-gray-200 hover:border-black transition flex flex-col"
            >
              {/* Bild med fast höjd så alla kort ser lika ut */}
              <img
                src={product.thumbnail}
                className="w-full h-48 object-contain bg-gray-100 p-4"
              />

              <div className="p-4 flex flex-col flex-1">

                {/* Titel — line-clamp-2 = max 2 rader, "..." om längre */}
                <h3 className="text-sm font-bold uppercase line-clamp-2 min-h-[3rem]">
                  {product.title}
                </h3>

                {/* Pris */}
                <p className="text-black font-bold mt-2">{product.price} kr</p>

                {/* mt-auto = trycker knappen längst ner i kortet */}
                <Link
                  to={`/product/${product.id}`}
                  className="block mt-auto pt-4"
                >
                  <span className="block bg-black text-white text-center py-3 font-bold uppercase tracking-wide text-sm border border-black hover:bg-white hover:text-black transition">
                    Visa produkt →
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
        )}

        {/* Länk till alla produkter */}
        <div className="text-center mt-12">
          <Link
            to="/products"
            className="inline-block text-black font-bold uppercase tracking-wide text-sm border-b-2 border-black hover:opacity-60 transition pb-1"
          >
            Se alla produkter →
          </Link>
        </div>
      </section>

    </div>
  );
}
