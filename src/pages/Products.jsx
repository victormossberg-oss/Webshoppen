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

  // State för vilken sida användaren är på
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 20;

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
        // try/catch
        // Fångar nätverksfel så appen inte kraschar
        console.log("Fel vid hämtning:", error);

      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [debouncedSearch]);

  // Räkna ut totalt antal sidor och vilka produkter som ska visas just nu
  const totalPages = Math.ceil(products.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const visibleProducts = products.slice(startIndex, startIndex + productsPerPage);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-black uppercase tracking-tight mb-8 text-center">Alla produkter</h1>

      {/* SÖKFÄLT */}
      <div className="max-w-md mx-auto mb-12">
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            // Hoppa tillbaka till sida 1 när användaren söker
            setCurrentPage(1);
          }}
          placeholder="SÖK PRODUKTER..."
          className="w-full border border-black px-4 py-3 uppercase tracking-wide text-sm focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      {/* LADDTEXT eller PRODUKTER */}
      {loading ? (
        <p className="text-center mt-10 uppercase tracking-wide">Laddar produkter...</p>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-600 mt-10 uppercase tracking-wide">
          Inga produkter matchade din sökning.
        </p>
      ) : (
        <>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {visibleProducts.map(product => (
            <div
              key={product.id}
              className="bg-white border border-gray-200 hover:border-black transition flex flex-col"
            >

              {/* Bild */}
              <img
                src={product.thumbnail}
                className="w-full h-48 object-contain bg-gray-100 p-4"
              />

              <div className="p-4 flex flex-col flex-1">

                {/* Titel — line-clamp-2 = max 2 rader */}
                <h3 className="text-sm font-bold uppercase line-clamp-2 min-h-[3rem]">
                  {product.title}
                </h3>

                {/* Pris */}
                <p className="text-black font-bold mt-2">{product.price} kr</p>

                {/* mt-auto trycker ner knappen till botten av kortet */}
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

        {/* PAGINERING — visa bara om det finns fler än en sida */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-12">
            <button
              onClick={() => setCurrentPage(p => p - 1)}
              disabled={currentPage === 1}
              className="px-6 py-3 bg-black text-white font-bold uppercase tracking-wide text-sm border border-black disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white hover:text-black transition"
            >
              ← Föregående
            </button>

            <span className="uppercase tracking-wide text-sm font-bold">
              Sida {currentPage} av {totalPages}
            </span>

            <button
              onClick={() => setCurrentPage(p => p + 1)}
              disabled={currentPage === totalPages}
              className="px-6 py-3 bg-black text-white font-bold uppercase tracking-wide text-sm border border-black disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white hover:text-black transition"
            >
              Nästa →
            </button>
          </div>
        )}
        </>
      )}
    </div>
  );
}
