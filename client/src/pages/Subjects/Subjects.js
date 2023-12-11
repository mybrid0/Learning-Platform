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

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get("http://localhost:3001/subjects");
        setSubjects(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSubjects();
  }, []);

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
