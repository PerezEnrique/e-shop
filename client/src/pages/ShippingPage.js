import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingData } from "../state_management/cartState";
import CheckoutSteps from "../components/CheckoutSteps";
import Spinner from "../components/Spinner";
import { validateShippingData } from "../utils/validation";
import { objectIsEmpty } from "../utils/helpers";

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
							<div className="form-group">
								<label htmlFor="address">Address</label>
								<input
									className="form-control"
									type="text"
									id="address"
									name="address"
									value={shippingData.address}
									onChange={handleChange}
									placeholder="Enter address"
									required
								/>
								{validationErrors.address && (
									<div className="alert alert-danger">{validationErrors.address}</div>
								)}
							</div>
							<div className="form-group">
								<label htmlFor="city">City</label>
								<input
									className="form-control"
									type="text"
									id="city"
									name="city"
									value={shippingData.city}
									onChange={handleChange}
									placeholder="Enter city"
									required
								/>
								{validationErrors.city && (
									<div className="alert alert-danger">{validationErrors.city}</div>
								)}
							</div>
							<div className="form-group">
								<label htmlFor="postalCode">Postal code</label>
								<input
									className="form-control"
									type="text"
									id="postalCode"
									name="postalCode"
									value={shippingData.postalCode}
									onChange={handleChange}
									placeholder="Enter Postal code"
									required
								/>
								{validationErrors.postalCode && (
									<div className="alert alert-danger">{validationErrors.postalCode}</div>
								)}
							</div>
							<div className="form-group">
								<label htmlFor="country">Country</label>
								<input
									className="form-control"
									type="text"
									id="country"
									name="country"
									value={shippingData.country}
									onChange={handleChange}
									placeholder="Enter country"
									required
								/>
								{validationErrors.country && (
									<div className="alert alert-danger">{validationErrors.country}</div>
								)}
							</div>
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
