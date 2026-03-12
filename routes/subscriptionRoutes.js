const express = require("express");
const router = express.Router();
const subscriptionController = require("../controllers/subscriptionController");
const { checkAdmin } = require("../middleware/authMiddleware");

router.post("/", checkAdmin, subscriptionController.createPlan);
router.get("/", checkAdmin, subscriptionController.getPlans);
router.put("/:id", checkAdmin, subscriptionController.updatePlan);
router.delete("/:id", checkAdmin, subscriptionController.deletePlan);

module.exports = router;