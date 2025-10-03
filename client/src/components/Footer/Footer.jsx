// src/components/layout/Footer.jsx
import { Link } from "react-router-dom";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="section">
          <h3 className="title">ShopEasy</h3>
          <p className="description">
            Your one-stop shop for quality products at great prices.
          </p>
        </div>

        <div className="section">
          <h4 className="subtitle">Quick Links</h4>
          <ul className="linkList">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/cart">Cart</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ul>
        </div>

        <div className="section">
          <h4 className="subtitle">Legal</h4>
          <ul className="linkList">
            <li>
              <Link to="/privacy">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/terms">Terms of Service</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="bottom">
        <p>&copy; {new Date().getFullYear()} ShopEasy. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
