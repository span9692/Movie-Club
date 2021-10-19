'use strict';
//might need to update constraints here as well.
module.exports = (sequelize, DataTypes) => {
  const HorrorMovie = sequelize.define('HorrorMovie', {
    title: DataTypes.STRING,
    director: DataTypes.STRING,
    releasedate: DataTypes.DATE,
    rating: DataTypes.STRING,
    scarelevel: DataTypes.INTEGER,
    subGenre: DataTypes.STRING,
  }, {});
  HorrorMovie.associate = function(models) {
    HorrorMovie.hasMany(models.Review, {
      foreignKey:'horrormovieid'
    });
    HorrorMovie.hasMany(models.Vote, {
      foreignKey:'horrormovieid'
    });
    HorrorMovie.hasMany(models.Watchlist, {
      foreignKey:'horrormovieid'
    });
  };
  return HorrorMovie;
};
