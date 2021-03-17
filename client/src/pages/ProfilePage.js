import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "../state_management/userState";
import { renderInputGroup, objectIsEmpty } from "../utils/helpers";
import { validateDataToUpdate } from "../utils/validation";
import Spinner from "../components/Spinner";

function ProfilePage() {
	const { currentUser, loading, error, successfulUpdate } = useSelector(
		state => state.user
	);
	const dispatch = useDispatch();
	const [userData, setUserData] = useState({
		email: "",
		name: "",
		password: "",
		confirmPassword: "",
	});
	const [validationErrors, setValidationErrors] = useState({});

	useEffect(() => {
		const data = {};
		data.email = currentUser.email;
		data.name = currentUser.name;
		setUserData(data);
	}, [currentUser]);

	const handleChange = e => {
		setValidationErrors({});
		const { name, value } = e.currentTarget;
		const data = userData;
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
		}
	};

	return (
		<main className="container text-center" role="main">
			<h1>Update profile</h1>
			{loading && <Spinner />}
			<div className="row">
				<div className="card col-10 col-md-3 mx-auto mt-4">
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
			</div>
		</main>
	);
}

export default ProfilePage;
