const express = require('express');
const categoryController = require('../controllers/categoryController');

const router = express.Router();

router.post('/', categoryController.upload.single('photo'), categoryController.createCategory);
router.get('/', categoryController.getAllCategory);
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;
