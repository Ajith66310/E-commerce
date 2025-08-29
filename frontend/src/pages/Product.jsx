import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_URL}/fetchproduct/${id}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }

        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  return (
    <div>
      <h1>Product Page</h1>
      {loading ? (
        <p>Loading...</p>
      ) : product ? (
        <pre>{JSON.stringify(product, null, 2)}</pre>
      ) : (
        <p>Product not found</p>
      )}
    </div>
  );
};

export default Product;
