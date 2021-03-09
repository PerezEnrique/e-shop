import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleProduct } from "../state_management/productsState";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";
import Spinner from "../components/Spinner";
import Alert from "../components/Alert";

function SingleProduct({ match }) {
	const dispatch = useDispatch();
	const { singleProduct, loading, error } = useSelector(state => state.productsReducer);

	useEffect(() => {
		dispatch(fetchSingleProduct(match.params.id));
	}, [dispatch, match.params.id]);

	const {
		name,
		brand,
		image,
		price,
		rating,
		numReviews,
		description,
		countInStock,
	} = singleProduct;
	return (
		<main className="container" role="main">
			<Link to="/">Go back</Link>
			{loading ? (
				<Spinner />
			) : error ? (
				<Alert message={error} />
			) : (
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
			)}
		</main>
	);
}

export default SingleProduct;
