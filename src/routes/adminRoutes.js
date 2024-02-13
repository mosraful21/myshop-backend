const express = require("express");
const adminController = require("../controllers/adminController");

const router = express.Router();

router.post('/', adminController.upload.single('photo'), adminController.createAdmin);
router.get("/", adminController.getAllAdmin);
router.get("/:id", adminController.getAdminById);
router.put("/:id", adminController.updateAdmin);
router.delete("/:id", adminController.deleteAdmin);

module.exports = router;
