const server = require('./src/app.js');
const routes = require('./src/routes')
const { conn } = require('./src/db.js');
require('dotenv').config();

const port = process.env.PORT || 3001;

// Syncing all the models at once.
conn.sync({ force: true }).then(async () => {
  await require('./utils/populateTemperaments')(); // Populate temperaments db
  server.use('/api', routes);
  server.listen(port, () => { console.log(`listening at ${port}`); });
});
