const Product = require("../models/Product");

async function getProducts(req, res) {
	const products = await Product.find({});
	return res.status(200).json({ success: true, data: products });
}

async function getSingleProduct(req, res) {
	const product = await Product.findById(req.params.id);
	if (!product) {
		return res
			.status(404)
			.json({
				success: false,
				errorMessage: "Couldn't find product with the provided id",
			});
	}
	return res.status(200).json({ success: true, data: product });
}

module.exports = { getProducts, getSingleProduct };
