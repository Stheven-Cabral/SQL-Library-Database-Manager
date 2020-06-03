'use strict';

module.exports = (sequelize, DataTypes) => {
  const Books = sequelize.define('Books', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please provide a book title'
        }
      }
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please provide a book author'
        }
      }
    },
    genre: {
      type: DataTypes.STRING
    },
    year: {
      type: DataTypes.INTEGER
    }
  }, {});

  return Books;
};