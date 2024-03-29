const { conn } = require('../src/db.js');

console.log("Remember to update .env DB_URI to match the DB that you want to synchronize")

conn.sync({ force: true }).then(async () => {
    await require('./populateTemperaments')(); // Populate temperaments db
    console.log("DB synced")
})