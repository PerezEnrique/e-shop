import React from "react";
import { useSelector } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";
import ProductListItem from "../components/ProductListItem";

function PlaceOrderPage() {
	const cart = useSelector(state => state.cart);
	const { cartItems, shippingData, paymentMethod } = cart;
	const { address, city, postalCode, country } = shippingData;

	cart.itemsPrice = cartItems
		.reduce((acc, item) => acc + Number(item.quantity) * Number(item.price), 0)
		.toFixed(2);

	cart.shippingPrice = (Number(cartItems.itemsPrice) > 100 ? 0 : 10).toFixed(2);
	cart.taxPrice = (Number(cart.itemsPrice) * 0.16).toFixed(2);
	cart.totalPrice = (
		Number(cart.itemsPrice) +
		Number(cart.shippingPrice) +
		Number(cart.taxPrice)
	).toFixed(2);

	const placeOrderHandler = () => console.log("ok");

	return (
		<div>
			<main className="container" role="main">
				<CheckoutSteps step1 step2 step3 step4 />
				<div className="row justify-content-between align-items-start">
					<section className="mt-3 col-md-8">
						<div className="border-bottom mb-3">
							<h2 className="h3 mb-3">Shipping</h2>
							<p>
								Address: {address}, {city} {postalCode}, {country}
							</p>
						</div>
						<div className="border-bottom mb-3">
							<h2 className="h3 mb-3">Payment method</h2>
							<p>Method: {paymentMethod}</p>
						</div>
						<div>
							<h2 className="h3 mb-3">Order items</h2>
							<ul className="list-group list-group-flush list-unstyled">
								{cartItems.map(item => (
									<ProductListItem key={item._id} item={item} />
								))}
							</ul>
						</div>
					</section>
					<section className="col-md-3 card">
						<div className="card-body">
							<h1 className="card-title h3">Order summary</h1>
							<hr />
							<dl>
								<div className="d-flex justify-content-between">
									<dt>Items</dt>
									<dd>${cart.itemsPrice}</dd>
								</div>

								<hr />
								<div className="d-flex justify-content-between">
									<dt>Shipping</dt>
									<dd>${cart.shippingPrice}</dd>
								</div>
								<hr />
								<div className="d-flex justify-content-between">
									<dt>Tax</dt>
									<dd>${cart.taxPrice}</dd>
								</div>
								<hr />
								<div className="d-flex justify-content-between">
									<dt>Total</dt>
									<dd className="font-weight-bold">${cart.totalPrice}</dd>
								</div>
							</dl>
							<hr />

							<button
								className="btn btn-block btn-primary"
								disabled={cartItems.length < 1}
								onClick={placeOrderHandler}
							>
								Place order
							</button>
						</div>
					</section>
				</div>
			</main>
		</div>
	);
}

export default PlaceOrderPage;
