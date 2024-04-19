'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {


      await queryInterface.bulkInsert('like', [
        { userId: 1, postId: 1 , createdAt: new Date(), updatedAt: new Date()},
        { userId: 2, postId: 1 , createdAt: new Date(), updatedAt: new Date()},
        { userId: 3, postId: 1 , createdAt: new Date(), updatedAt: new Date()},
        { userId: 1, postId: 1 , createdAt: new Date(), updatedAt: new Date()},
        { userId: 2, postId: 1 , createdAt: new Date(), updatedAt: new Date()},
        { userId: 6, postId: 2 , createdAt: new Date(), updatedAt: new Date()},
        { userId: 7, postId: 2 , createdAt: new Date(), updatedAt: new Date()},
        { userId: 8, postId: 2 , createdAt: new Date(), updatedAt: new Date()},
        { userId: 9, postId: 2 , createdAt: new Date(), updatedAt: new Date()},
        { userId: 10, postId: 2 , createdAt: new Date(), updatedAt: new Date()},
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
