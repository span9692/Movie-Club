'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    review: DataTypes.TEXT,
    userid: DataTypes.INTEGER,
    movieid: DataTypes.INTEGER
  }, {});
  Review.associate = function(models) {
    Review.belongsTo(models.HorrorMovie, {
      foreignKey:'movieid'
    });
    Review.belongsTo(models.User, {
      foreignKey:'userid'
    });
  };
  return Review;
};
