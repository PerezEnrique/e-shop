const router = require("express").Router();
const upload = require("../config/multer");
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
router.post("/", [auth, admin, upload.single("image")], createProduct);
router.put("/:id/update", [auth, admin, upload.single("image")], updateProduct);
router.delete("/:id/delete", [auth, admin], deleteProduct);
router.get("/:id", getSingleProduct);

module.exports = router;
