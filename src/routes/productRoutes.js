const express = require("express");
const productController = require("../controllers/productController");

const router = express.Router();

router.post("/", productController.upload.array("photo"), productController.createProduct);
router.get("/", productController.getAllProduct);
router.delete("/:id", productController.deleteProduct);
router.get('/:id', productController.getProductById);
router.put('/:id', productController.updateProduct);

module.exports = router;

