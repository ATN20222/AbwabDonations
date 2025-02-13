import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";  // Use BrowserRouter here
import PaymentForm from "./Components/PaymentForm";
import PaymentSuccess from "./Components/PaymentSuccess";
import AlahlyMomkenSucess from "./Components/AlahlyMomkenSucess";

function App() {
  return (
    <div className="App">
      <Router>  
        <Routes>
          <Route path="/*" element={<PaymentForm />} />
          <Route path="/paymentsuccess" element={<PaymentSuccess />} />
          <Route path="/callback" element={<AlahlyMomkenSucess />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
