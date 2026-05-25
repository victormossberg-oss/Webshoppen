import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Checkout() {

  // Hämtar kundvagn, totalsumma och funktion att tömma vagnen
  const { cart, total, clearCart } = useCart();

  // Håller koll på om ordern är lagd (visar bekräftelsesida då)
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Ett enda state-objekt för ALLA formulärfält
  // (smidigare än ett useState per fält)
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    postalCode: "",
    city: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  // Körs varje gång användaren skriver i ett fält
  // Uppdaterar rätt nyckel i form-objektet
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // Körs när formuläret skickas
  const handleSubmit = (e) => {
    e.preventDefault(); // Hindrar sidan från att laddas om
    setOrderPlaced(true);
    clearCart();
  };

  // ----- BEKRÄFTELSESIDA -----
  // Visas när ordern är lagd
  if (orderPlaced) {
    return (
      <div className="max-w-xl mx-auto text-center py-20 px-6">
        <div className="text-6xl mb-4">✅</div>
        <h1 className="text-4xl font-black uppercase tracking-tight mb-4">Tack för din beställning!</h1>
        <p className="text-gray-600 mb-8 uppercase tracking-wide text-sm">
          Vi har skickat en bekräftelse till {form.email}.
        </p>
        <Link
          to="/"
          className="inline-block bg-black text-white px-8 py-3 font-bold uppercase tracking-wide text-sm border border-black hover:bg-white hover:text-black transition"
        >
          Tillbaka till butiken →
        </Link>
      </div>
    );
  }

  // ----- TOM KUNDVAGN -----
  // Kan inte gå till kassan utan varor
  if (cart.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-xl text-gray-600 uppercase tracking-wide">Din kundvagn är tom</p>
        <Link
          to="/products"
          className="inline-block mt-6 bg-black text-white px-8 py-3 font-bold uppercase tracking-wide text-sm border border-black hover:bg-white hover:text-black transition"
        >
          Till produkterna →
        </Link>
      </div>
    );
  }

  // ----- KASSAN -----
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-black uppercase tracking-tight mb-8">Kassa</h1>

      {/* Layout: formulär till vänster, sammanfattning till höger */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* FORMULÄR (tar 2 av 3 kolumner) */}
        <form id="checkout-form" onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">

          {/* --- KONTAKTUPPGIFTER --- */}
          <section className="bg-white border border-gray-200 p-6">
            <h2 className="text-xl font-bold uppercase tracking-tight mb-4">Kontaktuppgifter</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field
                label="Förnamn och efternamn"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Victor Mossberg"
              />
              <Field
                label="E-post"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="victor@example.com"
              />
              <Field
                label="Telefon"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="070-123 45 67"
                className="sm:col-span-2"
              />
            </div>
          </section>

          {/* --- LEVERANSADRESS --- */}
          <section className="bg-white border border-gray-200 p-6">
            <h2 className="text-xl font-bold uppercase tracking-tight mb-4">Leveransadress</h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Field
                label="Gatuadress"
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Storgatan 1"
                className="sm:col-span-3"
              />
              <Field
                label="Postnummer"
                name="postalCode"
                value={form.postalCode}
                onChange={handleChange}
                placeholder="123 45"
              />
              <Field
                label="Ort"
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="Stockholm"
                className="sm:col-span-2"
              />
            </div>
          </section>

          {/* --- BETALNING --- */}
          <section className="bg-white border border-gray-200 p-6">
            <h2 className="text-xl font-bold uppercase tracking-tight mb-4">Betalning</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field
                label="Kortnummer"
                name="cardNumber"
                value={form.cardNumber}
                onChange={handleChange}
                placeholder="1234 5678 9012 3456"
                className="sm:col-span-2"
              />
              <Field
                label="Giltigt t.o.m."
                name="expiry"
                value={form.expiry}
                onChange={handleChange}
                placeholder="MM/ÅÅ"
              />
              <Field
                label="CVV"
                name="cvv"
                value={form.cvv}
                onChange={handleChange}
                placeholder="123"
              />
            </div>
          </section>

          {/* Skicka-knapp (syns bara på mobil, desktop har den i summary) */}
          <button
            type="submit"
            className="w-full bg-black text-white py-4 font-bold uppercase tracking-wide text-sm border border-black hover:bg-white hover:text-black transition cursor-pointer lg:hidden"
          >
            Slutför köp ({total.toFixed(2)} kr) →
          </button>
        </form>

        {/* ORDERSAMMANFATTNING (höger sida) */}
        <aside className="bg-white border border-gray-200 p-6 h-fit lg:sticky lg:top-6">
          <h2 className="text-xl font-bold uppercase tracking-tight mb-4">Din order</h2>

          {/* Lista produkter */}
          <div className="space-y-3 mb-4">
            {cart.map(item => (
              <div key={item.id} className="flex gap-3 items-center">
                <img
                  src={item.thumbnail}
                  className="w-12 h-12 object-contain bg-gray-100"
                />
                <div className="flex-1 text-sm">
                  <p className="font-bold uppercase text-xs line-clamp-1">{item.title}</p>
                  <p className="text-gray-500">{item.quantity} × {item.price} kr</p>
                </div>
                <p className="text-sm font-bold">
                  {(item.price * item.quantity).toFixed(2)} kr
                </p>
              </div>
            ))}
          </div>

          {/* Summa */}
          <div className="border-t border-black pt-4 space-y-2">
            <div className="flex justify-between text-gray-600 uppercase tracking-wide text-sm">
              <span>Frakt</span>
              <span>Fri</span>
            </div>
            <div className="flex justify-between text-lg font-black uppercase tracking-tight">
              <span>Totalt</span>
              <span>{total.toFixed(2)} kr</span>
            </div>
          </div>

          {/* Skicka-knapp (visas bara på desktop) */}
          {/* form="checkout-form" gör att knappen triggar formuläret ovan */}
          {/* trots att den ligger utanför <form>-taggen */}
          <button
            type="submit"
            form="checkout-form"
            className="w-full mt-6 bg-black text-white py-4 font-bold uppercase tracking-wide text-sm border border-black hover:bg-white hover:text-black transition cursor-pointer hidden lg:block"
          >
            Slutför köp →
          </button>
        </aside>

      </div>
    </div>
  );
}

// Liten "hjälpkomponent" för ett formulärfält
// Sparar oss från att kopiera samma JSX 9 gånger
function Field({ label, name, type = "text", value, onChange, placeholder, className = "" }) {
  return (
    <div className={className}>
      <label className="block text-xs font-bold uppercase tracking-wide text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        className="w-full border border-black px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
      />
    </div>
  );
}
