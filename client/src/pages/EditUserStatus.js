import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import Alert from "../components/Alert";

function EditUserStatus({ match }) {
	const { usersList, loading, error } = useSelector(state => state.user);
	const user = usersList.find(user => user._id === match.params.id);
	const [isAdmin, setIsAdmin] = useState(user.isAdmin);

	return (
		<main className="container" role="main">
			<Link to="/admin/users-list">Go back</Link>
			<section className="row justify-content-center">
				<div className="col-10 mt-1">
					<h1 className="h2">Edit user</h1>
					{loading ? (
						<Spinner />
					) : error ? (
						<Alert type="danger" message={error} />
					) : (
						<form>
							<input
								className="form-control-plaintext text-muted"
								type="email"
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
			</section>
		</main>
	);
}

export default EditUserStatus;
