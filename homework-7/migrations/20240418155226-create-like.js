'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('like', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id',
        }},
      postId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'post',
          key: 'id',
        }},
      createdAt: {
        type : Sequelize.DataTypes.DATE,
        defaultValue : new Date(),
        allowNull: false,
      },
      updatedAt: {
        type : Sequelize.DataTypes.DATE,
        defaultValue : new Date(),
        allowNull: false,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('like');
  }
};