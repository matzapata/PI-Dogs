const { Router } = require('express');
const router = Router();
const { Temperament } = require('../db')

router.get('/', async function (req, res) {
    const temperaments = await Temperament.findAll()
    res.send(temperaments);
});

module.exports = router;
