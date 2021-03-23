const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
	{
		user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
		orderItems: [
			{
				_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Product" },
				name: { type: String, required: true },
				brand: { type: String, required: true },
				image: { type: String, required: true },
				price: { type: Number, required: true },
				quantity: { type: Number, required: true },
			},
		],
		itemsPrice: { type: Number, required: [true, "itmes price is required"] },
		shippingData: {
			address: { type: String, required: [true, "address is required"] },
			city: { type: String, required: [true, "city is required"] },
			postalCode: { type: String, required: [true, "postal Code is required"] },
			country: { type: String, required: [true, "country is required"] },
		},
		paymentMethod: { type: String, required: [true, "Payment method is required"] },
		paymentResult: {
			id: { type: String },
			status: { type: String },
			update_time: { type: String },
			email_address: { type: String },
		},
		taxPrice: { type: Number, default: 0.0 },
		shippingPrice: { type: Number, default: 0.0 },
		totalPrice: { type: Number, default: 0.0 },
		isPaid: { type: Boolean, default: false },
		paidAt: { type: Date },
		isDelivered: { type: Boolean, default: false },
		deliveredAt: { type: Date },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
