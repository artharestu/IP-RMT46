'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Profiles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING,
        defaultValue: '-'
      },
      lastName: {
        type: Sequelize.STRING,
        defaultValue: '-'
      },
      profilePicture: {
        type: Sequelize.STRING,
        defaultValue: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
      },
      bio: {
        type: Sequelize.STRING,
        defaultValue: '-'
      },
      dateOfBirth: {
        type: Sequelize.DATE,
        defaultValue: new Date()
      },
      phoneNumber: {
        type: Sequelize.STRING,
        defaultValue: '-'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Profiles');
  }
};