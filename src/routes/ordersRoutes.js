const router = require("express").Router();
const auth = require("../middlewares/auth");
const { saveNewOrder } = require("../controllers/ordersController");

router.post("/", saveNewOrder);

module.exports = router;
