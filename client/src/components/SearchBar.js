// SearchBar.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./searchbar.css";

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/subjects?query=${searchQuery}`);
  };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="Search for subjects"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;