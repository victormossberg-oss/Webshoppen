// Importerar hooks från React
import { useEffect, useState } from "react";

// Importerar Link för navigation
import { Link } from "react-router-dom";

// Importerar vår egen debounce-hook
import { useDebounce } from "../hooks/useDebounce";

// Products-sidan (visar alla produkter + sökfunktion)
export default function Products() {

  // State för produkter (tom array från början)
  const [products, setProducts] = useState([]);

  // State för loading (visar laddtext)
  const [loading, setLoading] = useState(true);

  // State för det användaren skriver i sökfältet
  const [search, setSearch] = useState("");

  // Den "debouncade" versionen av search
  // → uppdateras först 300ms efter att användaren slutat skriva
  const debouncedSearch = useDebounce(search, 300);

  // Körs när debouncedSearch ändras (alltså efter att användaren pausat)
  useEffect(() => {

    const fetchProducts = async () => {
      setLoading(true);

      try {
        // limit=0 → DummyJSON returnerar ALLA produkter (inte bara 30)
        // Om sökfältet har text → använd sökendpoint, annars hämta alla
        const url = debouncedSearch
          ? `https://dummyjson.com/products/search?q=${debouncedSearch}&limit=0`
          : "https://dummyjson.com/products?limit=0";

        const res = await fetch(url);
        const data = await res.json();
        setProducts(data.products);

      } catch (error) {
        // try/catch krävs enligt projektets tekniska krav
        // Fångar nätverksfel så appen inte kraschar
        console.log("Fel vid hämtning:", error);

      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [debouncedSearch]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Alla produkter</h1>

      {/* SÖKFÄLT */}
      <div className="max-w-md mx-auto mb-8">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Sök produkter..."
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-900"
        />
      </div>

      {/* LADDTEXT eller PRODUKTER */}
      {loading ? (
        <p className="text-xl font-bold text-center mt-10">Laddar produkter...</p>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-600 mt-10">
          Inga produkter matchade din sökning.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-md p-4 hover:shadow-xl transition flex flex-col"
            >

              {/* Bild */}
              <img
                src={product.thumbnail}
                className="w-full h-40 object-contain bg-gray-100 rounded-lg"
              />

              {/* Titel — line-clamp-2 = max 2 rader */}
              <h3 className="text-lg font-semibold mt-3 line-clamp-2 min-h-[3.5rem]">
                {product.title}
              </h3>

              {/* Pris */}
              <p className="text-gray-600">{product.price} kr</p>

              {/* mt-auto trycker ner knappen till botten av kortet */}
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
    </div>
  );
}
