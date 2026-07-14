import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SignUP from "./pages/SignUP";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { dataContext } from "./context/UserContext";

const App = () => {
  let { userData } = useContext(dataContext);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />

      <Route path="/signup" element={<SignUP />} />

      <Route path="/login" element={userData ? <Navigate to="/home" /> : <Login />} />

      <Route path="/home" element={userData ? <Home /> : <Navigate to="/login" />} />
    </Routes>
  );
};

export default App;