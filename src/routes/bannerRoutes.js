const express = require('express');
const bannerController = require('../controllers/bannerController');

const router = express.Router();

router.post('/', bannerController.upload.single('photo'), bannerController.createBanner);
router.get('/', bannerController.getAllBanner);
router.delete('/:id', bannerController.deleteBanner);

module.exports = router;