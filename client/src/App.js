import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import ConnectFacebook from "./components/ConnectFacebook";
import Dashboard from "./components/pages/Dashboard";
import FbIntegrate from "./components/pages/FbIntegrate";
import Login from "./components/pages/Login"

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/manage" element={<ConnectFacebook />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/pageintegrate" element={<FbIntegrate />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
