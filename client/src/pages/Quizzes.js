// components/Quizzes/Quizzes.js
import React, { useState } from "react";
import {
  FaBook,
  FaBrain,
  FaCalculator,
  FaDesktop,
  FaGlobeAmericas,
  FaHistory,
} from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";
import quizData from "../QuizData";
import "./Quizzes.css";

const Quizzes = () => {
  let navigate = useNavigate();
  const colors = ["#0A2647", "#144272", "#205295", "#27496D", "#1F4287"];
  const iconsMap = {
    Mathematics: FaCalculator,
    Geography: FaGlobeAmericas,
    "English Literature": FaBook,
    History: FaHistory,
    "Computer Science": FaDesktop,
  };
  // Example list of items

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
            const Icon = iconsMap[quiz.title] || FaBook; // Default to FaBook if subject not found

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
                    <div className="icon">
                      <Icon />
                    </div>
                    <h2>{quiz.title}</h2>
                    {/* Add logic to check completion status and display score */}
                    {/* For demonstration, assume half of the questions are correct */}
                    <p>Completion Status: Completed</p>
                    <p>
                      Score: {Math.floor(quiz.questions.length / 2)}/
                      {quiz.questions.length}
                    </p>
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
