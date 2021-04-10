import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "../state_management/usersState";
import { fetchUserOrders } from "../state_management/ordersState";
import OrderRow from "../components/OrderRow";
import { objectIsEmpty } from "../utils/helpers";
import { validateUserUpdate } from "../utils/validation";
import Spinner from "../components/Spinner";
import Alert from "../components/Alert";

function ProfilePage() {
	const { currentUser, loading, error, successfulUpdate } = useSelector(
		state => state.users
	);
	const { userOrders, loading: loadingOrders, error: ordersError } = useSelector(
		state => state.orders
	);
	const [email, setEmail] = useState(currentUser.email);
	const [name, setName] = useState(currentUser.name);
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [validationErrors, setValidationErrors] = useState({});
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchUserOrders());
	}, [dispatch]);

	const handleSubmit = e => {
		e.preventDefault();
		let userData = {};
		if (!password || password === "") {
			userData = { email, name };
		} else {
			userData = { email, name, password };
		}
		const errorsFromValidation = validateUserUpdate(userData);
		if (!objectIsEmpty(errorsFromValidation)) {
			setValidationErrors(errorsFromValidation);
		} else {
			dispatch(updateProfile(userData));
			// To clean the fields after submition
			setPassword("");
			setConfirmPassword("");
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
									value={email}
									onChange={e => setEmail(e.currentTarget.value)}
									placeholder="Enter email"
									required
								/>
								{validationErrors.email && (
									<Alert type="danger" message={validationErrors.email} />
								)}
							</div>
							<div className="form-group">
								<label htmlFor="name">Name</label>
								<input
									className="form-control"
									type="text"
									id="name"
									name="name"
									value={name}
									onChange={e => setName(e.currentTarget.value)}
									placeholder="Enter name"
									required
								/>
								{validationErrors.name && (
									<Alert type="danger" message={validationErrors.name} />
								)}
							</div>
							<div className="form-group">
								<label htmlFor="password">Password</label>
								<input
									className="form-control"
									type="password"
									id="password"
									name="password"
									value={password}
									onChange={e => setPassword(e.currentTarget.value)}
									placeholder="Enter password"
								/>
								{validationErrors.password && (
									<Alert type="danger" message={validationErrors.password} />
								)}
							</div>
							<div className="form-group">
								<label htmlFor="confirmPassword">Password confirmation</label>
								<input
									className="form-control"
									type="password"
									id="confirmPassword"
									name="confirmPassword"
									value={confirmPassword}
									onChange={e => setConfirmPassword(e.currentTarget.value)}
									placeholder="Enter password confirmation"
								/>
								{validationErrors.confirmPassword && (
									<Alert type="danger" message={validationErrors.confirmPassword} />
								)}
							</div>

							{error && <Alert type="danger" message={error} />}
							{successfulUpdate && (
								<Alert type="success" message="Profile successfuly updated" />
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
					{loadingOrders ? (
						<Spinner />
					) : ordersError ? (
						<Alert danger="danger" message={ordersError} />
					) : (
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
								{userOrders.map(order => (
									<OrderRow key={order._id} order={order} />
								))}
							</tbody>
						</table>
					)}
				</section>
			</div>
		</main>
	);
}

export default ProfilePage;
