import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { signUp } from "../state_management/usersState";
import { objectIsEmpty } from "../utils/helpers";
import { validateSignUp } from "../utils/validation";
import Spinner from "../components/Spinner";
import Alert from "../components/Alert";

function SignUpPage({ location }) {
	const { loading, error } = useSelector(state => state.users);
	const dispatch = useDispatch();

	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [validationErrors, setValidationErrors] = useState({});

	const handleSubmit = e => {
		e.preventDefault();
		const errorsFromValidation = validateSignUp({
			email,
			name,
			password,
			confirmPassword,
		});
		if (!objectIsEmpty(errorsFromValidation)) {
			setValidationErrors(errorsFromValidation);
		} else {
			dispatch(signUp({ email, name, password }));
		}
	};

	return (
		<main className="container text-center" role="main">
			<h1>Sign up</h1>
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
									required
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
									required
								/>
								{validationErrors.confirmPassword && (
									<Alert type="danger" message={validationErrors.confirmPassword} />
								)}
							</div>
							{error && <Alert type="danger" message={error} />}
							<div className="text-center">
								<button className="mb-2 btn btn-primary" type="submit" disabled={loading}>
									Sign up
								</button>
								<p>
									Already have an account? Log in{" "}
									<Link
										to={
											location.state
												? { pathname: "/log-in", state: location.state }
												: "/log-in"
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

export default SignUpPage;
