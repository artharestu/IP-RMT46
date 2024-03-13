'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const courses = require('../data/courses.json')
    courses.forEach(course => {
      course.createdAt = new Date();
      course.updatedAt = new Date();
    })
    await queryInterface.bulkInsert('Courses', courses, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Courses', null, {})
  }
};
