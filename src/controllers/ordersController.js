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

// route: GET /order
//access: private
//desc: returns the desired order
async function getOrder(req, res) {
	const order = await Order.findById(req.params.id).populate("user", ["email", "name"]);

	if (!order) {
		return res.status(404).json({
			success: false,
			errorMessage: "Couldn't find order with the provided id",
		});
	}

	return res.status(200).json({ success: true, data: order });
}

module.exports = { createOrder, getOrder };
