import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logIn } from "../state_management/userState";
import Spinner from "../components/Spinner";
import { validateLogIn } from "../utils/validation";
import { objectIsEmpty } from "../utils/helpers";

function LogInPage({ location, history }) {
	const { currentUser, loading, error } = useSelector(state => state.user);
	const dispatch = useDispatch();
	const [userData, setUserData] = useState({
		email: "",
		password: "",
	});
	const [validationErrors, setValidationErrors] = useState({});

	useEffect(() => {
		if (currentUser) {
			const { state } = location;
			const redirectPath = state ? state.from.pathname : "/";
			history.push(redirectPath);
		}
	}, [currentUser, location, history]);

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
			const { email, password } = userData;
			dispatch(logIn(email, password));
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
									<div className="alert alert-danger">{validationErrors.email}</div>
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
							{error && <div className="alert alert-danger">{error}</div>}
							<div className="text-center">
								<button className="mb-2 btn btn-primary" type="submit" disabled={loading}>
									Log In
								</button>
								<p>
									Dont't have an account? Sign up <Link to="/sign-up">here</Link>
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
