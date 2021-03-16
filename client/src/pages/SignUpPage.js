import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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
		const data = userData;
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
			{error && <div className="alert alert-danger">{error}</div>}
			{loading && <Spinner />}
			<div className="row">
				<div className="card col-10 col-md-6 mx-auto mt-4">
					<div className="card-body text-left">
						<form onSubmit={handleSubmit}>
							{renderInputGroup(
								userData,
								validationErrors,
								"Email",
								"email",
								"email",
								handleChange
							)}
							{renderInputGroup(
								userData,
								validationErrors,
								"Name",
								"text",
								"name",
								handleChange
							)}
							{renderInputGroup(
								userData,
								validationErrors,
								"Password",
								"password",
								"password",
								handleChange
							)}
							{renderInputGroup(
								userData,
								validationErrors,
								"Confirm password",
								"password",
								"confirmPassword",
								handleChange
							)}
							<button
								className="d-block mx-auto btn btn-primary"
								type="submit"
								disabled={loading}
							>
								Sign up
							</button>
						</form>
					</div>
				</div>
			</div>
		</main>
	);
}

export default SignUpPage;
