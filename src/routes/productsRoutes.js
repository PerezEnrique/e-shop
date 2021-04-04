const router = require("express").Router();
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const {
	getProducts,
	createProduct,
	updateProduct,
	getSingleProduct,
	deleteProduct,
} = require("../controllers/productsController");

router.get("/", getProducts);
router.post("/", [auth, admin], createProduct);
router.put("/:id/update", updateProduct);
router.delete("/:id/delete", [auth, admin], deleteProduct);
router.get("/:id", getSingleProduct);

module.exports = router;
