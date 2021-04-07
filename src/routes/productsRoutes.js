const router = require("express").Router();
const upload = require("../config/multer");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const {
	getProducts,
	createProduct,
	updateProduct,
	getProduct,
	deleteProduct,
} = require("../controllers/productsController");

router.delete("/:id", [auth, admin], deleteProduct);
router.put("/:id", [auth, admin, upload.single("image")], updateProduct);
router.get("/:id", getProduct);
router.post("/", [auth, admin, upload.single("image")], createProduct);
router.get("/", getProducts);

module.exports = router;
