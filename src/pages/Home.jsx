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
      <section className="bg-blue-900 text-white text-center py-20 px-6">
        <h1 className="text-5xl font-bold mb-4">Välkommen till Webshoppen</h1>
        <p className="text-xl mb-8 text-blue-100">
          Allt du behöver — på ett ställe
        </p>
        <Link
          to="/products"
          className="inline-block bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          Handla nu
        </Link>
      </section>

      {/* UTVALDA PRODUKTER */}
      <section className="p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Utvalda produkter</h2>

        {/* Visa "Laddar..."-text medan vi hämtar från API */}
        {loading ? (
          <p className="text-xl font-bold text-center mt-10">Laddar produkter...</p>
        ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {featured.map(product => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-md p-4 hover:shadow-xl transition flex flex-col"
            >
              {/* Bild med fast höjd så alla kort ser lika ut */}
              <img
                src={product.thumbnail}
                className="w-full h-40 object-contain bg-gray-100 rounded-lg"
              />

              {/* Titel — line-clamp-2 = max 2 rader, "..." om längre */}
              <h3 className="text-lg font-semibold mt-3 line-clamp-2 min-h-[3.5rem]">
                {product.title}
              </h3>

              {/* Pris */}
              <p className="text-gray-600">{product.price} kr</p>

              {/* mt-auto = trycker knappen längst ner i kortet */}
              <Link
                to={`/product/${product.id}`}
                className="block mt-auto pt-3"
              >
                <span className="block bg-gray-800 text-white text-center py-2 rounded-lg hover:bg-blue-900">
                  Visa produkt
                </span>
              </Link>
            </div>
          ))}
        </div>
        )}

        {/* Länk till alla produkter */}
        <div className="text-center mt-8">
          <Link
            to="/products"
            className="text-blue-900 font-semibold hover:underline"
          >
            Se alla produkter →
          </Link>
        </div>
      </section>

    </div>
  );
}
