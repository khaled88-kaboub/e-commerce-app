import { BrowserRouter, Routes, Route } from "react-router";
import Shop from "./pages/Shop/Shop";
import Cart from "./pages/Cart/Cart";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
const App = () => {
  return (
    <div>
      <ToastContainer />

      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="register" element={<Register />} />
          <Route path="cart" element={<Cart />} />
          <Route path="login" element={<Login />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
