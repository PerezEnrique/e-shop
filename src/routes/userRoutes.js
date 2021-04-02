const router = require("express").Router();
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const {
	createUser,
	authenticateUser,
	updateUserProfile,
	getAllUsers,
	getASingleUser,
	updateUserAdminStatus,
} = require("../controllers/userController");

router.get("/admin/get-users", [auth, admin], getAllUsers);
// router.get("/admin/:id/get-user", [auth, admin], getASingleUser);
router.put("/admin/:id/update-status", updateUserAdminStatus);
router.post("/sign-up", createUser);
router.post("/log-in", authenticateUser);
router.put("/", [auth, admin], updateUserProfile);

module.exports = router;
