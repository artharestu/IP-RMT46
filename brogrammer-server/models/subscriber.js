'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Subscriber extends Model {
    static associate(models) {
      Subscriber.belongsTo(models.User, {
        foreignKey: 'UserId',
        as: 'user'
      })
      Subscriber.belongsTo(models.Course, {
        foreignKey: 'CourseId',
        as: 'course'
      })
    }
  }
  Subscriber.init({
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    CourseId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Courses',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'pending'
    }
  }, {
    sequelize,
    modelName: 'Subscriber',
  });
  return Subscriber;
};