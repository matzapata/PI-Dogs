/* eslint-disable import/no-extraneous-dependencies */
const request = require('supertest-session');
const app = require('../../src/app.js');
const { Dog, Temperament, conn } = require('../../src/db.js');

const server = request(app);

describe('Dog routes', () => {
  beforeAll(async () => {
    try { conn.authenticate(); }
    catch (err) { console.error('Unable to connect to the database:', err); }
  });


  describe('GET /dogs', () => {

    it('GET /dogs Should return dogApi info if no dog has been created already', async () => {
      const res = await server.get('/api/dogs');
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBeGreaterThanOrEqual(1);
      expect(res.body[0]).toHaveProperty('id');
      expect(res.body[0]).toHaveProperty('name');
      expect(res.body[0]).toHaveProperty('weight');
      expect(res.body[0]).toHaveProperty('temperament');
    });

    it('GET /dogs Should return user created breeds if any and dogApi info (Requires POST /dogs route working)', async () => {
      const postDog = await server
        .post('/api/dogs')
        .send({
          name: "name",
          height_min: 1,
          height_max: 2,
          weight_min: 1,
          weight_max: 2,
          lifespan_min: 1,
          lifespan_max: 2,
          image: "image",
          temperamentIds: [1, 2, 3]
        });
      const getDogs = await server.get('/api/dogs');
      const found = getDogs.body.findIndex((d) => d.id === postDog.body.id);
      
      expect(found).not.toBe(-1);
    });

    it("GET /dogs?name=air Should return all dogs with 'air' in their name (dogApi Only)", async () => {
      const res = await server.get('/api/dogs?name=air');
      
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveLength(6);
    });

    it("GET /dogs?name=air Should return all dogs with 'air' in their name including user created ones (Requires POST /dogs and GET /posts routes working)", async () => {
      const postDog = await server
        .post('/api/dogs')
        .send({
          name: "nameairname",
          height_min: 1,
          height_max: 2,
          weight_min: 1,
          weight_max: 2,
          lifespan_min: 1,
          lifespan_max: 2,
          image: "image",
          temperamentIds: [1, 2, 3]
        });
      const getDogs = await server.get('/api/dogs');
      const found = getDogs.body.findIndex((d) => d.id === postDog.body.id);
      
      expect(found).not.toBe(-1);
    });

    it("GET /dog?name=notfound should respond with status 404 if couldn't find ay match", async () => {
      const res = await server.get('/api/dogs?name=notfound');
      
      expect(res.statusCode).toBe(404);
    });
  });

  describe("GET /dogs/:breedId", () => {

    it("GET /dogs/:breedId should return 404 if not found", async () => {
      const res = await server.get('/api/dogs/notfound');
      
      expect(res.statusCode).toBe(404);
    });

    it("GET /dogs/:breedId (source dogApi) should respond with status 200 and only name, temperaments, image, height, weight and lifespan attributes", async () => {
      const res = await server.get('/api/dogs/5');

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('id');
      expect(res.body).toHaveProperty('name');
      expect(res.body).toHaveProperty('temperament');
      expect(res.body).toHaveProperty('image');
      expect(res.body).toHaveProperty('height');
      expect(res.body).toHaveProperty('weight');
      expect(res.body).toHaveProperty('lifespan');
      expect(Object.keys(res.body)).toHaveLength(7);
    });

    it("GET /dogs/:breedId (source user db) should respond with status 200 and only temperaments, image, name, height, weight and lifespan attributes", async () => {
      const dog = await Dog.create({
        name: "name",
        height_min: 1,
        height_max: 2,
        weight_min: 1,
        weight_max: 2,
        lifespan_min: 1,
        lifespan_max: 2,
        image: "image"
      });
      const temperament = await Temperament.findByPk(1);
      await dog.addTemperament(temperament);

      const res = await server.get(`/api/dogs/${dog.id}`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('id');
      expect(res.body).toHaveProperty('name');
      expect(res.body).toHaveProperty('temperament');
      expect(res.body).toHaveProperty('image');
      expect(res.body).toHaveProperty('height');
      expect(res.body).toHaveProperty('weight');
      expect(res.body).toHaveProperty('lifespan');
      expect(Object.keys(res.body)).toHaveLength(7);
    });
  });

  describe("POST /dogs", () => {
    it("POST /dogs should create dog in db", async () => {
      const postDog = await server
        .post('/api/dogs')
        .send({
          name: "name",
          height_min: 1,
          height_max: 2,
          weight_min: 1,
          weight_max: 2,
          lifespan_min: 1,
          lifespan_max: 2,
          image: "image",
          temperamentIds: [1, 2, 3]
        });
      const getDog = await server.get(`/api/dogs/${postDog.body.id}`);
      
      expect(getDog.body.name).toBe("name");
      expect(getDog.body.image).toBe("image");
      expect(getDog.body.weight).toBe("1 - 2");
      expect(getDog.body.height).toBe("1 - 2");
      expect(getDog.body.lifespan).toBe("1 - 2");
      expect(getDog.body.temperament.length).toBe(3);
    });

    it("POST /dogs should respond with status 400 if missing info", async () => {
      const res = await server.post('/api/dogs');
      expect(res.statusCode).toBe(400);
    });
  });
});
