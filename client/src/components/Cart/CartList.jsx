import CartItem from "./CartItem";
function CartList({ cart }) {
  cart.map((item) => {
    console.log(item);
  });
  return (
    <div className="cart-list">
      {cart && cart.map((item, index) => <CartItem item={item} key={index} />)}
    </div>
  );
}
export default CartList;
