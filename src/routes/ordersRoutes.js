const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
	createOrder,
	getOrder,
	updateOrderToPaid,
} = require("../controllers/ordersController");

router.post("/", auth, createOrder);
router.get("/:id", auth, getOrder);
router.put("/:id/pay", auth, updateOrderToPaid);

module.exports = router;
