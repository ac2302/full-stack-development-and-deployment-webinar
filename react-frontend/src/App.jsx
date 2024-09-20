import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginSignup from "./components/LoginSignup";
import ToDo from "./components/ToDo";

import "./App.css";

function App() {
  return (
    <div id="app">
      <Routes>
        <Route path="/" element={<LoginSignup />} />
        <Route path="/todo" element={<ToDo />} />
        <Route path="*" element={<h1>404 Page not found</h1>} />
      </Routes>
    </div>
  );
}

export default App;
