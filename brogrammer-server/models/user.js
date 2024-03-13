'use strict';
const {
  Model
} = require('sequelize');
const { hash } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Profile, { foreignKey: 'UserId', as: 'profiles' })
      User.hasMany(models.Course, { foreignKey: 'AuthorId', as: 'courses' })
      User.hasMany(models.Subscriber, { foreignKey: 'UserId', as: 'subscribers' })
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Email is required'
        },
        notNull: {
          args: true,
          msg: 'Email is required'
        },
        isEmail: {
          args: true,
          msg: 'Email is not valid'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Password is required'
        },
        notNull: {
          args: true,
          msg: 'Password is required'
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'member',
      validate: {
        notEmpty: {
          args: true,
          msg: 'Role is required'
        },
        notNull: {
          args: true,
          msg: 'Role is required'
        }
      }
    },
    authType: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'local',
      validate: {
        notEmpty: {
          args: true,
          msg: 'Auth type is required'
        },
        notNull: {
          args: true,
          msg: 'Auth type is required'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (user) => {
        user.password = hash(user.password)
      }
    }
  });
  return User;
};