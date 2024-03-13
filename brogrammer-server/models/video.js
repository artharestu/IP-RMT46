'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Video extends Model {
    static associate(models) {
      Video.belongsTo(models.Course, {
        foreignKey: 'CourseId',
        as: 'course'
      })
    }
  }
  Video.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Title is required'
        },
        notNull: {
          args: true,
          msg: 'Title is required'
        }
      }
    },
    urlVideo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Url Video is required'
        },
        notNull: {
          args: true,
          msg: 'Url Video is required'
        }
      }
    },
    part: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Part is required'
        },
        notNull: {
          args: true,
          msg: 'Part is required'
        }
      }
    },
    CourseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Course Id is required'
        },
        notNull: {
          args: true,
          msg: 'Course Id is required'
        }
      },
      references: {
        model: 'Courses',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    }
  }, {
    sequelize,
    modelName: 'Video',
  });
  return Video;
};