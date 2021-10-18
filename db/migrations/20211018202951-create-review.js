'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Reviews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      review: {
        allowNull: false,
        type: Sequelize.TEXT(280)
      },
      userid: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{model:'Users'}
      },
      movieid: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{model:'HorrorMovies'}
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Reviews');
  }
};
