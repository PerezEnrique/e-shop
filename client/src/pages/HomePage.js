import React from "react";
import products from "../products";
import ProductCard from "../components/ProductCard";

function HomePage() {
	return (
		<main className="container" role="main">
			<h1 className="mb-4 h2">Latest products</h1>
			<div className="row">
				{products.map(product => (
					<div className="col-sm-12 col-md-6 col-lg-4 col-xl-3" key={product._id}>
						<ProductCard product={product} />
					</div>
				))}
			</div>
		</main>
	);
}

export default HomePage;
