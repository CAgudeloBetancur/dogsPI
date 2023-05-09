const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'Breed',
    {
      id: {
        type: DataTypes.INTEGER,
        // autoIncrement: true,
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