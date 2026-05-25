// useParams används för att läsa URL (id)
import { useParams } from "react-router-dom";

// Hooks
import { useEffect, useState } from "react";

// Hämtar funktionen för att lägga i kundvagnen
import { useCart } from "../context/CartContext";

export default function ProductPage() {

  // Hämtar id från URL (t.ex. /product/5 → id = 5)
  const { id } = useParams();

  // State för en produkt
  const [product, setProduct] = useState(null);

  // State för hur många användaren vill lägga till (default 1)
  const [quantity, setQuantity] = useState(1);

  // Hämtar addToCart från CartContext
  const { addToCart } = useCart();

  // Körs när sidan laddas eller id ändras
  useEffect(() => {

    const fetchProduct = async () => {
      try {
        // Hämtar specifik produkt
        const res = await fetch(`https://dummyjson.com/products/${id}`);

        // Gör om till JSON
        const data = await res.json();

        // Sparar i state
        setProduct(data);

      } catch (err) {
        console.log(err);
      }
    };

    fetchProduct();

  }, [id]); // körs igen om id ändras

  // Om produkten inte laddats än
  if (!product) return <p className="text-center mt-10 uppercase tracking-wide">Laddar produkt...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">

      {/* Bild */}
      <img
        src={product.thumbnail}
        className="w-full h-96 object-contain bg-gray-100 p-8"
      />

      {/* Produktens titel */}
      <h1 className="text-4xl font-black uppercase tracking-tight mt-8">{product.title}</h1>

      {/* Pris */}
      <p className="text-2xl text-black font-bold mt-2">
        {product.price} kr
      </p>

      {/* Beskrivning */}
      <p className="text-gray-700 mt-6 leading-relaxed">{product.description}</p>

      {/* Antal + Lägg i kundvagn-knapp */}
      <div className="flex items-center gap-4 mt-8">

        {/* Antal-väljare */}
        <div className="flex items-center border border-black">

          {/* Minus-knapp — inaktiverad om quantity är 1 */}
          <button
            onClick={() => setQuantity(q => Math.max(1, q - 1))}
            disabled={quantity === 1}
            className="px-4 py-3 font-bold hover:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed"
          >
            −
          </button>

          {/* Visar aktuellt antal */}
          <span className="px-4 py-3 min-w-[3rem] text-center font-bold">
            {quantity}
          </span>

          {/* Plus-knapp */}
          <button
            onClick={() => setQuantity(q => q + 1)}
            className="px-4 py-3 font-bold hover:bg-gray-100"
          >
            +
          </button>
        </div>

        {/* Lägg i kundvagn-knapp */}
        <button
          onClick={() => {
            addToCart(product, quantity);
            setQuantity(1); // Återställ till 1 efter tillagd
          }}
          className="flex-1 bg-black text-white px-6 py-3 font-bold uppercase tracking-wide text-sm border border-black hover:bg-white hover:text-black transition"
        >
          Lägg i kundvagn →
        </button>
      </div>

    </div>
  );
}
