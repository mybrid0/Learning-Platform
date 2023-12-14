// SubjectPage.jsx
import axios from "axios";
import React, { useEffect, useState } from "react";
import SubjectDetails from "./SubjectDetails";
import SubjectSidebar from "./SubjectSidebar";
const SubjectPage = () => {
  // Dummy data for demonstration purposes

  const [subjects, setSubjects] = useState([]);
  const [selectedSubjectId, setSelectedSubjectId] = useState(null);

  //Fetch list of subjects.
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

  //When clicking on subject, get the subject ID

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
