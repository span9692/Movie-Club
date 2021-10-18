'use strict';
module.exports = (sequelize, DataTypes) => {
  const Vote = sequelize.define('Vote', {
    userid: DataTypes.INTEGER,
    horrormovieid: DataTypes.INTEGER,
    opinion: DataTypes.BOOLEAN
  }, {});
  Vote.associate = function(models) {
    // associations can be defined here
  };
  return Vote;
};