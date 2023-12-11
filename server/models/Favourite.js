module.exports = (sequelize, DataTypes) => {
  const Favourite = sequelize.define("Favourite");

  Favourite.associate = (models) => {
    Favourite.belongsTo(models.Users, {
      onDelete: "CASCADE",
    });

    Favourite.belongsTo(models.Subject, {
      foreignKey: "subjectId",
      onDelete: "CASCADE",
    });
  };
  return Favourite;
};
