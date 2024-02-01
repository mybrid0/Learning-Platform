import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/home/Home";

import axios from "axios";
import "./App.css";
import XPUpdater from "./XPUpdater";
import { AuthContext } from "./helpers/AuthContext";
import About from "./pages/About";
import Login from "./pages/Login";
import Quiz from "./pages/Quiz";
import Quizzes from "./pages/Quizzes";
import Register from "./pages/Register";
import SubjectPage from "./pages/SubjectPage/SubjectPage";
import Subjects from "./pages/Subjects/Subjects";
import Profile from "./pages/home/Profile";
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
    localStorage.setItem("xp", newXP);
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
  }, [authState]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/users/userData", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        setAuthState((prevAuthState) => ({
          ...prevAuthState,
          xp: response.data.xp,
          xpLevel: response.data.xpLevel,
        }));
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/users/userData",
          {
            headers: {
              accessToken: localStorage.getItem("accessToken"),
            },
          }
        );

        setAuthState((prevAuthState) => ({
          ...prevAuthState,
          xp: response.data.xp,
          xpLevel: response.data.xpLevel,
        }));
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [setAuthState]);

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
            <Route path="/profile/:userId" element={<Profile />} />
            <Route path="/quizzes/:quizTitle" element={<Quiz />} />
            <Route path="/quizzes/" element={<Quizzes />} />
            <Route path="/subjects/" element={<Subjects />} />
            <Route path="subjects/:subjectId" element={<SubjectPage />} />
          </Routes>
          <XPUpdater authState={authState} setAuthState={setAuthState} />
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
