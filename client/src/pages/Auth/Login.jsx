import { useState } from "react";
import { toast } from "react-toastify";
import "./auth.css";
function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await fetch("https://e-commerce-app-xrum.onrender.com/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data);
      localStorage.setItem("user_token", data.token);
      toast.success(`User ${data.user.name} is logged in`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="auth-container">
      <form action="" className="auth-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your mail"
          />
        </div>
        <div className="input-group">
          <label htmlFor="">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="********"
          />
        </div>
        <input className="submit-btn" type="submit" value="SIGN IN" />
        <div>
          <p>
            Are you new?
            <a className="link" href="/register">
              create an Account
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
