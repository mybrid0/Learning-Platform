import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import quizData from "../../QuizData";
import { AuthContext } from "../../helpers/AuthContext";
import QuizCard from "../home/QuizCard";
import "./Home.css";

function Home() {
  let navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    }
    setQuizzes(quizData);
  }, [navigate]);

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
          <h1>Favourite Subjects</h1>
        </div>
        <div className="profile-container">
          <h1> Profile</h1>
        </div>
      </div>
    </div>
  );
}

export default Home;
