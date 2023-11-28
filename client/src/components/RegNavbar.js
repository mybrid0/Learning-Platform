import React from "react";
import { Link, NavLink } from "react-router-dom";

const RegNavbar = () => {
  return (
    <nav className="auth-nav">
      <NavLink to="/Login" className="login-btn">
        Login
      </NavLink>
      <NavLink to="/Register" className="register-btn">
        Register
      </NavLink>
    </nav>
  );
};

export default RegNavbar;
