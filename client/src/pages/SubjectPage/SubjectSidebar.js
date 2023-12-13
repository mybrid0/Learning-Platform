import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SubjectPage.css";

const SubjectSidebar = ({ subjects, onSubjectClick }) => {
  const navigate = useNavigate();
  const handleSubjectClick = (subject) => {
    navigate(`/subjects/${subject.name.toLowerCase()}`);
  };
  return (
    <div className="subject-sidebar">
      <h2>Subjects</h2>
      <ul>
        {subjects.map((subject) => (
          <Link
            to={`/subjects/${subject.name.toLowerCase()}`}
            onClick={() => onSubjectClick(subject.id)}
          >
            <li key={subject.id}>{subject.name}</li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default SubjectSidebar;
