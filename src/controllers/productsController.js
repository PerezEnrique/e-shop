const Product = require("../models/Product");
const { validateProductData } = require("../utils/validation");

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

//route: POST /products
//access: private (and only for admins)
//desc: creates a new product
async function createProduct(req, res) {
	const { name, brand, image, price, description, countInStock } = req.body;

	const validationError = validateProductData(req.body);
	if (validationError)
		return res.status(400).json({ success: false, errorMessage: validationError });

	const newProduct = new Product({
		name,
		user: req.user._id,
		brand,
		price,
		description,
		countInStock,
	});

	newProduct.image = newProduct.setImgUrl(req.file.filename);
	const createdProduct = await newProduct.save();
	return res.status(201).json({ success: true, data: createdProduct });
}

//route: PUT /products/:id/update
//access: private (and only for admins)
//desc: updates a product
async function updateProduct(req, res) {
	const { name, brand, image, price, description, countInStock } = req.body;

	const validationError = validateProductData(req.body);
	if (validationError)
		return res.status(400).json({ success: false, errorMessage: validationError });

	const product = await Product.findByIdAndUpdate(
		req.params.id,
		{ name, brand, image, price, description, countInStock },
		{ new: true, useFindAndModify: false }
	);
	if (!product)
		return res
			.status(404)
			.json({ success: false, errorMessage: "Couldn't find a product with provided Id" });

	return res.status(201).json({ success: true, data: product });
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

module.exports = {
	getProducts,
	getSingleProduct,
	createProduct,
	updateProduct,
	deleteProduct,
};
