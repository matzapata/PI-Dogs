const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('dog', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    height_max: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
    height_min: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
    weight_max: {
      type: DataTypes.SMALLINT, 
      allowNull: false
    },
    weight_min: {
      type: DataTypes.SMALLINT, 
      allowNull: false
    },
    lifespan_max: {
      type: DataTypes.SMALLINT, 
      allowNull: false,
    },
    lifespan_min: {
      type: DataTypes.SMALLINT, 
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  }, 
  {
    timestamps: false,
  });
};
