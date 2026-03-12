const express = require("express");
const router = express.Router();
const recordController = require("../controllers/monthlyRecordController");
const { checkAdmin } = require("../middleware/authMiddleware");

router.post("/", checkAdmin, recordController.createRecord);
router.get("/", recordController.getRecords);
router.put("/:id/pay", checkAdmin, recordController.markPaid);

module.exports = router;