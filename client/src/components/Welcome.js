import React from "react";
import background from "../img/background.png";

const Welcome = () => {
  return (
    <div className="welcomeContainer">
      <div className="bg-img">
        <img src={background} alt="background" />
      </div>
      <div className="welcomeText">
        <h1>Welcome to GibJohnTutoring</h1>
        <p>
          Register or Login to an account now to gain access to a range of
          educational content, quizzes, and more!
        </p>
      </div>
    </div>
  );
};

export default Welcome;
