'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const videos = require('../data/videos.json')
    videos.forEach(video => {
      video.createdAt = new Date();
      video.updatedAt = new Date();
    })
    await queryInterface.bulkInsert('Videos', videos, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Videos', null, {})
  }
};
