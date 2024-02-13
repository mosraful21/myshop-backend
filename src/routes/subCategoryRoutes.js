const express = require('express');
const subCategoryController = require('../controllers/subCategoryController');

const router = express.Router();

router.post('/', subCategoryController.upload.single('photo'), subCategoryController.createSubCategory);
router.get('/', subCategoryController.getAllSubCategory);
router.delete('/:id', subCategoryController.deleteSubCategory);

module.exports = router;
