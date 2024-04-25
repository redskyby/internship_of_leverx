'use strict';
const bcrypt = require('bcryptjs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('user', [
      {
        name: 'Alice',
        lastName: 'Johnson',
        email: 'alice.johnson@example.com',
        password: await bcrypt.hash('password123', 3),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Bob',
        lastName: 'Smith',
        email: 'bob.smith@example.com',
        password: await bcrypt.hash('securepassword', 3),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Charlie',
        lastName: 'Brown',
        email: 'charlie.brown@example.com',
        password: await bcrypt.hash('mysecretpass', 3),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'David',
        lastName: 'Williams',
        email: 'david.williams@example.com',
        password: await bcrypt.hash('supersecret', 3),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Eve',
        lastName: 'Davis',
        email: 'eve.davis@example.com',
        password: await bcrypt.hash('mypassword', 3),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Frank',
        lastName: 'Jones',
        email: 'frank.jones@example.com',
        password: await bcrypt.hash('easy123', 3),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Grace',
        lastName: 'Miller',
        email: 'grace.miller@example.com',
        password: await bcrypt.hash('hiddenpass', 3),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Henry',
        lastName: 'Anderson',
        email: 'henry.anderson@example.com',
        password: await bcrypt.hash('12345678', 3),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Isabelle',
        lastName: 'Wilson',
        email: 'isabelle.wilson@example.com',
        password: await bcrypt.hash('789456', 3),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Jacob',
        lastName: 'Taylor',
        email: 'jacob.taylor@example.com',
        password: await bcrypt.hash('password99', 3),
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
