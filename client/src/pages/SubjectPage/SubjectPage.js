// SubjectPage.jsx
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SubjectDetails from "./SubjectDetails";
import SubjectSidebar from "./SubjectSidebar";
const SubjectPage = () => {
  // Dummy data for demonstration purposes

  const [subjects, setSubjects] = useState([]);
  const [selectedSubjectId, setSelectedSubjectId] = useState(null);
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get("http://localhost:3001/subjects");
        setSubjects(response.data);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };

    fetchSubjects();
  }, []);

  console.log(subjects);

  const handleSubjectClick = (subjectId) => {
    setSelectedSubjectId(subjectId);
  };

  return (
    <div className="subject-page">
      <SubjectSidebar subjects={subjects} onSubjectClick={handleSubjectClick} />
      <SubjectDetails id={selectedSubjectId} />
    </div>
  );
};

export default SubjectPage;
