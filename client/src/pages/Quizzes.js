// components/Quizzes/Quizzes.js
import React from "react";
import { Link } from "react-router-dom";
import quizData from "../QuizData";
import "./Quizzes.css";

const Quizzes = () => {
  return (
    <div className="quizzes">
      <h1>Quizzes</h1>
      <div className="quiz-cards1">
        {quizData.map((quiz, index) => (
          <Link
            key={index}
            to={`/quizzes/${quiz.title.toLowerCase().replace(/\s+/g, "-")}`}
          >
            <div className="quiz-card1">
              <h2>{quiz.title}</h2>
              {/* Add logic to check completion status and display score */}
              {/* For demonstration, assume half of the questions are correct */}
              <p>Completion Status: Completed</p>
              <p>
                Score: {Math.floor(quiz.questions.length / 2)}/
                {quiz.questions.length}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Quizzes;
