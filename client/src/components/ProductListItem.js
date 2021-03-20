import React from "react";
import { Link } from "react-router-dom";

function ProductListItem({ item }) {
	const { _id, image, name, quantity, price } = item;

	return (
		<li className="list-group-item">
			<div className="row">
				<div className="col-md-1">
					<img className="img-fluid rounded" src={image} alt={name} />
				</div>
				<div className="col-md-6">
					<Link className="text-decoration-none text-dark" to={`/product/${_id}`}>
						{name}
					</Link>
				</div>
				<div className="col-md-4">
					<span>
						{quantity} x ${price} = ${Number(quantity) * Number(price)}
					</span>
				</div>
			</div>
		</li>
	);
}

export default ProductListItem;
