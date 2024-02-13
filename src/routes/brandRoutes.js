const express = require('express');
const brandController = require('../controllers/brandController');

const router = express.Router();

router.post('/', brandController.upload.single('photo'), brandController.createBrand);
router.get('/', brandController.getAllBrand);
router.delete('/:id', brandController.deleteBrand);

module.exports = router;