import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../state_management/productsState";
import ProductCard from "../components/ProductCard";
import Spinner from "../components/Spinner";
import Alert from "../components/Alert";

function HomePage() {
	const dispatch = useDispatch();
	const { products, loading, error } = useSelector(state => state.productsReducer);

	useEffect(() => dispatch(fetchProducts()), [dispatch]);

	return (
		<main className="container" role="main">
			<h1 className="mb-4 h2">Latest products</h1>
			{loading ? (
				<Spinner />
			) : error ? (
				<Alert message={error} />
			) : (
				<div className="row">
					{products.map(product => (
						<div className="col-sm-12 col-md-6 col-lg-4 col-xl-3" key={product._id}>
							<ProductCard product={product} />
						</div>
					))}
				</div>
			)}
		</main>
	);
}

export default HomePage;
