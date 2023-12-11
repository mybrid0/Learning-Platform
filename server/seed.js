const { Subject } = require("./models");

const subjectsList = [
  {
    name: "Mathematics",
    description: "The study of numbers, quantities, and shapes.",
    timeToComplete: 120, // in minutes
  },
  {
    name: "English Literature",
    description:
      "The examination, analysis, and interpretation of literature in English.",
    timeToComplete: 90, // in minutes
  },
  {
    name: "History",
    description: "The study of past events, particularly in human affairs.",
    timeToComplete: 100, // in minutes
  },
  {
    name: "Physics",
    description:
      "The branch of science that deals with matter, energy, and the fundamental forces of nature.",
    timeToComplete: 110, // in minutes
  },
  {
    name: "Chemistry",
    description:
      "The Science that deals with composition, structure and properties of substances",
    timeToComplete: 120,
  },
  {
    name: "Biology",
    description:
      "The branch of science that deals with living organisms and vital processes ",
    timeToComplete: 300,
  },
  {
    name: "Computer Science",
    description: "The study of computers and computing",
    timeToComplete: 500,
  },
  {
    name: "Geography",
    description:
      "A science that deals with the location of living and nonliving things on earth",
    timeToComplete: 300,
  },
  {
    name: "Economics",
    description:
      "Social Science that studies the production, distribution and consumption of goods and services",
    timeToComplete: 300,
  },
  {
    name: "Psycology",
    description:
      "Scientific discipline that studies mental states and processes and behavior in humans and other animals.",
    timeToComplete: 300,
  },
  {
    name: "Sociology",
    description:
      "Social science that studies human societies, their interactions, and the processes that preserve and change them. ",
    timeToComplete: 200,
  },
  {
    name: "Philosophy",
    description:
      "The rational, abstract , and methodical consideratio of reality as a whole.",
    timeToComplete: 450,
  },
  {
    name: "Art",
    description: "Art is a diverse range of human activity.",
    timeToComplete: 340,
  },
  {
    name: "Music",
    description:
      "The art form that combines vocal or instrumental sounds for beauty of form or emotional expression.",
    timeToComplete: 280,
  },
  {
    name: "Spanish",
    description: "The romance language originating in Spain.",
    timeToComplete: 320,
  },
  {
    name: "French",
    description: "The romance language originating in France",
    timeToComplete: 300,
  },
  {
    name: "Astronomy",
    description:
      "The science that encompasses the study of all extraterrestrial objects and phenomena.",
    timeToComplete: 470,
  },

  // Add descriptions and time to complete for the rest of the subjects...
];

const seedSubjects = async () => {
  try {
    await Subject.bulkCreate(subjectsList, { returning: true });
    console.log("Subjects seeded successfully.");
  } catch (error) {
    console.error("Error seeding subjects:", error);
  }
};

seedSubjects();
