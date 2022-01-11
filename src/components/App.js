import React from "react";
import Signup from "./Signup";
import HomePage from "./HomePage";
import Summary from "./Summary";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

function App() {
  return (
      <Router>
          <Routes>
            <Route path="/home" element={<HomePage/> }/>
            <Route path="/summary" element={<Summary/>} />
            <Route path="/" element={<Signup/>} />
          </Routes>
      </Router>
  );
}

export default App;
