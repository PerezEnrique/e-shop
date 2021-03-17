import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingData } from "../state_management/cartState";
import CheckoutSteps from "../components/CheckoutSteps";
import Spinner from "../components/Spinner";
import { renderInputGroup, objectIsEmpty } from "../utils/helpers";
import { validateShippingData } from "../utils/validation";

function ShippingPage({ history }) {
	const { shippingData: currentData } = useSelector(state => state.cart);
	const [shippingData, setShippingData] = useState({
		address: currentData.address,
		city: currentData.city,
		postalCode: currentData.postalCode,
		country: currentData.country,
	});
	const [validationErrors, setValidationErrors] = useState({});
	const dispatch = useDispatch();

	const handleChange = e => {
		setValidationErrors({});
		const { name, value } = e.currentTarget;
		const data = { ...shippingData };
		data[name] = value;
		setShippingData(data);
	};

	const handleSubmit = e => {
		e.preventDefault();
		const errorsFromValidation = validateShippingData(shippingData);
		if (!objectIsEmpty(errorsFromValidation)) {
			setValidationErrors(errorsFromValidation);
		} else {
			dispatch(saveShippingData(shippingData));
			alert("SUCCESS PUSHING TO PAYMENT");
			// history.push("/payment")
		}
	};

	return (
		<main className="container text-center" role="main">
			<CheckoutSteps step1 step2 />
			<h1>Shipping</h1>
			{/* {loading && <Spinner />} */}
			<div className="row justify-content-center">
				<div className="card col-10 col-md-6 mt-4">
					<div className="card-body text-left">
						<form onSubmit={handleSubmit}>
							{renderInputGroup(
								shippingData,
								validationErrors,
								"Address",
								"text",
								"address",
								handleChange
							)}
							{renderInputGroup(
								shippingData,
								validationErrors,
								"City",
								"text",
								"city",
								handleChange
							)}
							{renderInputGroup(
								shippingData,
								validationErrors,
								"Postal code",
								"text",
								"postalCode",
								handleChange
							)}
							{renderInputGroup(
								shippingData,
								validationErrors,
								"Country",
								"text",
								"country",
								handleChange
							)}
							{/* {error && <div className="alert alert-danger">{error}</div>} */}
							<div className="text-center">
								{/* <button className="mb-2 btn btn-primary" type="submit" disabled={loading}> */}
								<button className="mb-2 btn btn-primary" type="submit">
									Continue
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</main>
	);
}

export default ShippingPage;
