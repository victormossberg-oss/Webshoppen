// Importerar routing-funktioner från react-router-dom
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Importerar dina olika sidor (komponenter)
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductPage from "./pages/ProductPage";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

// Importerar CartProvider så hela appen kan komma åt kundvagnen
import { CartProvider } from "./context/CartProvider";

// Huvudkomponenten för hela appen
export default function App() {
  return (
    <CartProvider>
      <Router>

        {/* Navbar visas på ALLA sidor */}
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>

      </Router>
    </CartProvider>
  );
}

// Exporterar komponenten så den kan användas i main.jsx
//export default App;