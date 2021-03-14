const express = require("express");
const router = express.Router();
const { getProducts, getSingleProduct } = require("../controllers/productsController");

router.get("/", getProducts);
router.get("/:id", getSingleProduct);

module.exports = router;
