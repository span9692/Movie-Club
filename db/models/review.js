'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    review: DataTypes.TEXT,
    userid: DataTypes.INTEGER,
    horrormovieid: DataTypes.INTEGER
  }, {});
  Review.associate = function(models) {
    Review.belongsTo(models.HorrorMovie, {
      foreignKey:'horrormovieid'
    });
    Review.belongsTo(models.User, {
      foreignKey:'userid'
    });
  };
  return Review;
};
