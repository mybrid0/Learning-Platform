import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

function Navbar({ authState }) {
  console.log(authState);
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="nav">
      <Link to="/" className="title">
        Gib<span>John</span>Tutoring
      </Link>
      <div
        className="menu"
        onClick={() => {
          setMenuOpen(!menuOpen);
        }}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        <li>
          <NavLink to="/about">About Us</NavLink>
        </li>
        {!authState.isLoggedIn ? (
          <>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
            <li>
              <NavLink to="/register">Register</NavLink>
            </li>
          </>
        ) : (
          <li>
            <NavLink to="/profile">{authState.username}</NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
