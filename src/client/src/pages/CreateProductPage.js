import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
	createProduct,
	resetProductCreationProcess,
} from "../state_management/productsState";
import { validateProductData } from "../utils/validation";
import { objectIsEmpty } from "../utils/helpers";
import Spinner from "../components/Spinner";
import Alert from "../components/Alert";

function CreateProductPage({ history }) {
	const { successfulCreation, loading, error } = useSelector(state => state.products);
	const [name, setName] = useState("");
	const [brand, setBrand] = useState("");
	const [price, setPrice] = useState(0);
	const [image, setImage] = useState({});
	const [description, setDescription] = useState("");
	const [countInStock, setCountInStock] = useState(0);
	const [validationErrors, setValidationErrors] = useState({});
	const dispatch = useDispatch();

	useEffect(() => {
		if (successfulCreation) {
			dispatch(resetProductCreationProcess());
			history.push("/admin/products-list");
		}
	}, [successfulCreation, dispatch, history]);

	const handleSubmit = e => {
		e.preventDefault();
		const errorsFromValidation = validateProductData({
			name,
			brand,
			price,
			image,
			description,
			countInStock,
		});
		if (!objectIsEmpty(errorsFromValidation)) {
			setValidationErrors(errorsFromValidation);
		} else {
			const formData = new FormData();
			formData.append("name", name);
			formData.append("brand", brand);
			formData.append("price", price);
			formData.append("image", image);
			formData.append("description", description);
			formData.append("countInStock", countInStock);
			dispatch(createProduct(formData));
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
							<form onSubmit={handleSubmit} id="productForm">
								<div className="form-group">
									<label htmlFor="name">Name</label>
									<input
										className="form-control"
										type="text"
										id="name"
										name="name"
										value={name}
										onChange={e => setName(e.currentTarget.value)}
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
										value={brand}
										onChange={e => setBrand(e.currentTarget.value)}
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
										step=".01"
										id="price"
										name="price"
										min={0}
										value={price}
										onChange={e => setPrice(e.currentTarget.value)}
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
										value={description}
										onChange={e => setDescription(e.currentTarget.value)}
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
										value={countInStock}
										onChange={e => setCountInStock(e.currentTarget.value)}
										required
									/>
									{validationErrors.countInStock && (
										<Alert type="danger" message={validationErrors.countInStock} />
									)}
								</div>
								<div className="form-group">
									<label htmlFor="image">Product image</label>
									<input
										className="form-control-file"
										type="file"
										id="image"
										name="image"
										onChange={e => setImage(e.currentTarget.files[0])}
										required
									/>
									{validationErrors.image && (
										<Alert type="danger" message={validationErrors.image} />
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
