import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUserList } from "../state_management/userState";
import Spinner from "../components/Spinner";
import Alert from "../components/Alert";

function UsersList({ history }) {
	const { currentUser, usersList, loading, error } = useSelector(state => state.user);
	const dispatch = useDispatch();
	useEffect(() => {
		if (currentUser && currentUser.isAdmin) {
			dispatch(getUserList());
		} else {
			history.push("/not-authorized");
		}
	}, [currentUser, dispatch, history]);

	return (
		<main className="container" role="main">
			<h1 className="h3 mb-3">Users</h1>
			<section>
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
						{loading ? (
							<Spinner />
						) : error ? (
							<Alert type="danger" message={error} />
						) : (
							usersList.map(user => (
								<tr>
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
											to={`/admin/user/${user._id}/edit-status`}
										>
											Edit
										</Link>
									</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			</section>
		</main>
	);
}

export default UsersList;
