import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { signUp } from "../state_management/userState";
import { renderInputGroup, objectIsEmpty } from "../utils/helpers";
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
							{renderInputGroup(
								userData,
								validationErrors,
								"Email",
								"email",
								"email",
								handleChange,
								true
							)}
							{renderInputGroup(
								userData,
								validationErrors,
								"Name",
								"text",
								"name",
								handleChange,
								true
							)}
							{renderInputGroup(
								userData,
								validationErrors,
								"Password",
								"password",
								"password",
								handleChange,
								true
							)}
							{renderInputGroup(
								userData,
								validationErrors,
								"Confirm password",
								"password",
								"confirmPassword",
								handleChange,
								true
							)}
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
