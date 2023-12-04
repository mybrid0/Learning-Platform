import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/home/Home";

import axios from "axios";
import "./App.css";
import { AuthContext } from "./helpers/AuthContext";
import About from "./pages/About";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Quiz from "./pages/Quiz";
import Quizzes from "./pages/Quizzes";
import Register from "./pages/Register";

function App() {
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
          <Navbar authState={authState} setAuthState={setAuthState} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/quizzes/:quizTitle" element={<Quiz />} />
            <Route path="/quizzes/" element={<Quizzes />} />
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
