const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
	createOrder,
	getOrder,
	getUserOrders,
	updateOrderToPaid,
} = require("../controllers/ordersController");

router.post("/", auth, createOrder);
router.get("/my-orders", auth, getUserOrders);
router.put("/:id/pay", auth, updateOrderToPaid);
router.get("/:id", auth, getOrder);

module.exports = router;
