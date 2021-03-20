const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
	createUser,
	authenticateUser,
	updateUserProfile,
} = require("../controllers/userController");

router.post("/sign-up", createUser);
router.post("/log-in", authenticateUser);
router.put("/", auth, updateUserProfile);

module.exports = router;
