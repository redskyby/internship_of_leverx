'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {


      await queryInterface.bulkInsert('like', [
        { userId: 1, postId: 1 },
        { userId: 2, postId: 1 },
        { userId: 3, postId: 1 },
        { userId: 1, postId: 1 },
        { userId: 2, postId: 1 },
        { userId: 6, postId: 2 },
        { userId: 7, postId: 2 },
        { userId: 8, postId: 2 },
        { userId: 9, postId: 2 },
        { userId: 10, postId: 2 },
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
