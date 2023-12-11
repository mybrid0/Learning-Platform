module.exports = (sequelize, DataTypes) => {
  const Subject = sequelize.define("Subject", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING, // You might want to use TEXT for longer descriptions
      allowNull: true,
    },
    timeToComplete: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });

  Subject.associate = (models) => {
    Subject.hasMany(models.Favourite, {
      onDelete: "CASCADE",
    });
  };
  return Subject;
};
