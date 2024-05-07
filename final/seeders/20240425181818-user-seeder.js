'use strict';
const bcrypt = require('bcryptjs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('user',
        [
          {
            name: 'Alice',
            lastName: 'Johnson',
            email: 'alice.johnson@example.com',
            password: await bcrypt.hash('password123', 3),
            birthdate: new Date('1990-01-15'),
            avatar: 'https://example.com/avatars/alice.jpg',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: 'Bob',
            lastName: 'Smith',
            email: 'bob.smith@example.com',
            password: await bcrypt.hash('securepassword', 3),
            birthdate: new Date('1988-03-22'),
            avatar: 'https://example.com/avatars/bob.jpg',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: 'Charlie',
            lastName: 'Brown',
            email: 'charlie.brown@example.com',
            password: await bcrypt.hash('mysecretpass', 3),
            birthdate: new Date('1985-06-30'),
            avatar: 'https://example.com/avatars/charlie.jpg',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: 'David',
            lastName: 'Williams',
            email: 'david.williams@example.com',
            password: await bcrypt.hash('supersecret', 3),
            birthdate: new Date('1982-11-11'),
            avatar: 'https://example.com/avatars/david.jpg',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: 'Eve',
            lastName: 'Davis',
            email: 'eve.davis@example.com',
            password: await bcrypt.hash('mypassword', 3),
            birthdate: new Date('1992-04-05'),
            avatar: 'https://example.com/avatars/eve.jpg',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: 'Frank',
            lastName: 'Jones',
            email: 'frank.jones@example.com',
            password: await bcrypt.hash('easy123', 3),
            birthdate: new Date('1989-08-23'),
            avatar: 'https://example.com/avatars/frank.jpg',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: 'Grace',
            lastName: 'Miller',
            email: 'grace.miller@example.com',
            password: await bcrypt.hash('hiddenpass', 3),
            birthdate: new Date('1991-07-12'),
            avatar: 'https://example.com/avatars/grace.jpg',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: 'Henry',
            lastName: 'Anderson',
            email: 'henry.anderson@example.com',
            password: await bcrypt.hash('12345678', 3),
            birthdate: new Date('1993-02-28'),
            avatar: 'https://example.com/avatars/henry.jpg',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: 'Isabelle',
            lastName: 'Wilson',
            email: 'isabelle.wilson@example.com',
            password: await bcrypt.hash('789456', 3),
            birthdate: new Date('1994-05-15'),
            avatar: 'https://example.com/avatars/isabelle.jpg',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: 'Jacob',
            lastName: 'Taylor',
            email: 'jacob.taylor@example.com',
            password: await bcrypt.hash('password99', 3),
            birthdate: new Date('1986-12-19'),
            avatar: 'https://example.com/avatars/jacob.jpg',
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
