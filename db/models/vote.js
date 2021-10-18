'use strict';
module.exports = (sequelize, DataTypes) => {
  const Vote = sequelize.define('Vote', {
    userid: DataTypes.INTEGER,
    horrormovieid: DataTypes.INTEGER,
    opinion: DataTypes.BOOLEAN
  }, {});
  Vote.associate = function(models) {
    Vote.belongsTo(models.HorrorMovie, {
      foreignKey:'horrormovieid'
    });
    Vote.belongsTo(models.User, {
      foreignKey:'userid'
    });
  };
  return Vote;
};
