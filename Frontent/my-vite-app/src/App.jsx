import React from "react";
import { Route, Routes } from "react-router-dom";

import Start from "./pages/Start";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import Home from "./pages/Home";
import UserContext from "./context/UserContext";

import "remixicon/fonts/remixicon.css";

const App = () => {
  return (
    <UserContext>
      <div>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/signup" element={<UserSignup />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </UserContext>
  );
};

export default App;