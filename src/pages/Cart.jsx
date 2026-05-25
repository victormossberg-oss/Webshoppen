// Hämtar allt vi behöver från CartContext
import { useCart } from "../context/CartContext";

// Länk till checkout
import { Link } from "react-router-dom";

export default function Cart() {

  // Plockar ut det vi behöver från Context
  const { cart, increase, decrease, removeFromCart, clearCart, total } = useCart();

  // Om vagnen är tom → visa meddelande
  if (cart.length === 0) {
    return (
      <div className="text-center py-20">
        <h1 className="text-6xl">🛒</h1>
        <p className="text-xl mt-4 text-gray-600 uppercase tracking-wide">Din kundvagn är tom</p>
        <Link
          to="/"
          className="inline-block mt-8 bg-black text-white px-8 py-3 font-bold uppercase tracking-wide text-sm border border-black hover:bg-white hover:text-black transition"
        >
          Tillbaka till butiken →
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">

      <h1 className="text-4xl font-black uppercase tracking-tight mb-8">Din kundvagn</h1>

      {/* Lista över alla produkter i kundvagnen */}
      <div className="space-y-4">
        {cart.map(item => (
          <div
            key={item.id}
            className="flex items-center bg-white border border-gray-200 p-4 gap-4"
          >

            {/* Bild */}
            <img
              src={item.thumbnail}
              className="w-20 h-20 object-contain bg-gray-100 p-2"
            />

            {/* Titel + pris */}
            <div className="flex-1">
              <h3 className="font-bold uppercase text-sm">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.price} kr / st</p>
            </div>

            {/* Antal-kontroller */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => decrease(item.id)}
                className="border border-gray-300 px-3 py-1 font-bold hover:bg-black hover:text-white hover:border-black transition"
              >
                −
              </button>

              <span className="w-6 text-center font-bold">{item.quantity}</span>

              <button
                onClick={() => increase(item.id)}
                className="border border-gray-300 px-3 py-1 font-bold hover:bg-black hover:text-white hover:border-black transition"
              >
                +
              </button>
            </div>

            {/* Radens totala pris — toFixed(2) ger alltid 2 decimaler */}
            <p className="w-20 text-right font-bold">
              {(item.price * item.quantity).toFixed(2)} kr
            </p>

            {/* Ta bort-knapp */}
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-gray-400 hover:text-black"
            >
              ✕
            </button>

          </div>
        ))}
      </div>

      {/* Sammanfattning */}
      <div className="mt-8 border-t border-black pt-6 flex justify-between items-center">
        <button
          onClick={clearCart}
          className="text-gray-500 hover:text-black uppercase tracking-wide text-sm font-bold underline"
        >
          Töm kundvagn
        </button>

        <div className="text-right">
          <p className="text-gray-600 uppercase tracking-wide text-xs">Totalt</p>
          <p className="text-3xl font-black">{total.toFixed(2)} kr</p>
        </div>
      </div>

      {/* Till kassan */}
      <Link
        to="/checkout"
        className="block text-center mt-8 bg-black text-white py-4 font-bold uppercase tracking-wide border border-black hover:bg-white hover:text-black transition"
      >
        Till kassan →
      </Link>

    </div>
  );
}
