import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrders } from "../state_management/ordersState";
import Spinner from "../components/Spinner";
import Alert from "../components/Alert";

function OrderListPage({ history }) {
	const { orders, loading, error } = useSelector(state => state.orders);
	const { currentUser } = useSelector(state => state.users);
	const dispatch = useDispatch();
	useEffect(() => {
		if (currentUser && currentUser.isAdmin) {
			dispatch(fetchOrders());
		} else {
			history.push("/not-authorized");
		}
	}, [currentUser, dispatch, history]);

	return (
		<main className="container" role="main">
			<h1 className="h3 mb-3">Orders</h1>
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
								<th id="userName">User</th>
								<th id="userEmail">User</th>
								<th id="date">Date</th>
								<th id="totalPrice">Total price</th>
								<th id="isPaid">Paid</th>
								<th id="isDelivered">Delivered</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{orders.map(order => (
								<tr key={order._id}>
									<td headers="id">{order._id}</td>
									<td headers="userName">{order.user && order.user.name}</td>
									<td headers="userEmail">{order.user && order.user.email}</td>
									<td headers="date">{order.createdAt.substring(0, 10)}</td>
									<td headers="totalPrice">{order.totalPrice}</td>
									{!order.isPaid ? (
										<td className="text-danger" headers="isPaid">
											Not paid
										</td>
									) : (
										<td className="text-success" headers="isPaid">
											{order.paidAt.substring(0, 10)}
										</td>
									)}
									{!order.isDelivered ? (
										<td className="text-danger" headers="isPaid">
											Not delivered
										</td>
									) : (
										<td className="text-success" headers="isPaid">
											{order.paidAt.substring(0, 10)}
										</td>
									)}
									<td>
										<Link className="btn btn-sm btn-light" to={`/orders/${order._id}`}>
											Details
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

export default OrderListPage;
