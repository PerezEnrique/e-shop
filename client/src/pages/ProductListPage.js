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
import Pagination from "../components/Pagination";

function ProductList({ history, match }) {
	const page = match.params.page || 1;
	const { currentUser } = useSelector(state => state.users);
	const {
		products,
		loading,
		successfulDeletion,
		currentPage,
		pages,
		error,
	} = useSelector(state => state.products);
	const dispatch = useDispatch();
	useEffect(() => {
		if (currentUser && currentUser.isAdmin) {
			dispatch(fetchProducts("", page));
		} else {
			history.push("/not-authorized");
		}
	}, [currentUser, dispatch, page, history]);

	useEffect(() => {
		if (successfulDeletion) {
			dispatch(fetchProducts("", page));
			dispatch(resetProductDeletionProcess());
		}
	}, [successfulDeletion, dispatch, page]);

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
					<React.Fragment>
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
						<Pagination pages={pages} currentPage={currentPage} adminPage={true} />
					</React.Fragment>
				)}
			</section>
		</main>
	);
}

export default ProductList;
