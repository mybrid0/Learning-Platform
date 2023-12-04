// components/Quiz/Quiz.js
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import quizData from "../QuizData";
import "./Quiz.css";

const Quiz = () => {
  const { quizTitle } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  const currentQuiz = quizData.find(
    (quiz) => quiz.title.toLowerCase().replace(/\s+/g, "-") === quizTitle
  );

  const handleAnswerClick = (selectedOption) => {
    if (selectedAnswer === null) {
      const isCorrect =
        currentQuiz.questions[currentQuestion].correctAnswer === selectedOption;
      setSelectedAnswer(selectedOption);
      if (isCorrect) {
        setScore((prevScore) => prevScore + 1);
      }
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < currentQuiz.questions.length) {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
      setSelectedAnswer(null);
    } else {
      // Quiz finished, navigate to the end screen
      console.log("Quiz finished!");
      navigate("/"); // Redirect to the home page
    }
  };

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
            <h2>
              Congratulations! You've completed the {currentQuiz.title} Quiz.
            </h2>
            <p>
              Final Score: {score}/{currentQuiz.questions.length}
            </p>
            <button onClick={() => navigate("/")}>Back to Home</button>
          </div>
        )
      ) : (
        <p>No questions found for this quiz.</p>
      )}
    </div>
  );
};

export default Quiz;
