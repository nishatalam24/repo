const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { checkAdmin } = require("../middleware/authMiddleware");

router.post("/", checkAdmin, userController.createUser);
router.get("/", checkAdmin, userController.getUsers);
router.get("/:id", checkAdmin, userController.getUserById);
router.put("/:id", checkAdmin, userController.updateUser);
router.delete("/:id", checkAdmin, userController.deleteUser);

module.exports = router;