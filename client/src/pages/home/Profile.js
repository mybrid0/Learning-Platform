// Profile.jsx
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Home.css";

//Component to display profile page for each user
const Profile = () => {
  //Retrieve the userID from the link ie. "/profile/2"
  const { userId } = useParams();
  const [userProfile, setUserProfile] = useState(null);

  //Fetch profile based on parameters for backend
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/users/getUser/${userId}`
        );
        setUserProfile(response.data);
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
