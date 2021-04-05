import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logIn } from "../state_management/userState";
import Spinner from "../components/Spinner";
import { validateLogIn } from "../utils/validation";
import { objectIsEmpty } from "../utils/helpers";
import Alert from "../components/Alert";

function LogInPage({ location }) {
	const { loading, error } = useSelector(state => state.user);
	const dispatch = useDispatch();
	const [userData, setUserData] = useState({
		email: "",
		password: "",
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
		const errorsFromValidation = validateLogIn(userData);
		if (!objectIsEmpty(errorsFromValidation)) {
			setValidationErrors(errorsFromValidation);
		} else {
			dispatch(logIn(userData));
		}
	};

	return (
		<main className="container text-center" role="main">
			<h1>Log In</h1>

			{loading && <Spinner />}
			<section className="row justify-content-center">
				<div className="card col-10 col-md-6 mt-4">
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
									<Alert type="danger" message={validationErrors.email} />
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
									<Alert type="danger" message={validationErrors.password} />
								)}
							</div>
							{error && <Alert type="danger" message={error} />}
							<div className="text-center">
								<button className="mb-2 btn btn-primary" type="submit" disabled={loading}>
									Log In
								</button>
								<p>
									Dont't have an account? Sign up{" "}
									<Link
										to={
											location.state
												? { pathname: "/sign-up", state: location.state }
												: "/sign-up"
										}
									>
										here
									</Link>
								</p>
							</div>
						</form>
					</div>
				</div>
			</section>
		</main>
	);
}

export default LogInPage;
