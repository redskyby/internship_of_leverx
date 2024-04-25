'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('role', [
      {
        value : "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        value : "customer",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        value : "tester",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
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
