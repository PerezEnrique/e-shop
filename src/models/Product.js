const mongoose = require("mongoose");
const ReviewSchema = require("./Review").ReviewSchema;

const ProductSchema = new mongoose.Schema(
	{
		user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
		name: { type: String, required: [true, "A name is required for the product"] },
		brand: { type: String, required: [true, "Brand is required for the product"] },
		image: { type: String, required: [true, "A product image is required"] },
		price: { type: Number, required: [true, "Price is required for the product"] },
		reviews: [ReviewSchema],
		totalRating: { type: Number, default: 0 },
		description: {
			type: String,
			required: [true, "A description is required for the product"],
		},
		countInStock: { type: Number, default: 0 },
	},
	{ timestamps: true }
);

ProductSchema.methods.setImgUrl = function (filename) {
	return `/uploads/${filename}`;
};

ProductSchema.methods.setTotalRating = function () {
	return (
		this.reviews.reduce((acc, review) => acc + review.rating, 0) / this.reviews.length
	);
};

module.exports = mongoose.model("Product", ProductSchema);
