// SubjectDetails.jsx
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SubjectVideo from "./SubjectVideo";

//Component to display details about each subject +

const SubjectDetails = ({ id }) => {
  const [subjectDetails, setSubjectDetails] = useState(null);
  let navigate = useNavigate();

  //Fetch subejct based off subject ID
  useEffect(() => {
    const fetchSubjectDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/subjects/${id}`
        );
        setSubjectDetails(response.data.subject);
      } catch (error) {
        console.error("Error fetching subject details:", error);
      }
    };

    fetchSubjectDetails();
  }, [id]);

  //Button that redirects you to the quiz page once finished,
  const handleButton = () => {
    try {
      navigate(
        `/quizzes/${subjectDetails.name.toLowerCase().replace(/\s+/g, "-")}`
      );
    } catch (error) {
      console.error(error);
      navigate("/");
    }
  };
  return (
    <div className="subject-details">
      {subjectDetails ? (
        <>
          <h2>{subjectDetails.name}</h2>
          <p>{subjectDetails.description}</p>

          {/* Sample text */}
          <p className="main-content">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Similique,
            recusandae. Voluptatibus asperiores aspernatur aut et autem,
            voluptas dolorum officia, omnis facilis labore accusamus cupiditate
            sequi sint ex mollitia? Nesciunt ducimus nisi inventore eum dicta
            voluptatem, unde minima deserunt quisquam ab, obcaecati aliquid
            numquam. Totam laboriosam minus est rerum vitae fugit quam ab
            nesciunt fuga. Ex, dolorem maxime illum ullam, porro temporibus, a
            reprehenderit at nesciunt fugiat dicta commodi quisquam officiis
            dolores? Nulla error laborum ipsum dignissimos fugiat recusandae
            natus officiis consequatur eaque saepe, sed blanditiis commodi ea a
            quisquam deserunt. Earum voluptas reiciendis ex provident dolores
            delectus voluptatibus, odio minus.
          </p>
          <div className="bottom-section">
            <SubjectVideo subjectName={subjectDetails.name} />
            <button onClick={handleButton}>Take a Quiz?</button>
          </div>
        </>
      ) : (
        <p>loading subjects</p>
      )}
    </div>
  );
};

export default SubjectDetails;
