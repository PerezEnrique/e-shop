import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPrices } from "../state_management/cartState";
import { createOrder } from "../state_management/orderState";
import CheckoutSteps from "../components/CheckoutSteps";
import ProductListItem from "../components/ProductListItem";
import Alert from "../components/Alert";

function PlaceOrderPage({ history }) {
	const {
		cartItems,
		itemsPrice,
		shippingPrice,
		taxPrice,
		totalPrice,
		shippingData,
		paymentMethod,
	} = useSelector(state => state.cart);
	const { currentOrder, successfulOrderCreation, error } = useSelector(
		state => state.order
	);
	const { address, city, postalCode, country } = shippingData;
	const dispatch = useDispatch();

	useEffect(() => {
		if (successfulOrderCreation) {
			history.push(`order/${currentOrder._id}`);
		}
	}, [successfulOrderCreation, history, currentOrder._id]);

	useEffect(() => {
		dispatch(setPrices());
	}, [dispatch]);

	const placeOrderHandler = () => {
		dispatch(
			createOrder({
				orderItems: cartItems,
				shippingData,
				paymentMethod,
				itemsPrice,
				shippingPrice,
				taxPrice,
				totalPrice,
			})
		);
	};

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
							{cartItems.length < 1 ? (
								<Alert type="info" message="Your cart is empty" />
							) : (
								<ul className="list-group list-group-flush list-unstyled">
									{cartItems.map(item => (
										<ProductListItem key={item._id} item={item} />
									))}
								</ul>
							)}
						</div>
					</section>
					<section className="col-md-3 card">
						<div className="card-body">
							<h1 className="card-title h3">Order summary</h1>
							<hr />
							<dl>
								<div className="d-flex justify-content-between">
									<dt>Items</dt>
									<dd>${itemsPrice}</dd>
								</div>

								<hr />
								<div className="d-flex justify-content-between">
									<dt>Shipping</dt>
									<dd>${shippingPrice}</dd>
								</div>
								<hr />
								<div className="d-flex justify-content-between">
									<dt>Tax</dt>
									<dd>${taxPrice}</dd>
								</div>
								<hr />
								<div className="d-flex justify-content-between">
									<dt>Total</dt>
									<dd className="font-weight-bold">${totalPrice}</dd>
								</div>
							</dl>
							<hr />
							{error && <Alert type="danger" message={error} />}
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
