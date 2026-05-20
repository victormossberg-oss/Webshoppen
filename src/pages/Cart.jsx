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
        <p className="text-xl mt-4 text-gray-600">Din kundvagn är tom</p>
        <Link
          to="/"
          className="inline-block mt-6 bg-blue-900 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition"
        >
          Tillbaka till butiken
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">Din kundvagn</h1>

      {/* Lista över alla produkter i kundvagnen */}
      <div className="space-y-4">
        {cart.map(item => (
          <div
            key={item.id}
            className="flex items-center bg-white rounded-2xl shadow p-4 gap-4"
          >

            {/* Bild */}
            <img
              src={item.thumbnail}
              className="w-20 h-20 object-contain bg-gray-100 rounded-lg"
            />

            {/* Titel + pris */}
            <div className="flex-1">
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-gray-600">{item.price} kr / st</p>
            </div>

            {/* Antal-kontroller */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => decrease(item.id)}
                className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
              >
                −
              </button>

              <span className="w-6 text-center">{item.quantity}</span>

              <button
                onClick={() => increase(item.id)}
                className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
              >
                +
              </button>
            </div>

            {/* Radens totala pris — toFixed(2) ger alltid 2 decimaler */}
            <p className="w-20 text-right font-semibold">
              {(item.price * item.quantity).toFixed(2)} kr
            </p>

            {/* Ta bort-knapp */}
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-600 hover:text-red-800"
            >
              ✕
            </button>

          </div>
        ))}
      </div>

      {/* Sammanfattning */}
      <div className="mt-6 border-t pt-4 flex justify-between items-center">
        <button
          onClick={clearCart}
          className="text-gray-500 hover:text-red-600"
        >
          Töm kundvagn
        </button>

        <div className="text-right">
          <p className="text-gray-600">Totalt</p>
          <p className="text-2xl font-bold">{total.toFixed(2)} kr</p>
        </div>
      </div>

      {/* Till kassan */}
      <Link
        to="/checkout"
        className="block text-center mt-6 bg-blue-900 text-white py-3 rounded-lg hover:bg-blue-800 transition"
      >
        Till kassan
      </Link>

    </div>
  );
}
