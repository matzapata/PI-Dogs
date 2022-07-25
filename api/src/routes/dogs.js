const { Router } = require('express');
const router = Router();
const { getBreeds, searchBreeds } = require('../../utils/dogApi');
const { Dog, Temperament, Op } = require('../db');
const checkIfValidUUID = require('../../utils/validateUUID');

router.get('/', async function (req, res) {
    const { name } = req.query;

    const searchPromises = [searchBreeds(name), Dog.findAll({ where: { name: { [Op.like]: `%${name}%` } }, include: Temperament })];
    const getPromises = [getBreeds(), Dog.findAll({ include: Temperament })];
    let breeds = await Promise.all((name) ? searchPromises : getPromises);
    breeds = [...breeds[0], ...breeds[1]];

    breeds = breeds.map(b => {
        return {
            id: b.id,
            name: b.name,
            image: (b.image?.url) ? b.image?.url : "",
            weight: (b.weight.metric) ? b.weight.metric : b.weight,
            temperament: (b.temperaments === undefined) ? b.temperament?.replace(/\s/g, '').split(',') : b.temperaments.map(t => t.name),
        };
    });

    if (breeds.length === 0) res.status(404).send("Not found");
    else res.send(breeds);
});

router.get('/:breedId', async function (req, res) {
    const { breedId } = req.params;
    let breedDetail = undefined;

    if (checkIfValidUUID(breedId)) {
        breedDetail = await Dog.findOne({
            where: { id: breedId },
            include: Temperament
        });
        breedDetail = (breedDetail) ? breedDetail.toJSON() : null;
    } else {
        const breeds = await getBreeds();
        breedDetail = breeds.find((b) => b.id === parseInt(breedId));
    }

    if (breedDetail) {
        let b = breedDetail
        breedDetail = {
            id: b.id,
            name: b.name,
            image: (b.image?.url) ? b.image?.url : "",
            weight: (b.weight.metric) ? b.weight.metric : b.weight,
            temperament: (b.temperaments === undefined) ? b.temperament : b.temperaments.map(t => t.name).join(', '),
            lifespan: (b.lifespan) ? b.lifespan : b.life_span,
            height: (b.height.metric === undefined) ? b.height : b.height.metric
        };
        res.send(breedDetail);
    }
    else res.status(404).send("Not found");
});

router.post('/', async function (req, res) {
    const { name, height, weight, lifespan, temperamentIds } = req.body;

    try {
        if ([name, height, weight, lifespan].includes(undefined)) throw new Error("Missing parameters to create dog breed");

        const newBreed = await Dog.create({ name, height, weight, lifespan });
        if (Array.isArray(temperamentIds)) {
            temperamentIds.forEach(async (tId) => {
                const temperament = await Temperament.findByPk(tId);
                if (temperament) await newBreed.addTemperament(temperament);
            });
        }

        res.status(200).send(newBreed);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

module.exports = router;
