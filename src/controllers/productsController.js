const Product = require("../models/Product");

//route: GET /products
//access: public
//desc: get all products
async function getProducts(req, res) {
	const products = await Product.find({});
	return res.status(200).json({ success: true, data: products });
}

//route: GET /products/:id
//access: public
//desc: get a single products
async function getSingleProduct(req, res) {
	const product = await Product.findById(req.params.id);
	if (!product) {
		return res.status(404).json({
			success: false,
			errorMessage: "Couldn't find product with the provided id",
		});
	}
	return res.status(200).json({ success: true, data: product });
}

//route: DELETE /products/:id
//access: private (and only for admins)
//desc: delete a product
async function deleteProduct(req, res) {
	const product = await Product.findById(req.params.id);
	if (!product) {
		return res.status(404).json({
			success: false,
			errorMessage: "Couldn't find product with the provided id",
		});
	}
	await product.remove();
	return res.status(200).json({ success: true, data: "Product successfully removed" });
}

module.exports = { getProducts, getSingleProduct, deleteProduct };
