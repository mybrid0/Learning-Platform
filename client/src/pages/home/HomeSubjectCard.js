import axios from "axios";
import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Home.css";

//Component that displays each favourited subject
const HomeSubjectCard = ({ subject, setFavouritedSubjects }) => {
  const [isFavorite, setIsFavorite] = useState(true);

  //Function to handle favourites
  const handleFavoriteClick = async () => {
    //Communicate with express API to add a favourite using subject ID
    try {
      const response = await axios.post(
        "http://localhost:3001/favourites/like",
        { subjectId: subject.id },
        //Use accessToken to validate user favourite
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      );

      //Handle favourite state
      if (response.data.favourited) {
        setIsFavorite(true);
      } else {
        setIsFavorite(false);
        //Filter the favourited subjects each time a subject is unfavourited to trigger re-render
        setFavouritedSubjects((prevSubjects) => {
          const updatedSubjects = prevSubjects.filter(
            (subj) => subj.Subject.id !== subject.id
          );
          return updatedSubjects;
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  //Each card has a link to the subject
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
