'use strict';

module.exports = (sequelize, DataTypes) => {
  const Books = sequelize.define('Books', {
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Please provide a title'
        }
      }
    },
    author: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Please provide an author'
        }
      }
    },
    genre: DataTypes.STRING,
    year: DataTypes.INTEGER
  }, {});

  // Books.associate = function(models) {
  //   // associations can be defined here
  // };
  return Books;
};