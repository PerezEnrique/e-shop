import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "../state_management/userState";
import { getUserOrders } from "../state_management/orderState";
import OrderRow from "../components/OrderRow";
import { objectIsEmpty } from "../utils/helpers";
import { validateDataToUpdate } from "../utils/validation";
import Spinner from "../components/Spinner";
import Alert from "../components/Alert";

function ProfilePage() {
	const { currentUser, loading, error, successfulUpdate } = useSelector(
		state => state.user
	);
	const { userOrders, loading: loadingOrders, error: ordersError } = useSelector(
		state => state.order
	);
	const [userData, setUserData] = useState({
		email: currentUser.email,
		name: currentUser.name,
		password: "",
		confirmPassword: "",
	});
	const [validationErrors, setValidationErrors] = useState({});
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getUserOrders());
	}, [dispatch]);

	const handleChange = e => {
		setValidationErrors({});
		const { name, value } = e.currentTarget;
		const data = { ...userData };
		data[name] = value;
		setUserData(data);
	};

	const handleSubmit = e => {
		e.preventDefault();
		const errorsFromValidation = validateDataToUpdate(userData);
		if (!objectIsEmpty(errorsFromValidation)) {
			setValidationErrors(errorsFromValidation);
		} else {
			const { email, name, password } = userData;
			let dataToUpdate = {};
			if (!password || password === "") {
				dataToUpdate = { email, name };
			} else {
				dataToUpdate = { email, name, password };
			}
			dispatch(updateProfile(dataToUpdate));
			// To clean the fields after submition
			const data = userData;
			data.password = "";
			data.confirmPassword = "";
			setUserData(data);
		}
	};

	return (
		<main className="container" role="main">
			<h1>Profile</h1>
			{loading && <Spinner />}
			<div className="row justify-content-between">
				<section className="card col-md-3 mt-4">
					<div className="card-body text-left">
						<form onSubmit={handleSubmit}>
							<div className="form-group">
								<label htmlFor="email">Email</label>
								<input
									className="form-control"
									type="email"
									id="email"
									name="email"
									value={userData.email}
									onChange={handleChange}
									placeholder="Enter email"
									required
								/>
								{validationErrors.email && (
									<div className="alert alert-danger">{validationErrors.email}</div>
								)}
							</div>
							<div className="form-group">
								<label htmlFor="name">Email</label>
								<input
									className="form-control"
									type="text"
									id="name"
									name="name"
									value={userData.name}
									onChange={handleChange}
									placeholder="Enter name"
									required
								/>
								{validationErrors.name && (
									<div className="alert alert-danger">{validationErrors.name}</div>
								)}
							</div>
							<div className="form-group">
								<label htmlFor="password">Password</label>
								<input
									className="form-control"
									type="password"
									id="password"
									name="password"
									value={userData.password}
									onChange={handleChange}
									placeholder="Enter password"
									required
								/>
								{validationErrors.password && (
									<div className="alert alert-danger">{validationErrors.password}</div>
								)}
							</div>
							<div className="form-group">
								<label htmlFor="confirmPassword">Password confirmation</label>
								<input
									className="form-control"
									type="password"
									id="confirmPassword"
									name="confirmPassword"
									value={userData.confirmPassword}
									onChange={handleChange}
									placeholder="Enter password confirmation"
									required
								/>
								{validationErrors.confirmPassword && (
									<div className="alert alert-danger">
										{validationErrors.confirmPassword}
									</div>
								)}
							</div>
							{error && <div className="alert alert-danger">{error}</div>}
							{successfulUpdate && (
								<div className="alert alert-success">Profile successfuly updated</div>
							)}
							<div className="text-center">
								<button className="mb-2 btn btn-primary" type="submit" disabled={loading}>
									Update profile
								</button>
							</div>
						</form>
					</div>
				</section>
				<section className="col-md-8 mt-4">
					<h2>My orders</h2>
					<table className="table table-striped">
						<thead>
							<tr>
								<th id="id">Id</th>
								<th id="date">Date</th>
								<th id="total">Total</th>
								<th id="payment-status">Paid</th>
								<th id="delivery-status">Delivered</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{loadingOrders ? (
								<Spinner />
							) : ordersError ? (
								<Alert type="danger" message={ordersError} />
							) : (
								userOrders.map(order => <OrderRow key={order._id} order={order} />)
							)}
						</tbody>
					</table>
				</section>
			</div>
		</main>
	);
}

export default ProfilePage;
