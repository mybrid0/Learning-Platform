import React from "react";
import background from "../img/background.png";

//Component for left side of login/Register
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

        {/* attributing author */}
        <p>
          <a href="https://www.freepik.com/free-photo/3d-student-graduation-cap-books-stack_33062162.htm#query=education&position=3&from_view=search&track=sph&uuid=0cf13d3c-42ee-408f-b573-a6e7fa0b3e92">
            Image by upklyak
          </a>
          on Freepik
        </p>
      </div>
    </div>
  );
};

export default Welcome;
