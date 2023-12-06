// components/Quizzes/Quizzes.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import quizData from "../QuizData";
import "./Quizzes.css";

const Quizzes = () => {
  const colors = ["#0A2647", "#144272", "#205295", "#27496D", "#1F4287"];

  // Example list of items

  return (
    <div className="quiz-wrapper">
      <div className="header">
        <h1>Quizzes</h1>
      </div>
      <div className="quizzes">
        <div className="quiz-cards1">
          {quizData.map((quiz, index) => (
            <Link
              key={index}
              to={`/quizzes/${quiz.title.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <div
                className="quiz-card1"
                style={{ backgroundColor: colors[index % colors.length] }}
              >
                <div className="content">
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default Quizzes;
