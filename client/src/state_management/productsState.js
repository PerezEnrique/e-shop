import { createAction } from "@reduxjs/toolkit";
import http from "../services/httpServices";

//ACTIONS
const PRODUCTS_FETCHING_REQUEST = createAction("PRODUCTS_FETCHING_REQUEST");
const PRODUCTS_FETCHING_SUCCESS = createAction("PRODUCTS_FETCHING_SUCCESS");
const PRODUCTS_FETCHING_FAILS = createAction("PRODUCTS_FETCHING_FAILS");
const SINGLE_PRODUCT_FETCHING_REQUEST = createAction("SINGLE_PRODUCT_FETCHING_REQUEST");
const SINGLE_PRODUCT_FETCHING_SUCCESS = createAction("SINGLE_PRODUCT_FETCHING_SUCCESS");
const SINGLE_PRODUCT_FETCHING_FAILS = createAction("SINGLE_PRODUCT_FETCHING_FAILS");
const CREATE_PRODUCT_REQUEST = createAction("CREATE_PRODUCT_REQUEST");
const CREATE_PRODUCT_SUCCESS = createAction("CREATE_PRODUCT_SUCCESS");
const CREATE_PRODUCT_FAILS = createAction("CREATE_PRODUCT_FAILS");
const CREATE_PRODUCT_RESET = createAction("CREATE_PRODUCT_RESET");
const UPDATE_PRODUCT_REQUEST = createAction("UPDATE_PRODUCT_REQUEST");
const UPDATE_PRODUCT_SUCCESS = createAction("UPDATE_PRODUCT_SUCCESS");
const UPDATE_PRODUCT_FAILS = createAction("UPDATE_PRODUCT_FAILS");
const UPDATE_PRODUCT_RESET = createAction("UPDATE_PRODUCT_RESET");
const DELETE_PRODUCT_REQUEST = createAction("DELETE_PRODUCT_REQUEST");
const DELETE_PRODUCT_SUCCESS = createAction("DELETE_PRODUCT_SUCCESS");
const DELETE_PRODUCT_FAILS = createAction("DELETE_PRODUCT_FAILS");
const DELETE_PRODUCT_RESET = createAction("DELETE_PRODUCT_RESET");
const REVIEW_PRODUCT_REQUEST = createAction("REVIEW_PRODUCT_REQUEST");
const REVIEW_PRODUCT_SUCCESS = createAction("REVIEW_PRODUCT_SUCCESS");
const REVIEW_PRODUCT_FAILS = createAction("REVIEW_PRODUCT_FAILS");
const REVIEW_PRODUCT_RESET = createAction("REVIEW_PRODUCT_RESET");

export const fetchProducts = (searchTerm = "") => async dispatch => {
	try {
		dispatch(PRODUCTS_FETCHING_REQUEST());
		const {
			data: { data },
		} = await http.get(`/products?term=${searchTerm}`);
		dispatch(PRODUCTS_FETCHING_SUCCESS(data));
	} catch (ex) {
		dispatch(
			PRODUCTS_FETCHING_FAILS(
				ex.response && ex.response.data.errorMessage
					? ex.response.data.errorMessage
					: `Error ocurred. ${ex.message}` //We cannot just use ex.message because that's taken as not handled
			)
		);
	}
};

export const fetchProduct = productId => async dispatch => {
	try {
		dispatch(SINGLE_PRODUCT_FETCHING_REQUEST());
		const {
			data: { data },
		} = await http.get(`/products/${productId}`);
		dispatch(SINGLE_PRODUCT_FETCHING_SUCCESS(data));
	} catch (ex) {
		dispatch(
			SINGLE_PRODUCT_FETCHING_FAILS(
				ex.response && ex.response.data.errorMessage
					? ex.response.data.errorMessage
					: `Error ocurred. ${ex.message}`
			)
		);
	}
};

export const createProduct = productData => async dispatch => {
	try {
		dispatch(CREATE_PRODUCT_REQUEST());
		await http.post("/products", productData);
		dispatch(CREATE_PRODUCT_SUCCESS());
	} catch (ex) {
		dispatch(
			CREATE_PRODUCT_FAILS(
				ex.response && ex.response.data.errorMessage
					? ex.response.data.errorMessage
					: `Error ocurred. ${ex.message}`
			)
		);
	}
};

export const updateProduct = (productId, updatedData) => async dispatch => {
	try {
		dispatch(UPDATE_PRODUCT_REQUEST());
		const {
			data: { data },
		} = await http.put(`/products/${productId}`, updatedData);
		dispatch(UPDATE_PRODUCT_SUCCESS(data));
	} catch (ex) {
		dispatch(
			UPDATE_PRODUCT_FAILS(
				ex.response && ex.response.data.errorMessage
					? ex.response.data.errorMessage
					: `Error ocurred. ${ex.message}`
			)
		);
	}
};

export const deleteProduct = productId => async dispatch => {
	try {
		dispatch(DELETE_PRODUCT_REQUEST());
		await http.delete(`/products/${productId}`);
		dispatch(DELETE_PRODUCT_SUCCESS());
	} catch (ex) {
		dispatch(
			DELETE_PRODUCT_FAILS(
				ex.response && ex.response.data.errorMessage
					? ex.response.data.errorMessage
					: `Error ocurred. ${ex.message}`
			)
		);
	}
};

export const reviewProduct = (productId, rating, comment) => async dispatch => {
	try {
		dispatch(REVIEW_PRODUCT_REQUEST());
		const {
			data: { data },
		} = await http.put(`/products/${productId}/review`, { rating, comment });
		dispatch(REVIEW_PRODUCT_SUCCESS(data));
	} catch (ex) {
		dispatch(
			REVIEW_PRODUCT_FAILS(
				ex.response && ex.response.data.errorMessage
					? ex.response.data.errorMessage
					: `Error ocurred. ${ex.message}`
			)
		);
	}
};

export const resetProductCreationProcess = () => dispatch => {
	dispatch(CREATE_PRODUCT_RESET());
};

export const resetProductUpdateProcess = () => dispatch => {
	dispatch(UPDATE_PRODUCT_RESET());
};

export const resetProductDeletionProcess = () => dispatch => {
	dispatch(DELETE_PRODUCT_RESET());
};
export const resetProductReviewProcess = () => dispatch => {
	dispatch(REVIEW_PRODUCT_RESET());
};

//REDUCER
const initialState = {
	products: [],
	product: {},
	loading: false,
	successfulCreation: false,
	successfulUpdate: false,
	successfulDeletion: false,
	successfulReview: false,
	error: null,
	errorReview: null,
};

export default function productReducer(state = initialState, action) {
	switch (action.type) {
		case PRODUCTS_FETCHING_REQUEST.type:
			return { ...state, loading: true, error: null };
		case PRODUCTS_FETCHING_SUCCESS.type:
			return { ...state, products: action.payload, loading: false };
		case PRODUCTS_FETCHING_FAILS.type:
			return { ...state, loading: false, error: action.payload };
		case SINGLE_PRODUCT_FETCHING_REQUEST.type:
			return { ...state, loading: true, error: null };
		case SINGLE_PRODUCT_FETCHING_SUCCESS.type:
			return { ...state, product: action.payload, loading: false };
		case SINGLE_PRODUCT_FETCHING_FAILS.type:
			return { ...state, loading: false, error: action.payload };
		case CREATE_PRODUCT_REQUEST.type:
			return { ...state, loading: true, error: null };
		case CREATE_PRODUCT_SUCCESS.type:
			return { ...state, loading: false, successfulCreation: true };
		case CREATE_PRODUCT_FAILS.type:
			return { ...state, loading: false, error: action.payload };
		case CREATE_PRODUCT_RESET.type:
			return { ...state, successfulCreation: false };
		case UPDATE_PRODUCT_REQUEST.type:
			return { ...state, loading: true, error: null };
		case UPDATE_PRODUCT_SUCCESS.type:
			return {
				...state,
				product: action.payload,
				loading: false,
				successfulUpdate: true,
			};
		case UPDATE_PRODUCT_FAILS.type:
			return { ...state, loading: false, error: action.payload };
		case UPDATE_PRODUCT_RESET.type:
			return { ...state, successfulUpdate: false };
		case DELETE_PRODUCT_REQUEST.type:
			return { ...state, loading: true, error: null };
		case DELETE_PRODUCT_SUCCESS.type:
			return { ...state, loading: false, successfulDeletion: true };
		case DELETE_PRODUCT_FAILS.type:
			return { ...state, loading: false, error: action.payload };
		case DELETE_PRODUCT_RESET.type:
			return { ...state, successfulDeletion: false };
		case REVIEW_PRODUCT_REQUEST.type:
			return { ...state, loading: true, errorReview: null };
		case REVIEW_PRODUCT_SUCCESS.type:
			return {
				...state,
				product: action.payload,
				loading: false,
				successfulReview: true,
			};
		case REVIEW_PRODUCT_FAILS.type:
			return { ...state, loading: false, errorReview: action.payload };
		case REVIEW_PRODUCT_RESET.type:
			return { ...state, successfulReview: false };
		default:
			return state;
	}
}
