import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { savePaymentMethod } from "../state_management/cartState";
import CheckoutSteps from "../components/CheckoutSteps";

function PaymentPage({ history }) {
	const { shippingData } = useSelector(state => state.cart);
	const [paymentMethod, setPaymentMethod] = useState("paypal");
	const dispatch = useDispatch();
	useEffect(() => {
		if (!shippingData) {
			history.push("/shipping");
		}
	});

	const handleSubmit = e => {
		e.preventDefault();
		dispatch(savePaymentMethod(paymentMethod));
		history.push("/placeorder");
	};

	return (
		<div className="container">
			<CheckoutSteps step1 step2 step3 />
			<h1>Payment method</h1>
			<main role="main">
				<form className="mt-3" onSubmit={handleSubmit}>
					<div className="form-group">
						<div className="form-check">
							<input
								className="form-check-input"
								type="radio"
								id="paypal"
								name="paymentMethod"
								value="paypal"
								checked
								onChange={e => setPaymentMethod(e.currentTarget.value)}
							/>
							<label className="form-check-label" htmlFor="paypal">
								Paypal (or credit card)
							</label>
						</div>
					</div>
					<div>
						<button className="mb-2 btn btn-primary" type="submit">
							Continue
						</button>
					</div>
				</form>
			</main>
		</div>
	);
}

export default PaymentPage;
