'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('post', [
      {title: 'Post 1', description: 'Description 1', userId: 1, createdAt: new Date(), updatedAt: new Date()},
      {title: 'Post 2', description: 'Description 2', userId: 2, createdAt: new Date(), updatedAt: new Date()},
      {title: 'Post 3', description: 'Description 3', userId: 3, createdAt: new Date(), updatedAt: new Date()},
      {title: 'Post 4', description: 'Description 4', userId: 4, createdAt: new Date(), updatedAt: new Date()},
      {title: 'Post 5', description: 'Description 5', userId: 6, createdAt: new Date(), updatedAt: new Date()},
      {title: 'Post 6', description: 'Description 5', userId: 9, createdAt: new Date(), updatedAt: new Date()},
      {title: 'Post 7', description: 'Description 5', userId: 5, createdAt: new Date(), updatedAt: new Date()},
      {title: 'Post 8', description: 'Description 5', userId: 7, createdAt: new Date(), updatedAt: new Date()},
      {title: 'Post 9', description: 'Description 5', userId: 5, createdAt: new Date(), updatedAt: new Date()},
      {        title: 'Post 10',        description: 'Description 5',        userId: 8,        createdAt: new Date(),        updatedAt: new Date()      },], {});

  },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    }
};
