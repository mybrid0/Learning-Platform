// Leaderboards.jsx
import axios from "axios";
import React, { useEffect, useState } from "react";

const Leaderboards = () => {
  const [leaderboards, setLeaderboards] = useState([]);

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

  return (
    <div>
      <h2>Leaderboards</h2>
      <ol>
        {leaderboards.map((user, index) => (
          <li key={user.id}>
            <span>{index + 1}. </span>
            <strong>{user.username}</strong> - XP: {user.xp}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Leaderboards;
