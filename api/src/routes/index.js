const { Router } = require('express');
const dogsRouter = require('./dogs');
const temperamentsRouter = require('./temperaments');

const router = Router();

router.use('/dogs', dogsRouter);
router.use('/temperaments', temperamentsRouter);

router.get('*', function (req, res) {
    res.status(400).send("Invalid request");
});

module.exports = router;
