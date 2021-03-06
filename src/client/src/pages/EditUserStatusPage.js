import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	fetchUser,
	editAdminStatus,
	resetUpdateProcess,
} from "../state_management/usersState";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import Alert from "../components/Alert";

function EditUserStatus({ match, history }) {
	const { user, successfulUpdate, loading, error } = useSelector(state => state.users);
	const [isAdmin, setIsAdmin] = useState(user.isAdmin);
	const dispatch = useDispatch();

	useEffect(() => {
		if (successfulUpdate) {
			dispatch(resetUpdateProcess());
			history.push("/admin/users-list");
		}
		if (!user._id || user._id !== match.params.id) {
			dispatch(fetchUser(match.params.id));
		}
	}, [successfulUpdate, user._id, match.params.id, dispatch, history]);

	const handleSubmit = e => {
		e.preventDefault();
		dispatch(editAdminStatus(user._id, isAdmin));
	};

	return (
		<div className="container">
			<Link to="/admin/users-list">Go back</Link>
			<main className="row justify-content-center" role="main">
				<div className="col-10 mt-1">
					<h1 className="h2">Edit user</h1>
					{loading ? (
						<Spinner />
					) : error ? (
						<Alert type="danger" message={error} />
					) : (
						<form onSubmit={handleSubmit}>
							<input
								className="form-control-plaintext text-muted"
								type="email"
								readOnly
								id="email"
								name="email"
								value={user.email}
							/>
							<div className="form-check">
								<input
									className="form-check-input"
									type="checkbox"
									id="isAdmin"
									checked={isAdmin}
									onChange={e => setIsAdmin(e.currentTarget.checked)}
								/>
								<label className="form-check-label mb-2" htmlFor="isAdmin">
									Is admin
								</label>
							</div>
							<button className="btn btn-primary" type="submit">
								Update
							</button>
						</form>
					)}
				</div>
			</main>
		</div>
	);
}

export default EditUserStatus;
