'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
        'vinyl', // Название таблицы
        [
          {
            name: 'Abbey Road',
            price: 25,
            author: 'The Beatles',
            description: 'A classic album by The Beatles.',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: 'The Dark Side of the Moon',
            price: 30,
            author: 'Pink Floyd',
            description: 'An iconic album by Pink Floyd.',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: 'Thriller',
            price: 35,
            author: 'Michael Jackson',
            description: 'The best-selling album of all time.',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: 'Back in Black1',
            price: 28,
            author: 'AC/DC',
            description: 'A high-energy rock album.',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: 'Hotel California',
            price: 27,
            author: 'The Eagles',
            description: 'A timeless album by The Eagles.',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
            {
                name: "The Wall",
                price: 35,
                author: "Pink Floyd",
                description: "A rock opera by Pink Floyd.",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Abbey Road1",
                price: 28,
                author: "The Beatles",
                description: "A classic album by The Beatles.",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Rumours",
                price: 25,
                author: "Fleetwood Mac",
                description: "One of the best-selling albums of all time.",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Back in Black",
                price: 27,
                author: "AC/DC",
                description: "A rock classic by AC/DC.",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Hotel California",
                price: 29,
                author: "Eagles",
                description: "A legendary album by Eagles.",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "The Joshua Tree",
                price: 26,
                author: "U2",
                description: "An iconic album by U2.",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Led Zeppelin IV",
                price: 30,
                author: "Led Zeppelin",
                description: "A timeless album by Led Zeppelin.",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Thriller",
                price: 32,
                author: "Michael Jackson",
                description: "The best-selling album of all time.",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Appetite for Destruction",
                price: 27,
                author: "Guns N' Roses",
                description: "A debut album that took the world by storm.",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "The Rise and Fall of Ziggy Stardust",
                price: 25,
                author: "David Bowie",
                description: "A concept album by David Bowie.",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Dark Side of the Moon",
                price: 30,
                author: "Pink Floyd",
                description: "An iconic album by Pink Floyd.",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Purple Rain",
                price: 33,
                author: "Prince",
                description: "A groundbreaking album by Prince.",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "A Night at the Opera",
                price: 31,
                author: "Queen",
                description: "A classic album by Queen.",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "1989",
                price: 30,
                author: "Taylor Swift",
                description: "A pop hit by Taylor Swift.",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Born in the U.S.A.",
                price: 28,
                author: "Bruce Springsteen",
                description: "A patriotic album by Bruce Springsteen.",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "OK Computer",
                price: 29,
                author: "Radiohead",
                description: "A highly acclaimed album by Radiohead.",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Nevermind",
                price: 27,
                author: "Nirvana",
                description: "An iconic grunge album by Nirvana.",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Bat Out of Hell",
                price: 26,
                author: "Meat Loaf",
                description: "A rock opera by Meat Loaf.",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Sticky Fingers",
                price: 31,
                author: "The Rolling Stones",
                description: "A classic album by The Rolling Stones.",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Ten",
                price: 28,
                author: "Pearl Jam",
                description: "A powerful grunge album by Pearl Jam.",
                createdAt: new Date(),
                updatedAt: new Date(),
            }
                ,{
            name: "The Wall",
            price: 35,
            author: "Pink Floyd",
            description: "A rock opera by Pink Floyd.",
            createdAt: new Date(),
            updatedAt: new Date(),
        },
            {
                name: "Abbey Road",
                price: 28,
                author: "The Beatles",
                description: "A classic album by The Beatles.",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Rumours",
                price: 25,
                author: "Fleetwood Mac",
                description: "One of the best-selling albums of all time.",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Back in Black",
                price: 27,
                author: "AC/DC",
                description: "A rock classic by AC/DC.",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Hotel California",
                price: 29,
                author: "Eagles",
                description: "A legendary album by Eagles.",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "The Joshua Tree",
                price: 26,
                author: "U2",
                description: "An iconic album by U2.",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Led Zeppelin IV",
                price: 30,
                author: "Led Zeppelin",
                description: "A timeless album by Led Zeppelin.",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Thriller",
                price: 32,
                author: "Michael Jackson",
                description: "The best-selling album of all time.",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Appetite for Destruction",
                price: 27,
                author: "Guns N' Roses",
                description: "A debut album that took the world by storm.",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "The Rise and Fall of Ziggy Stardust",
                price: 25,
                author: "David Bowie",
                description: "A concept album by David Bowie.",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Dark Side of the Moon",
                price: 30,
                author: "Pink Floyd",
                description: "An iconic album by Pink Floyd.",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Purple Rain",
                price: 33,
                author: "Prince",
                description: "A groundbreaking album by Prince.",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "A Night at the Opera",
                price: 31,
                author: "Queen",
                description: "A classic album by Queen.",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "1989",
                price: 30,
                author: "Taylor Swift",
                description: "A pop hit by Taylor Swift.",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Born in the U.S.A.",
                price: 28,
                author: "Bruce Springsteen",
                description: "A patriotic album by Bruce Springsteen.",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "OK Computer",
                price: 29,
                author: "Radiohead",
                description: "A highly acclaimed album by Radiohead.",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Nevermind",
                price: 27,
                author: "Nirvana",
                description: "An iconic grunge album by Nirvana.",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Bat Out of Hell",
                price: 26,
                author: "Meat Loaf",
                description: "A rock opera by Meat Loaf.",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Sticky Fingers",
                price: 31,
                author: "The Rolling Stones",
                description: "A classic album by The Rolling Stones.",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Ten",
                price: 28,
                author: "Pearl Jam",
                description: "A powerful grunge album by Pearl Jam.",
                createdAt: new Date(),
                updatedAt: new Date(),
            }
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
