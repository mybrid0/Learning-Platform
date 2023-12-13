import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import quizData from "../../QuizData";
import { AuthContext } from "../../helpers/AuthContext";
import QuizCard from "../home/QuizCard";
import "./Home.css";
import HomeSubjectCard from "./HomeSubjectCard";
import Leaderboards from "./Leaderboards";

function Home() {
  let navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);
  const [favouritedSubjects, setFavouritedSubjects] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    }
    setQuizzes(quizData);
  }, [navigate]);

  useEffect(() => {
    const fetchFavouritedSubjects = async () => {
      try {
        const response = await axios.get("http://localhost:3001/favourites", {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        });

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
          <Leaderboards />
        </div>
      </div>
    </div>
  );
}

export default Home;
