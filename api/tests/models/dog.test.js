const { Dog, conn } = require('../../src/db.js');

describe('Dog model', () => {
  beforeAll(async () => {
    try { conn.authenticate(); }
    catch (err) { console.error('Unable to connect to the database:', err); }
  });

  describe('Validators', () => {
    beforeEach(async () => {
      await Dog.sync({ force: true });
    });

    describe('name', () => {
      it('should throw an error if name is null', async () => {
        try {
          await Dog.create({});
        } catch (e) {
          expect(e).not.toBe(null);
          expect(e).not.toBe(undefined);
        }
      });

      it('should work when its a valid name', async () => {
        const dog = await Dog.create({
          name: "name",
          height: "height",
          weight: "weight",
          lifespan: "lifespan"
        });
        expect(dog).not.toBe(null);
      });
    });
  });
});
