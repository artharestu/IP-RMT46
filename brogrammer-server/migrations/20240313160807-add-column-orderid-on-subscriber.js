'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.addColumn('Subscribers', 'orderId', {
      type: Sequelize.STRING,
      allowNull: false
    })

    queryInterface.addColumn('Subscribers', 'tokenPayment', {
      type: Sequelize.STRING,
      allowNull: false
    })
  },

  async down(queryInterface, Sequelize) {
    queryInterface.removeColumn('Subscribers', 'orderId')
    queryInterface.removeColumn('Subscribers', 'tokenPayment')
  }
};
