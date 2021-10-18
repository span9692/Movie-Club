'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    hashedpassword: DataTypes.STRING
  }, {});
    User.associate = function(models) {
      User.hasMany(models.Review, {
        foreignKey:'userid'
      });
      //might need to switch to hasmany if run into allowedvotes problems.
      User.hasOne(models.Vote, {
        foreignKey:'userid'
      });
      User.hasOne(models.Watchlist, {
        foreignKey:'userid'
      });
  };
  return User;
};
