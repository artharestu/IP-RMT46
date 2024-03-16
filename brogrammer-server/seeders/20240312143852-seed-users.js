'use strict';
const { hash } = require('../helpers/bcrypt')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = require('../data/users.json')
    users.forEach(user => {
      user.password = hash(user.password)
      user.createdAt = new Date();
      user.updatedAt = new Date();
    })
    await queryInterface.bulkInsert('Users', users, {})

    const profiles = []
    for (let i = 1; i <= users.length; i++) {
      profiles.push({
        UserId: i,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }
    await queryInterface.bulkInsert('Profiles', profiles, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {})
    await queryInterface.bulkDelete('Profiles', null, {})
  }
};
