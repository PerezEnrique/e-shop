import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingData } from "../state_management/cartState";
import CheckoutSteps from "../components/CheckoutSteps";
import { validateShippingData } from "../utils/validation";
import { objectIsEmpty } from "../utils/helpers";
import Alert from "../components/Alert";

function ShippingPage({ history }) {
	const { shippingData } = useSelector(state => state.cart);

	const [address, setAddress] = useState(shippingData.address);
	const [city, setCity] = useState(shippingData.city);
	const [postalCode, setPostalCode] = useState(shippingData.postalCode);
	const [country, setCountry] = useState(shippingData.country);
	const [validationErrors, setValidationErrors] = useState({});

	const dispatch = useDispatch();

	const handleSubmit = e => {
		e.preventDefault();
		const errorsFromValidation = validateShippingData({
			address,
			city,
			postalCode,
			country,
		});
		if (!objectIsEmpty(errorsFromValidation)) {
			setValidationErrors(errorsFromValidation);
		} else {
			dispatch(saveShippingData({ address, city, postalCode, country }));
			history.push("/payment");
		}
	};

	return (
		<div className="container text-center">
			<CheckoutSteps step1 step2 />
			<h1>Shipping</h1>
			<main className="row justify-content-center" role="main">
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
									value={address}
									onChange={e => setAddress(e.currentTarget.value)}
									placeholder="Enter address"
									required
								/>
								{validationErrors.address && (
									<Alert type="danger" message={validationErrors.address} />
								)}
							</div>
							<div className="form-group">
								<label htmlFor="city">City</label>
								<input
									className="form-control"
									type="text"
									id="city"
									name="city"
									value={city}
									onChange={e => setCity(e.currentTarget.value)}
									placeholder="Enter city"
									required
								/>
								{validationErrors.city && (
									<Alert type="danger" message={validationErrors.city} />
								)}
							</div>
							<div className="form-group">
								<label htmlFor="postalCode">Postal code</label>
								<input
									className="form-control"
									type="text"
									id="postalCode"
									name="postalCode"
									value={postalCode}
									onChange={e => setPostalCode(e.currentTarget.value)}
									placeholder="Enter Postal code"
									required
								/>
								{validationErrors.postalCode && (
									<Alert type="danger" message={validationErrors.postalCode} />
								)}
							</div>
							<div className="form-group">
								<label htmlFor="country">Country</label>
								<input
									className="form-control"
									type="text"
									id="country"
									name="country"
									value={country}
									onChange={e => setCountry(e.currentTarget.value)}
									placeholder="Enter country"
									required
								/>
								{validationErrors.country && (
									<Alert type="danger" message={validationErrors.country} />
								)}
							</div>
							<div className="text-center">
								<button className="mb-2 btn btn-primary" type="submit">
									Continue
								</button>
							</div>
						</form>
					</div>
				</div>
			</main>
		</div>
	);
}

export default ShippingPage;
