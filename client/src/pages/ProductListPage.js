import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
	fetchProducts,
	deleteProduct,
	resetProductDeletionProcess,
} from "../state_management/productsState";
import Spinner from "../components/Spinner";
import Alert from "../components/Alert";

function ProductList({ history }) {
	const { currentUser } = useSelector(state => state.user);
	const { products, loading, successfulDeletion, error } = useSelector(
		state => state.products
	);
	const dispatch = useDispatch();
	useEffect(() => {
		if (currentUser && currentUser.isAdmin) {
			dispatch(fetchProducts());
		} else {
			history.push("/not-authorized");
		}
	}, [currentUser, dispatch, history]);

	useEffect(() => {
		if (successfulDeletion) {
			dispatch(fetchProducts());
			dispatch(resetProductDeletionProcess());
		}
	}, [successfulDeletion, dispatch]);

	const handleDelete = productId => {
		if (window.confirm("Are you sure?")) {
			dispatch(deleteProduct(productId));
		}
	};

	return (
		<main className="container" role="main">
			<div className="d-flex justify-content-between mb-3">
				<h1 className="h3">Products</h1>
				<Link className="btn btn-primary" to="/admin/create-product">
					Add new product
				</Link>
			</div>
			<section>
				{loading ? (
					<Spinner />
				) : error ? (
					<Alert type="danger" message={error} />
				) : products.length < 1 ? (
					<h2 className="h4">No products has been added yet</h2>
				) : (
					<table className="table table-striped">
						<thead>
							<tr>
								<th id="id">Id</th>
								<th id="name">Name</th>
								<th id="brand">Brand</th>
								<th id="price">Price</th>
								<th></th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{products.map(product => (
								<tr key={product._id}>
									<td headers="id">{product._id}</td>
									<td headers="name">{product.name}</td>
									<td headers="brand">{product.brand}</td>
									<td headers="price">${product.price}</td>
									<td>
										<Link
											className="btn btn-sm btn-light"
											to={`/admin/products/${product._id}/update`}
										>
											Edit
										</Link>
									</td>
									<td>
										<button
											className="btn btn-sm btn-danger"
											onClick={() => handleDelete(product._id)}
										>
											Remove
										</button>
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

export default ProductList;
