import React from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";

function ProductCard({ product }) {
	const { _id, image, name, rating, numReviews, price } = product;
	return (
		<div className="card p-3 justify-content-between">
			<Link className="card--media" to={`/products/${_id}`}>
				<img className="img-fluid" src={image} alt={name} />
			</Link>
			<div className="card-body card--body">
				<Link className="text-decoration-none text-dark" to={`/products/${_id}`}>
					<h2 className="card-title h6">{name}</h2>
				</Link>
				<Rating value={rating} text={`${numReviews} reviews`} />
				<h3 className="mb-0 h6">${price}</h3>
			</div>
		</div>
	);
}

export default ProductCard;
