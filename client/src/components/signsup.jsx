import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import '../styles/signupStyles.css'
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const Signup = () => {
  const [formData, setFormData] = useState({
    userType: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [activeTab, setActiveTab] = useState("seller");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const showTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleTabChange = (type) => {
    setActiveTab(type);
    setFormData({ ...formData, userType: type === 'seller' ? '1' : '2'})
  }

  const handleFocus = (e) => {
    e.target.previousElementSibling.classList.add('active', 'highlight');
  }

  const hasAccount = () => {
    navigate("/login")
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/auth/signup",
        formData
      );
      if (response.status === 201) {
        toast.success("User created successfully", response.data);
        navigate("/login");
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
          <h1 className="h1">Sign Up</h1>
        </div>
        <ul className="switch-content">
          <li className={`tab ${activeTab === "seller" ? "active" : ""}`}>
            <input
              type="button"
              name="userType"
              onClick={() => handleTabChange('seller')}
              onChange={handleChange}
              value="seller"
              style={{
                backgroundColor: activeTab === 'seller' ? "pink" : "transparent",
                color: activeTab === 'seller' ? "black": "white",
              }}
            />
            
          </li>
          <li>
            
            <input
              type="button"
              name="userType"
              onClick={() => handleTabChange('buyer')}
              onChange={handleChange}
              value="buyer"
              style={{
                backgroundColor: activeTab === "buyer" ? "pink" : "transparent",
                color: activeTab === "buyer" ? "black" : "white",
              }}
            />
            
          </li>
        </ul>

        <div className="form-containers">
          
            <div className="signup-content">
              <form onSubmit={handleSubmit}>
                <div className="top-signup">
                  <div className="field-signup">
                    <label>First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      onChange={handleChange}
                      onFocus={handleFocus}
                      value={formData.firstName}
                      required
                    />
                  </div>
                  <div className="field-signup">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      onChange={handleChange}
                      onFocus={handleFocus}
                      value={formData.lastName}
                      required
                    />
                  </div>
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
                    <button className="icon-btn" type="button" onClick={showTogglePassword}>
                      {showPassword ? <EyeOff /> : <Eye />}
                    </button>
                    
                  </div>
                  <div className="field-signup">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="confirmPassword"
                      onChange={handleChange}
                      onFocus={handleFocus}
                      value={formData.confirmPassword}
                      autoComplete="on"
                      required
                    />
                  </div>

                  <button type="submit" className="submit-button">Sign In</button>

                  <p style={{marginTop: "50px", fontSize: "20px", color: "white"}}>Already Have an Account? 
                    <span className="cleck" onClick={hasAccount}> Click Here</span></p>
                </div>
                {error}
              </form>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
