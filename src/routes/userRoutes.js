const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const {
	saveUser,
	authenticateUser,
	getUserProfile,
} = require("../controllers/userController");

router.get("/", auth, getUserProfile);
router.post("/sign-up", saveUser);
router.post("/log-in", authenticateUser);

module.exports = router;
