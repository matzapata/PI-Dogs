const { Dog, Temperament, conn } = require('../../src/db.js');

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
          height_min: 1, 
          height_max: 2, 
          weight_min: 1, 
          weight_max: 2, 
          lifespan_min: 1, 
          lifespan_max: 2, 
          image: "image"
        });
        expect(dog).not.toBe(null);
      });

      it ("Should work with temperament relationship", async () => {
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
        await dog.addTemperament(temperament)

        const dogs = await Dog.findOne({
          where: {
            name: "name"
          },
          include: Temperament
        })
        
        expect(dogs.temperaments.length).toBe(1);
      })
    });
  });
});
