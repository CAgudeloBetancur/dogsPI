const {DataTypes} = require('sequelize');
const { Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    'Breed',
    {
      id: {
        //type: DataTypes.INTEGER,
        // autoIncrement: true,
        // primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      height: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      weight: {
        type: DataTypes.STRING,
        allowNull: false
      },
      age: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    { timestamps: false }
  )
} 