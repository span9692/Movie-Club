'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Users', [
     {firstname: 'Demo',lastname:'Roberts',username:'JRR',email:'jrr@jrr.com',hashedpassword:'$2a$10$UNdTF1egE2O8lDyZECu2Y.bZmSY0zNCnL8pTD0V764OgKtg6CMOQq', createdAt:new Date(), updatedAt: new Date()}
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
     return queryInterface.bulkDelete('Users', null, {});
  }
};
