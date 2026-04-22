import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products");
        const data = await res.json();
        setProducts(data.products);
      } catch (error) {
        console.log("Fel:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Laddar produkter...</p>;

  return (
    <div>
      <h1>Produkter</h1>

      {products.map(product => (
        <div key={product.id}>
          <Link to={`/product/${product.id}`}>
            <h3>{product.title}</h3>
          </Link>

          <img src={product.thumbnail} width="100" />
          <p>{product.price} kr</p>
        </div>
      ))}
    </div>
  );
}