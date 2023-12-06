import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import quizData from "../QuizData"; // Importing the quiz data
import { AuthContext } from "../helpers/AuthContext";
import "./Quiz.css"; // Importing styles for the Quiz component

const Quiz = () => {
  // Extracting the quizTitle parameter from the URL using React Router's useParams
  const { quizTitle } = useParams();
  const { authState } = useContext(AuthContext);

  // State variables to manage the quiz state
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);

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
  const handleNextQuestion = async () => {
    console.log(currentQuestion);
    console.log(currentQuiz.questions.length);
    if (currentQuestion < currentQuiz.questions.length - 1) {
      // Move to the next question
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
      setSelectedAnswer(null); // Reset selected answer for the new question
    } else {
      try {
        // Quiz finished, navigate to the end screen
        console.log("Quiz finished!");
        const quizCompletionResponse = await axios.post(
          "http://localhost:3001/quiz/quiz-completion",
          {
            userId: authState.id,
            score: score,
            subject: currentQuiz.title,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        console.log(quizCompletionResponse.data);
        setIsQuizFinished(true);
      } catch (error) {
        console.log(error);
      }
    }
  };

  // Check if the quiz is finished based on the current question index
  console.log(currentQuestion, currentQuiz.questions.length);
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
          <>
            <div className="quiz-finished">
              {/* Display quiz completion message and final score */}
              <h2>
                Congratulations! You've completed the {currentQuiz.title} Quiz.
              </h2>
              <p>
                Final Score: {score}/{currentQuiz.questions.length}
              </p>
            </div>
            <button className="back-btn" onClick={() => navigate("/quizzes")}>
              Back
            </button>
          </>
        )
      ) : (
        // Display a message if no questions are found for the quiz
        <p>No questions found for this quiz.</p>
      )}
    </div>
  );
};

export default Quiz;
