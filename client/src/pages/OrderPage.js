import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetCart } from "../state_management/cartState";
import { PayPalButton } from "react-paypal-button-v2";
import http from "../services/httpServices";
import {
	fetchOrder,
	payOrder,
	resetOrderPaymentProcess,
} from "../state_management/ordersState";
import ProductListItem from "../components/ProductListItem";
import Spinner from "../components/Spinner";
import Alert from "../components/Alert";

function OrderPage({ match }) {
	const { currentOrder, loading, successfulPayment, error } = useSelector(
		state => state.orders
	);
	const {
		_id,
		user: { name, email },
		orderItems,
		shippingData: { address, city, postalCode, country },
		paymentMethod,
		itemsPrice,
		taxPrice,
		shippingPrice,
		totalPrice,
		isPaid,
		paidAt,
		isDelivered,
	} = currentOrder;
	const [sdkReady, setSDKReady] = useState(false);

	const dispatch = useDispatch();

	useEffect(() => {
		const addPaypalScript = async () => {
			const { data: clientId } = await http.get("/config/paypal");
			const script = document.createElement("script");
			script.type = "text/javascript";
			script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
			script.async = true;
			script.onload = () => {
				setSDKReady(true);
			};

			document.body.appendChild(script);
		};

		if (
			currentOrder.orderItems.length < 1 ||
			successfulPayment ||
			currentOrder._id !== match.params.id
		) {
			dispatch(resetCart());
			dispatch(resetOrderPaymentProcess());
			dispatch(fetchOrder(match.params.id));
		} else if (!currentOrder.isPaid) {
			if (!window.paypal) {
				addPaypalScript();
			} else {
				setSDKReady(true);
			}
		}
	}, [dispatch, match.params.id, currentOrder, successfulPayment]);

	const successPaymentHandler = paymentResult => {
		dispatch(payOrder(match.params.id, paymentResult));
	};

	return (
		<main className="container" role="main">
			<h1 className="h2">Order {_id}</h1>
			{loading ? (
				<Spinner />
			) : error ? (
				<Alert type="danger" message={error} />
			) : (
				<div className="row justify-content-between align-items-start">
					<section className="mt-3 col-md-8">
						<div className="border-bottom mb-3">
							<h2 className="h3 mb-3">Shipping</h2>
							<p>Name: {name}</p>
							<p>Email: {email}</p>
							<p>
								Address: {address}, {city} {postalCode}, {country}
							</p>
							<p>Status: {!isDelivered ? "Not delivered" : "Delivered"}</p>
						</div>
						<div className="border-bottom mb-3">
							<h2 className="h3 mb-3">Payment method</h2>
							<p>Method: {paymentMethod}</p>
							<p>
								Payment status:{" "}
								{!isPaid ? (
									<span className="text-danger">Not paid</span>
								) : (
									<span className="text-success">Paid on {paidAt}</span>
								)}
							</p>
						</div>
						<div>
							<h2 className="h3 mb-3">Order items</h2>
							<ul className="list-group list-group-flush list-unstyled">
								{orderItems.map(item => (
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
							{!currentOrder.isPaid && (
								<React.Fragment>
									<hr />
									{loading ? (
										<Spinner />
									) : !sdkReady ? (
										<Spinner />
									) : (
										<PayPalButton
											amount={currentOrder.totalPrice}
											onSuccess={successPaymentHandler}
										/>
									)}
								</React.Fragment>
							)}
						</div>
					</section>
				</div>
			)}
		</main>
	);
}

export default OrderPage;
