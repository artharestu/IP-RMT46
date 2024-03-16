'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    static associate(models) {
      Profile.belongsTo(models.User, {
        foreignKey: 'UserId'
      })
    }
  }
  Profile.init({
    firstName: {
      type: DataTypes.STRING,
      defaultValue: '-'
    },
    lastName: {
      type: DataTypes.STRING,
      defaultValue: '-'
    },
    profilePicture: {
      type: DataTypes.STRING,
      defaultValue: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
    },
    bio: {
      type: DataTypes.STRING,
      defaultValue: '-'
    },
    dateOfBirth: {
      type: DataTypes.DATE,
      defaultValue: new Date(),
      validate: {
        isDate: {
          args: true,
          msg: 'Invalid date format'
        }
      }
    },
    phoneNumber: {
      type: DataTypes.STRING,
      defaultValue: '-'
    },
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    }
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};