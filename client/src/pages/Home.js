import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import "./Home.css";

function Home() {
  let navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    }
  });
  return <div></div>;
}

export default Home;
