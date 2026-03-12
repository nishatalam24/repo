const express = require("express");
const router = express.Router();
const flatController = require("../controllers/flatController");
const { checkAdmin } = require("../middleware/authMiddleware");

router.post("/", checkAdmin, flatController.createFlat);
router.get("/", flatController.getFlats);
router.put("/:id", checkAdmin, flatController.updateFlat);
router.delete("/:id", checkAdmin, flatController.deleteFlat);

module.exports = router;

