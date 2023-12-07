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
    xp: 0,
  });

  const updateXP = (newXP) => {
    setAuthState((prevAuthState) => ({
      ...prevAuthState,
      xp: newXP,
    }));
  };

  //When page Loads...
  useEffect(() => {
    // Call auth endpoint in backend using the access Token
    axios
      .get("http://localhost:3001/users/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      //after completing request receives response
      .then((response) => {
        console.log(response);
        if (response.data.error)
          // If there is an error, isLogged in will still be false.
          setAuthState({ ...authState, isLoggedIn: false });
        else {
          //If it is a success, The authstate has the username, id, and isLoggedIn
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            isLoggedIn: true,
            xp: parseInt(localStorage.getItem("xp")) || 0,
            xpLevel: parseInt(localStorage.getItem("xpLevel")) || 0,
          });
        }
      });
  }, []);

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState, updateXP }}>
        {/* Context wraps the application */}
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
