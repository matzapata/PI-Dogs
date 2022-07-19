const { getBreeds } = require('./dogApi');
const { Temperament } = require('../src/db');

async function populateTemperament() {
    const temperaments = new Set();

    const breeds = await getBreeds();

    // Extraemos los temperamentos de los atributos del las razas.
    breeds.forEach(breed => {
        if (breed.temperament !== undefined) {
            const temperament = breed.temperament.replace(/\s/g, '');;
            temperament.split(',').forEach(t => temperaments.add(t));
        }
    });

    const tempsObjs = [];
    temperaments.forEach(t => tempsObjs.push({ name: t }));
    await Temperament.bulkCreate(tempsObjs)
}

module.exports = populateTemperament
