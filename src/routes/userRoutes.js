const router = require("express").Router();
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const {
	createUser,
	authenticateUser,
	updateUserProfile,
	getAllUsers,
	getASingleUser,
	editUserAdminStatus,
} = require("../controllers/userController");

router.get("/admin/get-users", [auth, admin], getAllUsers);
router.put("/admin/:id/edit-status", editUserAdminStatus);
router.post("/sign-up", createUser);
router.post("/log-in", authenticateUser);
router.put("/", [auth, admin], updateUserProfile);

module.exports = router;
