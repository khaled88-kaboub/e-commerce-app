import ProductList from "../../components/Product/ProductList";
import { useState, useEffect, useRef } from "react";
import "./shop.css";
import { toast } from "react-toastify";
const Shop = () => {
  const [localdata, setLocaldata] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);

  const getData = async () => {
    try {
      //Get products
      const response = await fetch("/api/v1/products", {
        method: "GET",
      });
      const data = await response.json();
      setLocaldata(() => data);
      //Get categories
      const catResponse = await fetch("/api/v1/products/categories", {
        method: "GET",
      });
      const catData = await catResponse.json();
      console.log(catData);
      setCategories(() => catData.categories);
    } catch (error) {
      toast(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return <div className="center">Loading products...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }
  return (
    <div className="shop-container">
      <div className="shop-header">
        <h1 className="shop-title">🛍️ ShopEasy</h1>
        <p className="shop-subtitle">
          Discover amazing products at great prices
        </p>
      </div>
      <div className="filters">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="searchInput"
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="categorySelect"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      {localdata && (
        <ProductList products={localdata.products} page={localdata.page} />
      )}
    </div>
  );
};

export default Shop;
