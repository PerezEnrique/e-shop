import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleProduct } from "../state_management/productsState";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";
import { getStockOptions } from "../utils/helpers";
import Spinner from "../components/Spinner";
import Alert from "../components/Alert";

function SingleProduct({ match, history }) {
	const { singleProduct, loading, error } = useSelector(state => state.products);
	const [quantity, setQuantity] = useState(1);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchSingleProduct(match.params.id));
	}, [dispatch, match.params.id]);

	const addToCartHandler = () => {
		history.push(`/cart?productId=${match.params.id}&quantity=${quantity}`);
	};

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
				<Alert type="danger" message={error} />
			) : (
				<div className="card mt-3">
					<div className="row">
						<img className="col-md-6 img-fluid" src={image} alt={name} />
						<section className="col-md-6 py-3 pl-4 pr-5">
							<h1 className="h2">{name}</h1>
							<Rating value={rating} text={`${numReviews} reviews`} />
							<h3 className="h4">${price}</h3>
							<p className="product-desc">{description}</p>
							<dl className="d-flex ">
								<div className="w-25">
									<dt>Brand</dt>
									<dd>{brand}</dd>
								</div>
								<div className="w-25">
									<dt>Status</dt>
									{countInStock > 0 ? (
										<dd>In Stock</dd>
									) : (
										<dd className="text-danger">Out of stock</dd>
									)}
								</div>
							</dl>
							<hr />
							{countInStock > 0 && (
								<div className="d-flex align-items-end">
									<div className="form-group mr-4">
										<label htmlFor="quantity">Quantity</label>
										<select
											className="form-control"
											id="quantity"
											value={quantity}
											onChange={e => setQuantity(e.currentTarget.value)}
										>
											{getStockOptions(countInStock).map(option => (
												<option key={option} value={option}>
													{option}
												</option>
											))}
										</select>
									</div>
									<button
										className="btn btn-primary mb-3"
										onClick={addToCartHandler}
										disabled={countInStock < 1 ? true : false}
									>
										Add to cart
									</button>
								</div>
							)}
						</section>
					</div>
				</div>
			)}
		</main>
	);
}

export default SingleProduct;
