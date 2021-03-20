const router = require("express").Router();
const auth = require("../middlewares/auth");
const { createOrder } = require("../controllers/ordersController");

router.post("/", createOrder);

module.exports = router;
