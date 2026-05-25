// Importerar routing-funktioner från react-router-dom
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Importerar dina olika sidor (komponenter)
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductPage from "./pages/ProductPage";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Footer from "./components/Footer";

// Importerar CartProvider så hela appen kan komma åt kundvagnen
import { CartProvider } from "./components/CartProvider";

// Huvudkomponenten för hela appen
export default function App() {
  return (
    <CartProvider>
      <Router>

        {/* min-h-screen + flex-col gör att footern alltid hamnar längst ner
            även när sidan har lite innehåll (t.ex. tom kundvagn) */}
        <div className="min-h-screen flex flex-col bg-white">

          {/* Navbar visas på ALLA sidor */}
          <Navbar />

          {/* flex-1 = main expanderar och fyller ut tomrum */}
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </main>

          <Footer />

        </div>

      </Router>
    </CartProvider>
  );
}

