import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import quizData from "../../QuizData";
import QuizCard from "../home/QuizCard";
import "./Home.css";
import HomeSubjectCard from "./HomeSubjectCard";
import Leaderboards from "./Leaderboards";

function Home() {
  let navigate = useNavigate();
  // Setting states for the quizzes and the favourited Subjects as an array
  const [quizzes, setQuizzes] = useState([]);
  const [favouritedSubjects, setFavouritedSubjects] = useState([]);

  //Upon page render, if user is not logged in, then they will be redirected to the login paeg
  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    }
    setQuizzes(quizData);
  }, [navigate]);

  //Upon page render, fetch favourite subjects from express API
  useEffect(() => {
    const fetchFavouritedSubjects = async () => {
      try {
        const response = await axios.get("http://localhost:3001/favourites", {
          // Using accessToken as a header to only retrieve favourites that much the current logged in user
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        });
        //Setting favourite Subjects to data from response
        setFavouritedSubjects(response.data.foundFavourites);
      } catch (error) {
        console.error(error);
      }
    };
    fetchFavouritedSubjects();
  }, []);

  return (
    <div className="home">
      <div className="wrapper">
        <div className="quiz-container">
          <h1>
            <a href="/quizzes">Quizzes</a>
          </h1>
          <div className="quiz-cards">
            {/* Mapping over quizzes 
          and rendering quizcard */}
            {quizzes.map((quiz, index) => (
              <QuizCard
                key={index}
                title={quiz.title}
                numQuestions={quiz.questions.length}
              />
            ))}
          </div>
        </div>
        <div className="fav-subject-container">
          <h1>
            <a href="/subjects?query=">Favourite Subjects</a>
          </h1>
          <div className="subject-cards-home">
            {favouritedSubjects.map((subject) => (
              <HomeSubjectCard
                key={subject.Subject.id}
                subject={subject.Subject}
                setFavouritedSubjects={setFavouritedSubjects}
              />
            ))}
          </div>
        </div>
        <div className="leaderboard-container ">
          <h1> Leaderboards</h1>
          {/* Render leaderboard component */}
          <Leaderboards />
        </div>
      </div>
    </div>
  );
}

export default Home;
