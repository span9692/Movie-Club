'use strict';

const watchlist = require("./watchlist");

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
//click on ADD WATCHLIST (small form with submit button)
//watchlist post route, destruct id from req.body
//find movie by id - validation, not needed
//watchlist.create passing in userid and movieid
//create a watchlist
//watchlist.findAll(userId)
