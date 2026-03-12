const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");
const { checkAdmin } = require("../middleware/authMiddleware");

router.post("/", paymentController.createPayment); // user payment
router.get("/", checkAdmin, paymentController.getPayments); // admin view
router.get("/:flatId", paymentController.getPaymentsByFlat);

module.exports = router;