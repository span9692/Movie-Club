'use strict';
module.exports = (sequelize, DataTypes) => {
  const Watchlist = sequelize.define('Watchlist', {
    userid: DataTypes.INTEGER,
    horrormovieid: DataTypes.INTEGER
  }, {});
  Watchlist.associate = function(models) {
    Watchlist.belongsTo(models.User, {
      foreignKey:'userid'
    });
    Watchlist.hasMany(models.HorrorMovie, {
      foreignKey:'horrormovieid'
    });
  };
  return Watchlist;
};
