require('dotenv').config();
const { Sequelize, Op } = require('sequelize');
const pg = require("pg")
const dogModel = require("./models/Dog")
const temperamentModel = require("./models/Temperament")

const sequelize = new Sequelize(process.env.DB_URI, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  dialectModule: pg
});

dogModel(sequelize);
temperamentModel(sequelize);

// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Dog, Temperament } = sequelize.models;

// Aca vendrian las relaciones
Dog.belongsToMany(Temperament, { through: 'dog-temperaments' })
Temperament.belongsToMany(Dog, { through: 'dog-temperaments' })

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
  Op,
};
