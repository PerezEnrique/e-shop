import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addItem, removeItem } from "../state_management/cartState";
import getStockOptions from "../utils/getStockOptions";

function ProductRow({ item }) {
	const { _id, name, image, brand, price, countInStock, quantity } = item;
	const dispatch = useDispatch();

	return (
		<tr className="row">
			<td className="col-md-2" headers="image">
				<img className="img-fluid rounded" src={image} alt={name} />
			</td>
			<td className="col-md-4" headers="product-name">
				<Link className="text-decoration-none text-dark" to={`/products/${_id}`}>
					{name}
				</Link>
				<dl className="mt-2 small text-muted">
					<div>
						<dt className="d-inline">Brand: </dt>
						<dd className="d-inline">{brand}</dd>
					</div>
					<div>
						<dt className="d-inline">Memory: </dt>
						<dd className="d-inline">6/128</dd>
					</div>
				</dl>
			</td>
			<td className="col-md-2 text-center font-weight-bold" headers="price">
				<p>${price}</p>
			</td>
			<td className="col-md-2" headers="quantity">
				<select
					className="form-control"
					value={quantity}
					onChange={e => dispatch(addItem(_id, e.currentTarget.value))}
				>
					{getStockOptions(countInStock).map(option => (
						<option key={option} value={option}>
							{option}
						</option>
					))}
				</select>
			</td>
			<td className="col-md-2">
				<button className="btn btn-light" onClick={() => dispatch(removeItem(_id))}>
					Remove
				</button>
			</td>
		</tr>
	);
}

export default ProductRow;
