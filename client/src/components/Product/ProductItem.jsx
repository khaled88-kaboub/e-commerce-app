import { toast } from "react-toastify";
const ProductItem = ({ product }) => {
  const token = localStorage.getItem("user_token");
  const addToCart = async () => {
    const response = await fetch("/api/v1/cart/add", {
      method: "POST",
      headers: {
        Authorization: `Bearer : ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId: product._id }),
    });
    const data = await response.json();
    toast.done(data.message);
  };
  return (
    <div className="product-item">
      <div className="product-head">
        <img className="product-image" src={product.image} alt="" />
      </div>
      <div className="product-body">
        <div className="product-info">
          <span>{product.name}</span>
          <span>{product.price} $</span>
        </div>
        <span className="product-description">{product.description}</span>
        <div className="product-btn-container">
          <input
            type="button"
            value="Add to Cart"
            className="product-add-btn"
            onClick={addToCart}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
