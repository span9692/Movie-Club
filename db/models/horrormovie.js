'use strict';
//might need to update constraints here as well.
module.exports = (sequelize, DataTypes) => {
  const HorrorMovie = sequelize.define('HorrorMovie', {
    title: DataTypes.STRING,
    director: DataTypes.STRING,
    releasedate: DataTypes.DATE,
    rating: DataTypes.STRING,
    scarelevel: DataTypes.INTEGER
  }, {});
  HorrorMovie.associate = function(models) {
    HorrorMovie.hasMany(models.Review, {
      foreignKey:'movieid'
    });
    HorrorMovie.hasMany(models.Vote, {
      foreignKey:'horrormovieid'
    });
    HorrorMovie.belongsTo(models.Watchlist, {
      foreignKey:'horrormovieid'
    });
  };
  return HorrorMovie;
};
