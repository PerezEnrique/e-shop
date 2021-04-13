import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	fetchProduct,
	reviewProduct,
	resetProductReviewProcess,
} from "../state_management/productsState";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";
import { getStockOptions } from "../utils/helpers";
import Review from "../components/Review";
import Spinner from "../components/Spinner";
import Alert from "../components/Alert";

function SingleProduct({ match, history }) {
	const {
		product: {
			_id,
			name,
			brand,
			image,
			price,
			rating,
			reviews,
			description,
			countInStock,
		},
		loading,
		successfulReview,
		error,
		errorReview,
	} = useSelector(state => state.products);
	const { currentUser } = useSelector(state => state.users);

	const [quantity, setQuantity] = useState(1);
	const [userRating, setUserRating] = useState(0);
	const [userComment, setUserComment] = useState("");
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchProduct(match.params.id));
	}, [dispatch, match.params.id]);

	useEffect(() => {
		if (successfulReview) {
			setUserRating(0);
			setUserComment("");
			dispatch(resetProductReviewProcess());
		}
	}, [dispatch, successfulReview]);

	const addToCartHandler = () => {
		history.push(`/cart?productId=${match.params.id}&quantity=${quantity}`);
	};

	const handleSubmit = e => {
		e.preventDefault();
		dispatch(reviewProduct(_id, userRating, userComment));
	};

	return (
		<main className="container" role="main">
			<Link to="/">Go back</Link>
			{loading ? (
				<Spinner />
			) : error ? (
				<Alert type="danger" message={error} />
			) : (
				<div>
					<section className="row mb-4">
						<div className="card mt-3">
							<div className="row">
								<img className="col-md-6 img-fluid" src={image} alt={name} />
								<section className="col-md-6 py-3 pl-4 pr-5">
									<h1 className="h2">{name}</h1>
									<Rating
										value={rating}
										text={reviews ? `${reviews.length} reviews` : "0 reviews"}
									/>
									<h3 className="h4 mt-2">${price}</h3>
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
					</section>
					<section className="w-75 mb-4">
						<h2 className="h3 mb-3">Reviews</h2>
						{reviews && reviews.length === 0 && <p className="text-muted">No reviews</p>}
						{reviews &&
							reviews.map(review => <Review key={Review._id} review={review} />)}
					</section>
					<section className="w-50 mb-4">
						<h3 className="h4 mb-3">Write a costumer review</h3>
						{errorReview && <Alert type="danger" message={errorReview} />}
						{!currentUser ? (
							<Alert type="warning" message="Please log in to write a review" />
						) : (
							<form onSubmit={handleSubmit}>
								<div className="form-group">
									<label htmlFor="rating">Rating</label>
									<select
										className="form-control"
										id="rating"
										value={userRating}
										onChange={e => setUserRating(e.currentTarget.value)}
									>
										<option value="">Select...</option>
										<option value="1">1 - Poor</option>
										<option value="2">2 - Fair</option>
										<option value="3">3 - Good</option>
										<option value="4">4 - Very good</option>
										<option value="5">5 - Excelent</option>
									</select>
								</div>
								<div className="form-group">
									<label htmlFor="comment">Review comment</label>
									<textarea
										className="form-control"
										id="comment"
										name="comment"
										value={userComment}
										onChange={e => setUserComment(e.currentTarget.value)}
										row={4}
										placeholder="Enter a comment"
									/>
								</div>
								{successfulReview && <Alert type="success" message="Review submitted" />}
								<button className="btn btn-primary">Submit</button>
							</form>
						)}
					</section>
				</div>
			)}
		</main>
	);
}

export default SingleProduct;
