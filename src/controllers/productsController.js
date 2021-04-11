const Product = require("../models/Product");
const { Schema: Review } = require("../models/Review");
const { validateProductData, validateReview } = require("../utils/validation");

//route: GET /products
//access: public
//desc: get all products
async function getProducts(req, res) {
	const pageSize = 8;
	const currentPage = Number(req.query.page) || 1;
	const query = req.query.term ? { name: { $regex: req.query.term, $options: "i" } } : {};

	const productCount = await Product.countDocuments({ ...query });
	const products = await Product.find({ ...query })
		.skip((currentPage - 1) * pageSize)
		.limit(pageSize);
	return res.status(200).json({
		success: true,
		data: { products, currentPage, pages: Math.ceil(productCount / pageSize) },
	});
}

//route: GET /products/:id
//access: public
//desc: get a single products
async function getProduct(req, res) {
	const product = await Product.findById(req.params.id).populate("reviews.user", "name");
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
	const { name, brand, price, description, countInStock } = req.body;

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

//route: PUT /products/:id
//access: private (and only for admins)
//desc: updates a product
async function updateProduct(req, res) {
	const { name, brand, price, description, countInStock } = req.body;

	const validationError = validateProductData(req.body);
	if (validationError)
		return res.status(400).json({ success: false, errorMessage: validationError });

	const product = await Product.findById(req.params.id);
	if (!product)
		return res
			.status(404)
			.json({ success: false, errorMessage: "Couldn't find a product with provided Id" });

	product.name = name;
	product.brand = brand;
	product.price = price;
	product.description = description;
	product.countInStock = countInStock;

	if (req.file) {
		product.image = product.setImgUrl(req.file.filename);
	}

	const updatedProduct = await product.save();
	return res.status(201).json({ success: true, data: updatedProduct });
}

//route: PUT /products/:id/review
//access: private
//desc: review a product
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

async function reviewProduct(req, res) {
	const { rating, comment } = req.body;

	const validationError = validateReview(req.body);
	if (validationError)
		return res.status(400).json({ success: false, errorMessage: validationError });

	const product = await Product.findById(req.params.id);

	if (!product) {
		return res.status(404).json({
			success: false,
			errorMessage: "Couldn't find product with the provided id",
		});
	}

	const alreadyReviewed = product.reviews.find(
		review => review.user.toString() === req.user._id.toString()
	);

	if (alreadyReviewed) {
		return res
			.status(400)
			.json({ success: false, errorMessage: "Product already reviewed" });
	}

	const review = new Review({
		user: req.user._id,
		rating: Number(rating),
		comment,
	});

	product.reviews.push(review);
	product.rating =
		product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

	await product.populate("reviews.user", "name").execPopulate();
	await product.save();
	res.status(201).json({ success: true, data: product });
}

module.exports = {
	getProducts,
	getProduct,
	createProduct,
	updateProduct,
	deleteProduct,
	reviewProduct,
};
