const router = require("express").Router();
const { getProducts, getSingleProduct } = require("../controllers/productsController");

router.get("/", getProducts);
router.get("/:id", getSingleProduct);

module.exports = router;
