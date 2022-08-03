const { Router } = require('express');
const router = Router();
const { getBreeds, searchBreeds } = require('../../utils/dogApi');
const { Dog, Temperament, Op } = require('../db');
const checkIfValidUUID = require('../../utils/validateUUID');
const { formatDogApi, formatDogDb, formatDogDbDetail, formatDogApiDetail } = require('../../utils/dataFormaters');

router.get('/', async function (req, res) {
    const { name } = req.query;

    let breeds = await Promise.all((name !== undefined) ?
        // Search promises
        [searchBreeds(name), Dog.findAll({ where: { name: { [Op.iLike]: `%${name}%` } }, include: Temperament })]
        :
        // Get all promises
        [getBreeds(), Dog.findAll({ include: Temperament })]
    );
    breeds = [...breeds[0].map(formatDogApi), ...breeds[1].map(formatDogDb)];

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
        breedDetail = (breedDetail) ? formatDogDbDetail(breedDetail.toJSON()) : null;
    } else {
        const breeds = await getBreeds();
        breedDetail = breeds.find((b) => b.id === parseInt(breedId));
        breedDetail = (breedDetail) ? formatDogApiDetail(breedDetail) : null;
    }

    if (breedDetail) res.send(breedDetail);
    else res.status(404).send("Not found");
});

router.post('/', async function (req, res) {
    const { name, height_min, height_max, weight_min, weight_max, lifespan_min, lifespan_max, temperamentIds, image } = req.body;

    try {
        if ([name, height_min, height_max, weight_min, weight_max, lifespan_min, lifespan_max].includes(undefined)) throw new Error("Missing parameters to create dog breed");

        const newBreed = await Dog.create({ name, height_min, height_max, weight_min, weight_max, lifespan_min, lifespan_max, image});
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
