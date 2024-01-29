// components/Quizzes/Quizzes.js
import React, { useContext, useEffect, useState } from "react";
import {
  FaBook,
  FaBrain,
  FaCalculator,
  FaDesktop,
  FaGlobeAmericas,
  FaHistory,
} from "react-icons/fa";

import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import quizData from "../QuizData";
import { AuthContext } from "../helpers/AuthContext";
import "./Quizzes.css";

const Quizzes = () => {
  const { authState } = useContext(AuthContext);

  let navigate = useNavigate();
  const colors = ["#0A2647", "#144272", "#205295", "#27496D", "#1F4287"];
  const iconsMap = {
    Mathematics: FaCalculator,
    Geography: FaGlobeAmericas,
    "English Literature": FaBook,
    History: FaHistory,
    "Computer Science": FaDesktop,
  };
  const [highestScores, setHighestScore] = useState(() => {
    // Retrieve highest scores from local storage on component mount
    const storedScores = localStorage.getItem("highestScores");
    return storedScores ? JSON.parse(storedScores) : [];
  });

  useEffect(() => {
    const fetchHighestScores = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/quiz/user/high-score/`,
          {
            headers: {
              accessToken: localStorage.getItem("accessToken"),
            },
          }
        );
        setHighestScore(response.data.data);
        localStorage.setItem(
          "highestScores",
          JSON.stringify(response.data.data)
        );
      } catch (error) {
        console.error(error);
      }
    };
    fetchHighestScores();
  });

  return (
    <div className="quiz-wrapper">
      <div className="header">
        <h1>Quizzes</h1>
        <div className="header-icon">
          <FaBrain />
        </div>
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          Back
        </button>
      </div>
      <div className="quizzes">
        <div className="quiz-cards1">
          {quizData.map((quiz, index) => {
            const Icon = iconsMap[quiz.title] || FaBook;
            // Default to FaBook if subject not found
            const highestScore = highestScores.find(
              (score) => score.subject === quiz.title
            );
            const percentage = highestScore
              ? (highestScore.score / quiz.questions.length) * 100
              : 0;

            return (
              <Link
                key={index}
                to={`/quizzes/${quiz.title.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <div
                  className="quiz-card1"
                  style={{
                    backgroundColor: colors[index % colors.length],
                  }}
                >
                  <div className="content">
                    {/* Use the React Icon component */}
                    <h2>{quiz.title}</h2>
                    {highestScore && (
                      <>
                        <p>
                          Highest Score: {highestScore.score}/
                          {quiz.questions.length}
                        </p>
                      </>
                    )}
                    <div className="progress-bar-container">
                      <div
                        className="progress-bar"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <div className="icon">
                      <Icon />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Quizzes;
