import { useEffect, useState } from "react";

function CartItem({ item }) {
  const [product, setProduct] = useState("");
  const [loading, setLoading] = useState(true);
  const getItem = async () => {
    console.log(item);
    const response = await fetch(`api/v1/products/${item.productId}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer : token",
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setProduct(() => data.product);

    setLoading(false);
  };
  useEffect(() => {
    getItem();
  }, [loading]);
  const handleRemove = () => {};
  return (
    <>
      {product && (
        <div className="cart-item">
          <img src={product.image} alt="" className="cart-item-image" />
          <span className="cart-item-name">{product.name}</span>
          <span className="cart-item-price">{product.price}</span>
          <span className="cart-item-quantity">{item.quantity}</span>
          <input
            className="remove-btn"
            type="button"
            value="X"
            onClick={handleRemove}
          />
        </div>
      )}
    </>
  );
}

export default CartItem;
