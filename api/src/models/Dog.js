const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height: {
      type: DataTypes.STRING, // String para usar un rango. EJ: "1 - 5"
      allowNull: false,
    },
    weight: {
      type: DataTypes.STRING, // String para usar un rango. EJ: "1 - 5"
      allowNull: false
    },
    lifespan: {
      type: DataTypes.STRING, // String para usar un rango. EJ: "12 - 16 years" 
      allowNull: false,
    }
  }, 
  {
    timestamps: false,
  });
};
