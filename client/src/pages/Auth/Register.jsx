import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./auth.css";
function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password.length < 6) {
      console.log("Password too small");
    }
    if (!formData.name || !formData.email || !formData.password) {
      console.log("Please fill all the informations");
    }
    try {
      console.log(formData);
      const response = await fetch("/api/v1/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      localStorage.setItem("user_token", data.token);
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={(e) => handleSubmit(e)}>
        <div className="input-group">
          <label htmlFor="">User name</label>
          <input
            type="text"
            name="name"
            placeholder="user name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="input-group">
          <label htmlFor="">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your mail"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="input-group">
          <label htmlFor="">Password</label>
          <input
            type="password"
            name="password"
            placeholder="********"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <input type="submit" className="submit-btn" value="SIGN IN" />
      </form>
    </div>
  );
}
export default Register;
