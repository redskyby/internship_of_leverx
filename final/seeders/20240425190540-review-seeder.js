'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
        'review',
        [
          { review: 1, vinylId: 1, userId: 1, createdAt: new Date(), updatedAt: new Date() },
          { review: 2, vinylId: 2, userId: 2, createdAt: new Date(), updatedAt: new Date() },
          { review: 3, vinylId: 3, userId: 3, createdAt: new Date(), updatedAt: new Date() },
          { review: 4, vinylId: 4, userId: 4, createdAt: new Date(), updatedAt: new Date() },
          { review: 5, vinylId: 5, userId: 5, createdAt: new Date(), updatedAt: new Date() },
          { review: 6, vinylId: 6, userId: 6, createdAt: new Date(), updatedAt: new Date() },
          { review: 7, vinylId: 7, userId: 7, createdAt: new Date(), updatedAt: new Date() },
          { review: 8, vinylId: 8, userId: 8, createdAt: new Date(), updatedAt: new Date() },
          { review: 9, vinylId: 9, userId: 9, createdAt: new Date(), updatedAt: new Date() },
          { review: 10, vinylId: 10, userId: 10, createdAt: new Date(), updatedAt: new Date() },
          { review: 1, vinylId: 11, userId: 1, createdAt: new Date(), updatedAt: new Date() },
          { review: 2, vinylId: 12, userId: 2, createdAt: new Date(), updatedAt: new Date() },
          { review: 3, vinylId: 13, userId: 3, createdAt: new Date(), updatedAt: new Date() },
          { review: 4, vinylId: 14, userId: 4, createdAt: new Date(), updatedAt: new Date() },
          { review: 5, vinylId: 15, userId: 5, createdAt: new Date(), updatedAt: new Date() },
          { review: 6, vinylId: 16, userId: 6, createdAt: new Date(), updatedAt: new Date() },
          { review: 7, vinylId: 17, userId: 7, createdAt: new Date(), updatedAt: new Date() },
          { review: 8, vinylId: 18, userId: 8, createdAt: new Date(), updatedAt: new Date() },
          { review: 9, vinylId: 19, userId: 9, createdAt: new Date(), updatedAt: new Date() },
          { review: 10, vinylId: 20, userId: 10, createdAt: new Date(), updatedAt: new Date() },
          { review: 1, vinylId: 21, userId: 1, createdAt: new Date(), updatedAt: new Date() },
          { review: 2, vinylId: 22, userId: 2, createdAt: new Date(), updatedAt: new Date() },
          { review: 3, vinylId: 23, userId: 3, createdAt: new Date(), updatedAt: new Date() },
          { review: 4, vinylId: 24, userId: 4, createdAt: new Date(), updatedAt: new Date() },
          { review: 5, vinylId: 25, userId: 5, createdAt: new Date(), updatedAt: new Date() },
          { review: 6, vinylId: 26, userId: 6, createdAt: new Date(), updatedAt: new Date() },
          { review: 7, vinylId: 27, userId: 7, createdAt: new Date(), updatedAt: new Date() },
          { review: 8, vinylId: 28, userId: 8, createdAt: new Date(), updatedAt: new Date() },
          { review: 9, vinylId: 29, userId: 9, createdAt: new Date(), updatedAt: new Date() },
          { review: 10, vinylId: 30, userId: 10, createdAt: new Date(), updatedAt: new Date() },
          { review: 1, vinylId: 31, userId: 1, createdAt: new Date(), updatedAt: new Date() },
          { review: 2, vinylId: 32, userId: 2, createdAt: new Date(), updatedAt: new Date() },
          { review: 3, vinylId: 33, userId: 3, createdAt: new Date(), updatedAt: new Date() },
          { review: 4, vinylId: 34, userId: 4, createdAt: new Date(), updatedAt: new Date() },
          { review: 5, vinylId: 35, userId: 5, createdAt: new Date(), updatedAt: new Date() },
          { review: 6, vinylId: 36, userId: 6, createdAt: new Date(), updatedAt: new Date() },
          { review: 7, vinylId: 37, userId: 7, createdAt: new Date(), updatedAt: new Date() },
          { review: 8, vinylId: 38, userId: 8, createdAt: new Date(), updatedAt: new Date() },
          { review: 9, vinylId: 39, userId: 9, createdAt: new Date(), updatedAt: new Date() },
          { review: 10, vinylId: 40, userId: 10, createdAt: new Date(), updatedAt: new Date() },
          { review: 1, vinylId: 41, userId: 1, createdAt: new Date(), updatedAt: new Date() },
          { review: 2, vinylId: 42, userId: 2, createdAt: new Date(), updatedAt: new Date() },
          { review: 3, vinylId: 43, userId: 3, createdAt: new Date(), updatedAt: new Date() },
          { review: 4, vinylId: 44, userId: 4, createdAt: new Date(), updatedAt: new Date() },
          { review: 5, vinylId: 45, userId: 5, createdAt: new Date(), updatedAt: new Date() },
          { review: 7, vinylId: 5, userId: 3, createdAt: new Date(), updatedAt: new Date() },
          { review: 8, vinylId: 2, userId: 7, createdAt: new Date(), updatedAt: new Date() },
          { review: 9, vinylId: 12, userId: 5, createdAt: new Date(), updatedAt: new Date() },
          { review: 3, vinylId: 45, userId: 10, createdAt: new Date(), updatedAt: new Date() },
          { review: 2, vinylId: 21, userId: 6, createdAt: new Date(), updatedAt: new Date() },
          { review: 6, vinylId: 8, userId: 4, createdAt: new Date(), updatedAt: new Date() },
          { review: 4, vinylId: 35, userId: 8, createdAt: new Date(), updatedAt: new Date() },
          { review: 10, vinylId: 14, userId: 9, createdAt: new Date(), updatedAt: new Date() },
          { review: 1, vinylId: 27, userId: 1, createdAt: new Date(), updatedAt: new Date() },
          { review: 5, vinylId: 18, userId: 2, createdAt: new Date(), updatedAt: new Date() },
        ],
        {}
    );
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
