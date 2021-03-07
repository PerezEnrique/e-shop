const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
	{
		user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
		rating: { type: Number, required: [true, "rating is required for the review"] },
		body: { type: String, required: [true, "the body of the review is required"] },
	},
	{ timestamps: true }
);

const Schema = mongoose.model("Schema", ReviewSchema);

module.exports = { ReviewSchema, Schema };
