import CartList from "../../components/Cart/CartList";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "./cart.css";
function Cart() {
  const token = localStorage.getItem("user_token");
  const [cart, setCart] = useState();
  const getCart = async () => {
    try {
      console.log("fetching data");
      const response = await fetch("/api/v1/cart", {
        method: "GET",
        headers: {
          Authorization: `Bearer : ${token}`,
        },
      });
      const data = await response.json();
      console.log(data);
      setCart(data.cart);
      toast.done(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    getCart();
  }, []);

  return (
    <>
      {cart && (
        <div className="cart-page">
          <h1 className="cart-title">Your cart</h1>
          <div className="cart-content">
            <CartList cart={cart.items} />
          </div>
        </div>
      )}
    </>
  );
}

export default Cart;
