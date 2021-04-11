import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../state_management/productsState";
import ProductCard from "../components/ProductCard";
import Spinner from "../components/Spinner";
import Alert from "../components/Alert";
import Pagination from "../components/Pagination";

function HomePage({ match }) {
	const { products, loading, pages, currentPage, error } = useSelector(
		state => state.products
	);
	const searchTerm = match.params.term;
	const page = match.params.page || 1; //Switching between pages won't trigger this constans. This only gets a value when page refresh.
	const dispatch = useDispatch();

	useEffect(() => dispatch(fetchProducts(searchTerm, page)), [
		dispatch,
		searchTerm,
		page,
	]);

	return (
		<main className="container" role="main">
			<h1 className="mb-4 h2">Latest products</h1>
			{loading ? (
				<Spinner />
			) : error ? (
				<Alert type="danger" message={error} />
			) : (
				<div className="row">
					{products.map(product => (
						<div className="col-sm-12 col-md-6 col-lg-4 col-xl-3" key={product._id}>
							<ProductCard product={product} />
						</div>
					))}
				</div>
			)}
			<Pagination pages={pages} currentPage={currentPage} searchTerm={searchTerm} />
		</main>
	);
}

export default HomePage;
