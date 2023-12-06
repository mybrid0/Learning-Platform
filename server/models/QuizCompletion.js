module.exports = (sequelize, DataTypes) => {
  const QuizCompletion = sequelize.define("QuizCompletion", {
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  QuizCompletion.associate = (models) => {
    QuizCompletion.belongsTo(models.Users);
  };

  return QuizCompletion;
};
