/* eslint-disable import/no-extraneous-dependencies */
const request = require('supertest-session');
const app = require('../../src/app.js');
const { Temperament, conn } = require('../../src/db.js');
const populateTemperament = require('../../utils/populateTemperaments');

const server = request(app);

describe('Temperaments routes', () => {
  beforeAll(async () => {
    try {
      await conn.authenticate();
      await Temperament.sync({ force: true });
      await populateTemperament();
    } catch (e) { console.error('Unable to connect to the database:', err); }
  });

  describe('GET /temperaments', () => {
    it("GET /temperaments should respond with all the temperaments available and its ids", async () => {
      const res = await server.get('/api/temperaments');
      expect(res.statusCode).toBe(200);
      expect(res.body[0]).toHaveProperty('id');
      expect(res.body[0]).toHaveProperty('name');
    });
  });
});
