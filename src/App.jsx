import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../Components/Login";
import DashBoard from "../Components/DashBoard";
import "./App.css";

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<DashBoard />} />
        </Routes>
        <div className="ellipse"></div>
      </div>
    </Router>
  );
};

export default App;
