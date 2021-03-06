const Order = require("../models/Order");

// route: GET /orders
//access: private (and only for admins)
//desc: returns all the orders
async function getOrders(req, res) {
	const orders = await Order.find({}).populate("user", ["email", "name"]);
	return res.status(200).json({ success: true, data: orders });
}

// route: GET /orders/:id
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

// route: GET /orders/my-orders
//access: private
//desc: get current user's orders
async function getUserOrders(req, res) {
	const orders = await Order.find({ user: req.user._id });

	return res.status(200).json({ success: true, data: orders });
}

// route: POST /orders
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

// route: PUT /orders/:id/pay
//access: private
//desc: update order to paid
async function updateOrderToPaid(req, res) {
	const order = await Order.findById(req.params.id);

	if (!order) {
		return res.status(404).json({
			success: false,
			errorMessage: "Couldn't find order with the provided id",
		});
	}

	order.isPaid = true;
	order.paidAt = Date.now();
	order.paymentResult = {
		id: req.body.id,
		status: req.body.status,
		update_time: req.body.update_time,
		email_address: req.body.payer.email_address,
	};

	const updatedOrder = await order.save();
	return res.status(201).json({ success: true, data: updatedOrder });
}

// route: PUT /orders/:id/mark-delivered
//access: private
//desc: update order to paid
async function markOrderAsDelivered(req, res) {
	const order = await Order.findByIdAndUpdate(
		req.params.id,
		{
			isDelivered: true,
			deliveredAt: Date.now(),
		},
		{ new: true, useFindAndModify: false }
	);
	if (!order)
		return res
			.status(404)
			.json({ success: false, errorMessage: "Couldn't find order with the provided id" });

	const updatedOrder = await order.save();
	return res.status(201).json({ success: true, data: updatedOrder });
}

module.exports = {
	createOrder,
	getOrders,
	getOrder,
	getUserOrders,
	updateOrderToPaid,
	markOrderAsDelivered,
};
