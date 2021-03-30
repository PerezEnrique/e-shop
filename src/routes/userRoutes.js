const router = require("express").Router();
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const {
	createUser,
	authenticateUser,
	updateUserProfile,
	getAllUsers,
} = require("../controllers/userController");

router.get("/admin/get-users", [auth, admin], getAllUsers);
router.post("/sign-up", createUser);
router.post("/log-in", authenticateUser);
router.put("/", auth, updateUserProfile);

module.exports = router;
