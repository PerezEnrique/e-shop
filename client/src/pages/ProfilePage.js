import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "../state_management/userState";
import { objectIsEmpty } from "../utils/helpers";
import { validateDataToUpdate } from "../utils/validation";
import Spinner from "../components/Spinner";

function ProfilePage() {
	const { currentUser, loading, error, successfulUpdate } = useSelector(
		state => state.user
	);
	const dispatch = useDispatch();
	const [userData, setUserData] = useState({
		email: currentUser.email,
		name: currentUser.name,
		password: "",
		confirmPassword: "",
	});
	const [validationErrors, setValidationErrors] = useState({});

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
			dispatch(updateProfile(email, name, password));
			// To clean the fields after submition
			const data = userData;
			data.password = "";
			data.confirmPassword = "";
			setUserData(data);
		}
	};

	return (
		<main className="container" role="main">
			<h1>Update profile</h1>
			{loading && <Spinner />}
			<section className="row">
				<div className="card col-md-3 mt-4">
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
				</div>
			</section>
		</main>
	);
}

export default ProfilePage;
