// components/QuizCard/QuizCard.js
import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

const QuizCard = ({ title, numQuestions }) => {
  return (
    <Link
      to={`/quizzes/${title.toLowerCase().replace(/\s+/g, "-")}`}
      className="quiz-card"
    >
      <h2>{title}</h2>
      <p>
        {numQuestions} {numQuestions === 1 ? "question" : "questions"}
      </p>
    </Link>
  );
};

QuizCard.propTypes = {
  title: PropTypes.string.isRequired,
  numQuestions: PropTypes.number.isRequired,
};

export default QuizCard;
