// Profile.jsx
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Home.css";

const Profile = () => {
  const { userId } = useParams();
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/users/getUser/${userId}`
        );
        setUserProfile(response.data);
        console.log(userProfile);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [userId, userProfile]);

  return (
    <div className="profile">
      {userProfile ? (
        <>
          <section className="user-details">
            <h2>{userProfile.username}'s Profile</h2>
            <p>Email: {userProfile.email}</p>
            {/* Add more user details as needed */}
          </section>

          <section className="xp-details">
            <h2>XP Details</h2>
            <p>Current XP: {userProfile.xp}</p>
            <p>XP Level: {userProfile.xpLevel}</p>
            {/* Add more XP-related details as needed */}
          </section>

          <section className="other-stats">
            <h2>Other Stats</h2>
            {/* Add other user stats here */}
          </section>
        </>
      ) : (
        <p>Loading user profile...</p>
      )}
    </div>
  );
};

export default Profile;
