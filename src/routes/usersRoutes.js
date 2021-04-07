const router = require("express").Router();
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const {
	createUser,
	authenticateUser,
	updateUserProfile,
	getUsers,
	getUser,
	editAdminStatus,
} = require("../controllers/userController");

router.put("/:id/edit-status", [auth, admin], editAdminStatus);
router.post("/sign-up", createUser);
router.post("/log-in", authenticateUser);
router.get("/:id", [auth, admin], getUser);
router.get("/", [auth, admin], getUsers);
router.put("/", auth, updateUserProfile);

module.exports = router;
