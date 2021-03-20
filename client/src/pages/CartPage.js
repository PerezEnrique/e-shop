import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import queryString from "query-string";
import { addItem } from "../state_management/cartState";
import ProductRow from "../components/ProductRow";
import Spinner from "../components/Spinner";

function CartPage({ location, history }) {
	const { cartItems, loading } = useSelector(state => state.cart);
	const dispatch = useDispatch();
	const { productId, quantity } = queryString.parse(location.search);

	useEffect(() => {
		if (productId) {
			dispatch(addItem(productId, quantity));
		}
	}, [dispatch, productId, quantity]);

	const checkoutHandler = () => {
		history.push("/shipping");
	};

	return (
		<main className="container" role="main">
			<h1 className="mb-4 h2">Shopping cart</h1>
			{loading ? (
				<div>
					<Spinner />
					<h2>Loading your products...</h2>
				</div>
			) : cartItems.length < 1 ? (
				<h2>
					Your cart is empty <Link to="/">go back</Link> to add some products
				</h2>
			) : (
				<div className="row justify-content-between align-items-start">
					<section className="col-md-8 card">
						<table className="table table-borderless">
							<thead className="text-muted">
								<tr className="row small text-center text-uppercase">
									<th className="col-md-2" id="image">
										Image
									</th>
									<th className="col-md-4" id="product-name">
										Product
									</th>
									<th className="col-md-2" id="price">
										Price
									</th>
									<th className="col-md-2" id="quantity">
										Quantity
									</th>
								</tr>
							</thead>
							<tbody>
								{cartItems.map(item => (
									<ProductRow key={item._id} item={item} />
								))}
							</tbody>
						</table>
					</section>
					<section className="col-md-3 card">
						<div className="card-body">
							<h2 className="h4">Subtotal</h2>
							<p className="card-text">
								$
								{cartItems
									.reduce(
										(acc, item) => acc + Number(item.quantity) * Number(item.price),
										0
									)
									.toFixed(2)}
							</p>
							<hr />
							<button
								className="btn btn-block btn-primary"
								onClick={checkoutHandler}
								disabled={cartItems.length < 1}
							>
								Proceed to checkout
							</button>
						</div>
					</section>
				</div>
			)}
		</main>
	);
}

export default CartPage;
