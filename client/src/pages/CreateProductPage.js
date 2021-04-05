import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
	createProduct,
	resetProductCreateProcess,
} from "../state_management/productsState";
import { validateProductData } from "../utils/validation";
import { objectIsEmpty } from "../utils/helpers";
import Spinner from "../components/Spinner";
import Alert from "../components/Alert";

function CreateProductPage({ history }) {
	const { successfullCreation, loading, error } = useSelector(state => state.products);
	const [productData, setProductData] = useState({
		name: "",
		brand: "",
		price: 0,
		description: "",
		countInStock: 0,
	});
	const [validationErrors, setValidationErrors] = useState({});
	const dispatch = useDispatch();

	useEffect(() => {
		if (successfullCreation) {
			dispatch(resetProductCreateProcess());
			history.push("/admin/products-list");
		}
	}, [successfullCreation, dispatch, history]);

	const handleChange = e => {
		setValidationErrors({});
		const { name, value } = e.currentTarget;
		const data = { ...productData };
		data[name] = value;
		setProductData(data);
	};

	const handleSubmit = e => {
		e.preventDefault();
		const errorsFromValidation = validateProductData(productData);
		if (!objectIsEmpty(errorsFromValidation)) {
			setValidationErrors(errorsFromValidation);
		} else {
			dispatch(createProduct(productData));
		}
	};

	return (
		<div className="container">
			<Link to="/admin/products-list">Go back</Link>
			<main role="main">
				<h1>Create a new Product</h1>
				{loading && <Spinner />}
				<section className="row justify-content-center">
					<div className="card col-10 col-md-6 mt-4">
						<div className="card-body text-left">
							<form onSubmit={handleSubmit}>
								<div className="form-group">
									<label htmlFor="name">Name</label>
									<input
										className="form-control"
										type="text"
										id="name"
										name="name"
										value={productData.name}
										onChange={handleChange}
										placeholder="Enter product name"
										required
									/>
									{validationErrors.name && (
										<Alert type="danger" message={validationErrors.name} />
									)}
								</div>
								<div className="form-group">
									<label htmlFor="brand">Brand</label>
									<input
										className="form-control"
										type="text"
										id="brand"
										name="brand"
										value={productData.brand}
										onChange={handleChange}
										placeholder="Enter product brand"
										required
									/>
									{validationErrors.brand && (
										<Alert type="danger" message={validationErrors.brand} />
									)}
								</div>
								<div className="form-group">
									<label htmlFor="price">Price ($)</label>
									<input
										className="form-control"
										type="number"
										id="price"
										name="price"
										min={0}
										value={productData.price}
										onChange={handleChange}
										required
									/>
									{validationErrors.price && (
										<Alert type="danger" message={validationErrors.price} />
									)}
								</div>
								<div className="form-group">
									<label htmlFor="description">Description</label>
									<textarea
										className="form-control"
										id="description"
										name="description"
										value={productData.description}
										onChange={handleChange}
										row={4}
										placeholder="Enter product description"
										required
									/>
									{validationErrors.description && (
										<Alert type="danger" message={validationErrors.description} />
									)}
								</div>
								<div className="form-group">
									<label htmlFor="countInStock">Count in stock</label>
									<input
										className="form-control"
										type="number"
										min={0}
										id="countInStock"
										name="countInStock"
										value={productData.countInStock}
										onChange={handleChange}
										required
									/>
									{validationErrors.countInStock && (
										<Alert type="danger" message={validationErrors.countInStock} />
									)}
								</div>
								{error && <Alert type="danger" message={error} />}
								<div className="text-center">
									<button className="btn btn-primary" type="submit" disabled={loading}>
										Create
									</button>
								</div>
							</form>
						</div>
					</div>
				</section>
			</main>
		</div>
	);
}

export default CreateProductPage;
