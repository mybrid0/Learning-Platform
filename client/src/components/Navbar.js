import axios from "axios";
import React, { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { CiLogout } from "react-icons/ci";
import { FaCaretDown } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

function Navbar({ authState, setAuthState }) {
  console.log(authState);
  const [menuOpen, setMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState({
    xp: parseInt(localStorage.getItem("xp"), 10) || 0,
    xpLevel: parseInt(localStorage.getItem("xpLevel"), 10) || 0,
  });

  const xpForNextLevel = (authState.xpLevel + 1) * 1000;
  const xpProgress = (authState.xp / xpForNextLevel) * 100;

  console.log(xpProgress);

  return (
    <nav className="nav">
      <div className="main-nav">
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
          {/* Check if logged in */}
          {!authState.isLoggedIn ? (
            <></>
          ) : (
            <>
              <div className="user-info">
                <p>Level: {userData.xpLevel}</p>
              </div>
              <li className="drop-link">
                <a
                  href="#"
                  className="dropdown-click"
                  onClick={() => setOpen(!open)}
                >
                  {authState.username}
                  <FaCaretDown />
                </a>
                {open && <DropdownMenu setAuthState={setAuthState} />}
              </li>
            </>
          )}
        </ul>
      </div>
      <div className="progress-bar-container-xp">
        <div
          className="progress-bar-xp"
          style={{ width: `${xpProgress}%` }}
        ></div>
      </div>
      <p className="current-level">Level {userData.xpLevel}</p>
      <p className="xp-required">{authState.xp} XP </p>
      <p className="next-level">Level {userData.xpLevel + 1}</p>
    </nav>
  );
}

function DropdownMenu({ setAuthState }) {
  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ username: "", id: 0, isLoggedIn: false });
    window.location.replace("/");
  };

  function DropdownItem({ link, onClick, icon, children }) {
    const handleClick = (e) => {
      e.preventDefault();
      if (onClick) {
        onClick();
      }
    };
    return (
      <a href={link} className="menu-item" onClick={handleClick}>
        {children}
        <span className="icon">{icon}</span>
      </a>
    );
  }
  let navigate = useNavigate();

  return (
    <div className="dropdown">
      <DropdownItem
        link="/profile"
        onClick={() => navigate("/profile")}
        icon={<CgProfile />}
      >
        Profile
      </DropdownItem>
      <DropdownItem link="/logout" onClick={logout} icon={<CiLogout />}>
        Logout
      </DropdownItem>
    </div>
  );
}

export default Navbar;
