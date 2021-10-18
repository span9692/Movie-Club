'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstname: {
        allowNull: false,
        type: Sequelize.STRING(25)
      },
      lastname: {
        allowNull: false,
        type: Sequelize.STRING(25)
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING(25),
        unique:true
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING(50),
        unique:true
      },
      hashedpassword: {
        allowNull: false,
        type: Sequelize.STRING
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
    return queryInterface.dropTable('Users');
  }
};
