'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    static associate(models) {
      Course.belongsTo(models.User, {
        foreignKey: 'AuthorId'
      })
      Course.belongsTo(models.Category, {
        foreignKey: 'CategoryId'
      })
    }
  }
  Course.init({
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
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Description is required'
        },
        notNull: {
          args: true,
          msg: 'Description is required'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Price is required'
        },
        notNull: {
          args: true,
          msg: 'Price is required'
        },
        isNumeric: {
          args: true,
          msg: 'Price must be a number'
        }
      }
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    AuthorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    CategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Categories',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    }
  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};