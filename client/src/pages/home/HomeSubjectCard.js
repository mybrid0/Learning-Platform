import axios from "axios";
import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Home.css";

const HomeSubjectCard = ({ subject, setFavouritedSubjects }) => {
  console.log(subject);

  const [isFavorite, setIsFavorite] = useState(true);

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
        setFavouritedSubjects((prevSubjects) => {
          console.log(prevSubjects);
          const updatedSubjects = prevSubjects.filter(
            (subj) => subj.Subject.id !== subject.id
          );
          console.log(updatedSubjects);
          return updatedSubjects;
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="home-subject-card">
      <Link to={`/subjects/${subject.name.toLowerCase().replace(/\s+/g, "-")}`}>
        <h2>{subject.name}</h2>
      </Link>
      <div
        className={`favorite-button-home ${isFavorite ? "favorited" : ""}`}
        onClick={handleFavoriteClick}
      >
        <FaHeart />
      </div>
    </div>
  );
};

export default HomeSubjectCard;
