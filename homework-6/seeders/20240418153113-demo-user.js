'use strict';
const bcrypt = require('bcryptjs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

      await queryInterface.bulkInsert('user', [
        { name: 'user1',lastName : "1", email: 'user1@example.com', password: await bcrypt.hash('123456', 3), createdAt: new Date(), updatedAt: new Date() },
        { name: 'user2', lastName : "1",email: 'user2@example.com', password: await bcrypt.hash('123456', 3), createdAt: new Date(), updatedAt: new Date() },
        { name: 'user3', lastName : "1",email: 'user3@example.com', password: await bcrypt.hash('123456', 3), createdAt: new Date(), updatedAt: new Date() },
        { name: 'user4',lastName : "1", email: 'user4@example.com', password: await bcrypt.hash('123456', 3), createdAt: new Date(), updatedAt: new Date() },
        { name: 'user5',lastName : "1", email: 'user5@example.com', password: await bcrypt.hash('123456', 3), createdAt: new Date(), updatedAt: new Date() },
        { name: 'user6', lastName : "1",email: 'user6@example.com', password: await bcrypt.hash('123456', 3), createdAt: new Date(), updatedAt: new Date() },
        { name: 'user7',lastName : "1", email: 'user7@example.com', password: await bcrypt.hash('123456', 3), createdAt: new Date(), updatedAt: new Date() },
        { name: 'user8',lastName : "1", email: 'user8@example.com', password: await bcrypt.hash('123456', 3), createdAt: new Date(), updatedAt: new Date() },
        { name: 'user9', lastName : "1",email: 'user9@example.com', password: await bcrypt.hash('123456', 3), createdAt: new Date(), updatedAt: new Date() },
        { name: 'user10' ,lastName : "1", email: 'user10@example.com', password: await bcrypt.hash('123456', 3), createdAt: new Date(), updatedAt: new Date() }
     ], {});

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
