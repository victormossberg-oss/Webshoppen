import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <p>Laddar...</p>;

  return (
    <div>
      <h1>{product.title}</h1>
      <img src={product.thumbnail} />
      <p>{product.description}</p>
      <p>{product.price} kr</p>
    </div>
  );
}