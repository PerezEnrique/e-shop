import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { signUp } from "../state_management/userState";
import { objectIsEmpty } from "../utils/helpers";
import { validateSignUp } from "../utils/validation";
import Spinner from "../components/Spinner";

function SignUpPage({ location, history }) {
	const { currentUser, loading, error } = useSelector(state => state.user);
	const dispatch = useDispatch();
	const [userData, setUserData] = useState({
		email: "",
		name: "",
		password: "",
		confirmPassword: "",
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
		const errorsFromValidation = validateSignUp(userData);
		if (!objectIsEmpty(errorsFromValidation)) {
			setValidationErrors(errorsFromValidation);
		} else {
			const { email, name, password } = userData;
			dispatch(signUp(email, name, password));
		}
	};

	return (
		<main className="container text-center" role="main">
			<h1>Sign up</h1>
			{loading && <Spinner />}
			<div className="row justify-content-center">
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
							<div className="text-center">
								<button className="mb-2 btn btn-primary" type="submit" disabled={loading}>
									Sign up
								</button>
								<p>
									Already have an account? Log in <Link to="/log-in">here</Link>
								</p>
							</div>
						</form>
					</div>
				</div>
			</div>
		</main>
	);
}

export default SignUpPage;
