const { json } = require("express");
const Order = require("../models/Order");

// route: POST /order
//access: private
//desc: creates a new order
async function createOrder(req, res) {
	const {
		orderItems,
		shippingData,
		paymentMethod,
		itemsPrice,
		shippingPrice,
		taxPrice,
		totalPrice,
	} = req.body;
	if (orderItems && orderItems.length === 0)
		return res.status(400).json({ success: false, errorMessage: "No order items" });

	const newOrder = new Order({
		user: req.user._id,
		orderItems,
		shippingData,
		paymentMethod,
		itemsPrice,
		shippingPrice,
		taxPrice,
		totalPrice,
	});

	const createdOrder = await newOrder.save();
	return res.status(201).json({ success: true, data: createdOrder });
}

module.exports = { createOrder };
