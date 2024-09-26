// LOGIN COMPONENT

import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleFocus = (e) => {
    e.target.previousElementSibling.classList.add("active", "highlight");
  };

  const showTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const noAccount = () => [
    navigate('/signup')
  ]

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/auth/login",
        formData
      );

      if (response.status === 201) {
        const token = response.data.token;
        const userType = response.data.userType;

        localStorage.setItem("token", token);
        localStorage.setItem("userType", userType);
        toast.success("User Successfully Login", response.data);
       
        navigate("/home");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      toast.error(errorMessage);
    }
  };
  return (
    <div className="container">
      <Toaster />
      <div className="wrapper">
        <div>
          <h1>Login</h1>
        </div>

        <div className="form-containers">
          <div className="signup-content">
            <form onSubmit={handleSubmit}>
              <div className="top-signup">
                <div className="field-signup">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    onFocus={handleFocus}
                    value={formData.email}
                    required
                  />
                </div>
                <div className="field-signup">
                  <label htmlFor="password">Password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    onChange={handleChange}
                    onFocus={handleFocus}
                    value={formData.password}
                    autoComplete="on"
                    required
                  />
                  <button
                    className="icon-btn"
                    type="button"
                    onClick={showTogglePassword}
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>

                <button type="submit" className="submit-button">
                  Login
                </button>

                <p style={{marginTop: "40px", fontSize: "20px", color: "white"}}>Don't have an account? 
                  <span className="cleck" onClick={noAccount}> Click Here</span></p>
              </div>
              {error}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
