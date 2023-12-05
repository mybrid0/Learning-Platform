// components/Quiz/Quiz.js

import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import quizData from "../QuizData"; // Importing the quiz data (assuming it's a separate file)
import "./Quiz.css"; // Importing styles for the Quiz component

const Quiz = () => {
  // Extracting the quizTitle parameter from the URL using React Router's useParams
  const { quizTitle } = useParams();

  // State variables to manage the quiz state
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);

  // Access the navigate function from React Router to handle navigation
  const navigate = useNavigate();

  // Find the current quiz based on the URL parameter
  const currentQuiz = quizData.find(
    (quiz) => quiz.title.toLowerCase().replace(/\s+/g, "-") === quizTitle
  );

  // Function to handle a user clicking on an answer option
  const handleAnswerClick = (selectedOption) => {
    if (selectedAnswer === null) {
      // Check if the selected option is correct and update the score
      const isCorrect =
        currentQuiz.questions[currentQuestion].correctAnswer === selectedOption;
      setSelectedAnswer(selectedOption);
      if (isCorrect) {
        setScore((prevScore) => prevScore + 1);
      }
    }
  };

  // Function to handle moving to the next question or finishing the quiz
  const handleNextQuestion = () => {
    if (currentQuestion < currentQuiz.questions.length - 1) {
      // Move to the next question
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
      setSelectedAnswer(null); // Reset selected answer for the new question
    } else {
      // Quiz finished, navigate to the end screen
      console.log("Quiz finished!");
      navigate("/"); // Redirect to the home page
    }
  };

  // Check if the quiz is finished based on the current question index
  const isQuizFinished = currentQuestion === currentQuiz.questions.length;

  return (
    <div className="quiz">
      <div className="quiz-header">
        <h1>{currentQuiz.title} Quiz</h1>
        <div className="score-container">
          <span className="score-num">{score}</span>
          <span>{currentQuiz.questions.length}</span>
        </div>
      </div>
      {currentQuiz.questions.length > 0 ? (
        !isQuizFinished ? (
          <div className="question-container">
            <h2>Question {currentQuestion + 1}:</h2>
            <p>{currentQuiz.questions[currentQuestion].text}</p>
            <div className="answer-grid">
              {currentQuiz.questions[currentQuestion].options.map(
                (option, index) => (
                  // Render each answer option, applying styles based on selection and correctness
                  <div
                    key={index}
                    className={`answer-option ${
                      selectedAnswer === option
                        ? currentQuiz.questions[currentQuestion]
                            .correctAnswer === option
                          ? "correct"
                          : "wrong"
                        : ""
                    }`}
                    onClick={() => handleAnswerClick(option)}
                  >
                    {option}
                  </div>
                )
              )}
            </div>
            <button
              onClick={handleNextQuestion}
              disabled={selectedAnswer === null}
            >
              Next Question
            </button>
          </div>
        ) : (
          <div className="quiz-finished">
            {/* Display quiz completion message and final score */}
            <h2>
              Congratulations! You've completed the {currentQuiz.title} Quiz.
            </h2>
            <p>
              Final Score: {score}/{currentQuiz.questions.length}
            </p>
            <button onClick={() => navigate("/quizzes")}>Back</button>
          </div>
        )
      ) : (
        // Display a message if no questions are found for the quiz
        <p>No questions found for this quiz.</p>
      )}
    </div>
  );
};

export default Quiz;
