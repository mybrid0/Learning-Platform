import axios from "axios";
import React, { useEffect, useState } from "react";
import { GiFrance, GiSpain } from "react-icons/gi";
import SubjectCard from "./SubjectCard";
import "./Subjects.css";

import {
  FaAtom,
  FaBacterium,
  FaBook,
  FaBrain,
  FaCalculator,
  FaDesktop,
  FaFlask,
  FaGlobeAmericas,
  FaHistory,
  FaLightbulb,
  FaMoneyBillWave,
  FaMusic,
  FaPalette,
  FaPeopleArrows,
  FaRocket,
} from "react-icons/fa";
import { useLocation } from "react-router-dom";

const Subjects = () => {
  const [subjects, setSubjects] = useState([]);
  const iconsMap = {
    Mathematics: FaCalculator,
    Geography: FaGlobeAmericas,
    "English Literature": FaBook,
    History: FaHistory,
    "Computer Science": FaDesktop,
    Physics: FaAtom,
    Chemistry: FaFlask,
    Biology: FaBacterium,
    Economics: FaMoneyBillWave,
    Psycology: FaBrain,
    Sociology: FaPeopleArrows,
    Philosophy: FaLightbulb,
    Art: FaPalette,
    Music: FaMusic,
    Spanish: GiSpain,
    French: GiFrance,
    Astronomy: FaRocket,
  };
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("query");

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get("http://localhost:3001/subjects");
        const allSubjects = response.data;

        // Filter subjects based on the search query
        const filteredSubjects = allSubjects.filter((subject) =>
          subject.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

        // Set the filtered subjects in the state
        setSubjects(filteredSubjects);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSubjects();
  }, [searchQuery]);

  return (
    <div className="subjects-page">
      <h1>Subjects</h1>
      <div className="subjects-container">
        <div className="subject-cards">
          {subjects.map((subject) => (
            <SubjectCard
              key={subject.id}
              subject={subject}
              Icon={iconsMap[subject.name]}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Subjects;
