const router = require("express").Router();
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const {
	createOrder,
	getOrder,
	getOrders,
	getUserOrders,
	updateOrderToPaid,
	markOrderAsDelivered,
} = require("../controllers/ordersController");

router.get("/my-orders", auth, getUserOrders);
router.put("/:id/mark-delivered", [auth, admin], markOrderAsDelivered);
router.put("/:id/pay", auth, updateOrderToPaid);
router.get("/:id", auth, getOrder);
router.post("/", auth, createOrder);
router.get("/", [auth, admin], getOrders);

module.exports = router;
