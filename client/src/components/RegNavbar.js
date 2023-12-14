import React from "react";
import { NavLink } from "react-router-dom";

//Component to assist UI for logon/register
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
