import axios from "axios";
import React, { useContext, useState } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

const Login = () => {
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setAuthState } = useContext(AuthContext);

  const openModal = (errorMesage) => {
    setError(errorMesage);
    setIsModalOpen(true);
  };

  const closeModal = (errorMesage) => {
    setError("");
    setIsModalOpen(false);
  };

  const login = () => {
    axios
      .post("http://localhost:3001/users/login", {
        username: username,
        password: password,
      })
      .then((response) => {
        if (response.data.error) {
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
    <div className="loginContainer">
      <h1>Login</h1>
      <div className="formContainer">
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={login}>Login</button>
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Error"
          className="modal-content"
          overlayClassName="modal-overlay"
        >
          <h2 className="modal-title">Error</h2>
          <p>{error}</p>
          <button className="modal-button" onClick={closeModal}>
            Close
          </button>
        </Modal>
      </div>
    </div>
  );
};

export default Login;
