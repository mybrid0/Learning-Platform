// Leaderboards.jsx
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./leaderboards.css";

//Component to display leaderboards on home page
const Leaderboards = () => {
  const [leaderboards, setLeaderboards] = useState([]);

  //Fetch leaderboards on render
  useEffect(() => {
    // Fetch the leaderboard data from the backend
    const fetchLeaderboards = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/users/leaderboards"
        );
        setLeaderboards(response.data);
      } catch (error) {
        console.error("Error fetching leaderboards:", error);
      }
    };

    fetchLeaderboards();
  }, []);

  //Depending on position of the user, the background will change to gold,silver,bronze
  return (
    <div className="leaderboards">
      <ul>
        {leaderboards.map((user, index) => (
          <li
            key={user.id}
            className={
              index === 0
                ? "gold"
                : index === 1
                ? "silver"
                : index === 2
                ? "bronze"
                : "other"
            }
          >
            <span className="position">{index + 1}</span>
            <span className="username">{user.username}</span>
            <span className="xp">{user.xp} XP</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboards;
