'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Courses', 'videoThumbnail', {
      type: Sequelize.STRING
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Courses', 'videoThumbnail')
  }
};
