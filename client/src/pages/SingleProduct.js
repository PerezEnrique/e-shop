import React from "react";
import { Link } from "react-router-dom";
import products from "../products";
import Rating from "../components/Rating";

function SingleProduct(props) {
	const product = products.find(product => product._id === props.match.params._id);
	const {
		name,
		brand,
		image,
		price,
		rating,
		numReviews,
		description,
		countInStock,
	} = product;
	return (
		<main className="container" role="main">
			<Link to="/">Go back</Link>
			<div className="card mt-3">
				<div className="row">
					<img className="col-md-6 img-fluid" src={image} alt={name} />
					<section className="col-md-6 py-3 pl-4 pr-5">
						<h1 className="h2">{name}</h1>
						<Rating value={rating} text={`${numReviews} reviews`} />
						<h3 className="h4">${price}</h3>
						<p className="product-desc">{description}</p>
						<dl className="row w-50">
							<div className="col">
								<dt>Brand</dt>
								<dd>{brand}</dd>
							</div>
							<div className="col">
								<dt>Status</dt>
								{countInStock > 0 ? (
									<dd>In Stock</dd>
								) : (
									<dd className="text-danger">Out of stock</dd>
								)}
							</div>
						</dl>
						<button
							className="btn btn-primary"
							disabled={countInStock < 1 ? true : false}
						>
							Add to cart
						</button>
					</section>
				</div>
			</div>
		</main>
	);
}

export default SingleProduct;
