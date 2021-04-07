import React from "react";
import { Link } from "react-router-dom";

function OrderRow({
	order: { _id, createdAt, totalPrice, isPaid, paidAt, isDelivered, deliveredAt },
}) {
	return (
		<tr>
			<td headers="id">{_id}</td>
			<td headers="date">{createdAt.substring(0, 10)}</td>
			<td headers="total">${totalPrice}</td>
			{isPaid ? (
				<td headers="payment-status">{paidAt.substring(0, 10)}</td>
			) : (
				<td className="text-danger" headers="payment-status">
					Not paid
				</td>
			)}
			{isDelivered ? (
				<td headers="delivery-status">{deliveredAt.substring(0, 10)}</td>
			) : (
				<td className="text-danger" headers="delivery-status">
					Not paid
				</td>
			)}
			<td>
				<Link className="btn btn-sm btn-light " to={`/orders/${_id}`}>
					Details
				</Link>
			</td>
		</tr>
	);
}

export default OrderRow;
