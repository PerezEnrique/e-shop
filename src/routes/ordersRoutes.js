const router = require("express").Router();
const auth = require("../middlewares/auth");
const { createOrder, getOrder } = require("../controllers/ordersController");

router.post("/", auth, createOrder);
router.get("/:id", auth, getOrder);

module.exports = router;
