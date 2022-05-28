const express = require('express');
const catchController = require("../controllers/catchController");

const router = express.Router();

router.get('/', catchController.getCatches);
router.get('/:id', catchController.getCatch);
router.post('/', catchController.createCatch);
router.put('/:id', catchController.updateCatch);
router.delete('/:id', catchController.deleteCatch);

module.exports = router;