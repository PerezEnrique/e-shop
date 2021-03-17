import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logIn } from "../state_management/userState";
import { renderInputGroup, objectIsEmpty } from "../utils/helpers";
import { validateLogIn } from "../utils/validation";
import Spinner from "../components/Spinner";

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
								"Password",
								"password",
								"password",
								handleChange,
								true
							)}
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
			</div>
		</main>
	);
}

export default LogInPage;
