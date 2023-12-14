import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Subjects.css";

import axios from "axios";
import { FaHeart } from "react-icons/fa";

//Subejct card which displays on "/subjects"
const SubjectCard = ({ subject, Icon }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  //Handles response when clicking favourite
  const handleFavoriteClick = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/favourites/like",
        { subjectId: subject.id },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      );

      if (response.data.favourited) {
        setIsFavorite(true);
      } else {
        setIsFavorite(false);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="subject-card">
      <Link to={`/subjects/${subject.name.toLowerCase().replace(/\s+/g, "-")}`}>
        <div className="card-header">
          <div className="subject-icon">
            <Icon />
          </div>
          <h2>{subject.name}</h2>
        </div>
        <div className="card-content">
          <p>{subject.description}</p>
          <p>Time to Complete: {subject.timeToComplete} minutes</p>
        </div>
      </Link>
      <div
        className={`favorite-button ${isFavorite ? "favorited" : ""}`}
        onClick={handleFavoriteClick}
      >
        <FaHeart />
      </div>
    </div>
  );
};

export default SubjectCard;
