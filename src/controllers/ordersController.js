const { json } = require("express");
const Order = require("../models/Order");

// route: POST /order
//access: private
//desc: saves a new order on db
async function saveNewOrder(req, res) {
	const {
		orderItems,
		shippingData,
		paymentMethod,
		itemsPrice,
		taxPrice,
		shippingPrice,
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
		taxPrice,
		shippingPrice,
		totalPrice,
	});

	const savedOrder = await newOrder.save();
	return res.status(201).json({ success: true, data: savedOrder });
}

module.exports = { saveNewOrder };
