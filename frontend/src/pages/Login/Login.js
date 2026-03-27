import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Button from "../../components/common/Button/Button";
import Input from "../../components/common/Input/Input";

const Login = () => {
  const [formData, setFormData] = useState({ name: "", email: "", role: "student" });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      login(formData);
      navigate("/chat");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Welcome to GuideEd_</h2>
        <p className="login-subtitle">Sign in to continue to the chat portal</p>
        
        <form onSubmit={handleLogin} className="login-form">
          <Input 
            label="Full Name"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <Input 
            label="Email Address"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <div className="input-group">
            <label className="input-label">Role</label>
            <select 
              name="role" 
              value={formData.role} 
              onChange={handleChange}
              className="input-field select-field"
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          
          <Button type="submit" variant="primary" className="login-button">
            Join Chat Portal
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
