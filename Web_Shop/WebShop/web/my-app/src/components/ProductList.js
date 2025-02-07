import { useEffect, useState } from "react";
import { getAllProducts } from '../api/ProductApi'; // Імпортуємо API виклики

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getAllProducts();
        setProducts(productsData);
      } catch (error) {
        console.error('Помилка при завантаженні продуктів:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Завантаження...</div>;
  }

  return (
    <div>
      <h1>Список продуктів</h1>
      <div className="product-container">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src="https://via.placeholder.com/200" alt={product.title} />
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p className="price">{product.price} грн</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
