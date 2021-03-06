import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../state_management/usersState";
import Spinner from "../components/Spinner";
import Alert from "../components/Alert";

function UsersListPage({ history }) {
	const { currentUser, users, loading, error } = useSelector(state => state.users);
	const dispatch = useDispatch();
	useEffect(() => {
		if (currentUser && currentUser.isAdmin) {
			dispatch(fetchUsers());
		} else {
			history.push("/not-authorized");
		}
	}, [currentUser, dispatch, history]);

	return (
		<main className="container" role="main">
			<h1 className="h3 mb-3">Users</h1>
			<section>
				{loading ? (
					<Spinner />
				) : error ? (
					<Alert type="danger" message={error} />
				) : (
					<table className="table table-striped">
						<thead>
							<tr>
								<th id="id">Id</th>
								<th id="name">Name</th>
								<th id="email">Email</th>
								<th id="admin">Admin</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{users.map(user => (
								<tr key={user._id}>
									<td headers="id">{user._id}</td>
									<td headers="name">{user.name}</td>
									<td headers="email">{user.email}</td>
									{!user.isAdmin ? (
										<td className="text-danger" headers="admin">
											Not an admin
										</td>
									) : (
										<td className="text-success" headers="admin">
											Admin
										</td>
									)}
									<td>
										<Link
											className="btn btn-sm btn-light"
											to={`/admin/users/${user._id}/edit-status`}
										>
											Edit
										</Link>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				)}
			</section>
		</main>
	);
}

export default UsersListPage;
