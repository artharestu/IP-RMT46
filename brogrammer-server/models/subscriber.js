'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Subscriber extends Model {
    static associate(models) {
      Subscriber.belongsTo(models.User, {
        foreignKey: 'UserId',
      })
      Subscriber.belongsTo(models.Course, {
        foreignKey: 'CourseId',
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
    },
    orderId: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Order ID is required'
        },
        notNull: {
          args: true,
          msg: 'Order ID is required'
        }
      }
    },
    tokenPayment: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Token Payment is required'
        },
        notNull: {
          args: true,
          msg: 'Token Payment is required'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Subscriber',
  });
  return Subscriber;
};