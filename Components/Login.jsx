import React, { useState } from "react";
import "../Styles/Login.css";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [id, setId] = useState("");
  const [password, setPass] = useState("");
  const [role, setRole] = useState("Admin");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (id === "mkv_123" && password === "1234") {
      alert("Login Successful!");
      navigate("/dashboard");
    } else {
      alert("Invalid ID or Password");
    }
  }

  return (
    <div className="login-page">
      <Navbar />
      <div className="login-container">
        <div className="login-header">
          <span className="inactive">Sign up</span>
          <span className="active">Login</span>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <label>Id</label>
          <input
            type="text"
            placeholder="Enter your ID"
            required
            value={id}
            onChange={(e) => setId(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            required
            value={password}
            onChange={(e) => setPass(e.target.value)}
          />

          <label>Role</label>
          <select value={role} onChange={(e)=> setRole(e.target.value)}>
            <option>Admin</option>
            <option>User</option>
          </select>

          <button type="submit">
            Get Started
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
