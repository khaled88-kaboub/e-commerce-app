// src/components/layout/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import { clearCart } from "../../store/cartSlice";
import "./navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get data from Redux store
  const { user } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart.items);

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="logo">
          🛍️ ShopEasy
        </Link>

        <ul className="navLinks">
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>

        <div className="actions">
          <Link to="/cart" className="cartIcon">
            🛒
            {totalItems > 0 && <span className="cartBadge">{totalItems}</span>}
          </Link>

          {user ? (
            <button onClick={handleLogout} className="authBtn">
              Logout
            </button>
          ) : (
            <Link to="/login" className="authBtn">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
