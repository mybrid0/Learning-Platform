import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

import axios from "axios";
import "./App.css";
import PageTransition from "./components/PageTransition";
import { AuthContext } from "./helpers/AuthContext";
import About from "./pages/About";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";

function App() {
  const location = useLocation();
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    isLoggedIn: false,
  });

  useEffect(() => {
    axios
      .get("http://localhost:3001/users/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error)
          setAuthState({ ...authState, isLoggedIn: false });
        else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            isLoggedIn: true,
          });
        }
      });
  }, []);

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <BrowserRouter>
          <Navbar authState={authState} />
          <PageTransition>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/about" element={<About />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </PageTransition>
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
