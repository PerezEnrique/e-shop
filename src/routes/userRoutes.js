const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const {
	saveUser,
	authenticateUser,
	updateUserProfile,
} = require("../controllers/userController");

router.post("/sign-up", saveUser);
router.post("/log-in", authenticateUser);
router.put("/", auth, updateUserProfile);

module.exports = router;
