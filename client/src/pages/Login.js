import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import RegNavbar from "../components/RegNavbar";
import Welcome from "../components/Welcome";
import { AuthContext } from "../helpers/AuthContext";
const Login = () => {
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [modal, setModal] = useState(false);
  const [error, setError] = useState("");

  const { setAuthState } = useContext(AuthContext);
  const openModal = (errorMessage) => {
    setError(errorMessage);
    setModal(true);
  };

  const closeModal = () => {
    setError("");
    setModal(false);
  };

  const login = () => {
    axios
      .post("http://localhost:3001/users/login", {
        username: username,
        password: password,
      })
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
          openModal(response.data.error);
        } else {
          localStorage.setItem("accessToken", response.data.token);
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            isLoggedIn: true,
          });
          navigate("/");
        }
      });
  };
  return (
    <div className="authWrapper">
      <Welcome />
      <div className="loginContainer">
        <div className="nav-auth">
          <RegNavbar />
        </div>
        <div className="registerContent">
          <h1>Login</h1>
          <div className="formContainer">
            <label htmlFor="username">USERNAME</label>
            <input
              type="text"
              placeholder="Enter your username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="username">PASSWORD</label>

            <input
              type="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={login}>Login</button>
          </div>

          {modal && (
            <div className="modal">
              <div className="modal-overlay" onClick={closeModal}>
                <div className="modal-content">
                  <h2>Error</h2>
                  <p>{error}</p>
                  <button className="modal-button" onClick={closeModal}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
