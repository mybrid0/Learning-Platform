import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { CiLogout } from "react-icons/ci";
import { FaCaretDown } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";

function Navbar({ authState }) {
  console.log(authState);
  const [menuOpen, setMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);
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
        <li className="link">
          <NavLink to="/about">About Us</NavLink>
        </li>
        {!authState.isLoggedIn ? (
          <>
            <li className="link">
              <NavLink to="/login">Login</NavLink>
            </li>
            <li className="link">
              <NavLink to="/register">Register</NavLink>
            </li>
          </>
        ) : (
          <li className="drop-link">
            <a
              href="#"
              className="dropdown-click"
              onClick={() => setOpen(!open)}
            >
              {authState.username}
              <FaCaretDown />
            </a>
            {open && <DropdownMenu />}
          </li>
        )}
      </ul>
    </nav>
  );
}

function DropdownMenu() {
  function DropdownItem(props) {
    return (
      <a href={props.link} className="menu-item">
        {props.children}
        <span className="icon">{props.icon}</span>
      </a>
    );
  }
  return (
    <div className="dropdown">
      <DropdownItem link="/profile" icon={<CgProfile />}>
        Profile
      </DropdownItem>
      <DropdownItem link="/logout" icon={<CiLogout />}>
        Logout
      </DropdownItem>
    </div>
  );
}

export default Navbar;
