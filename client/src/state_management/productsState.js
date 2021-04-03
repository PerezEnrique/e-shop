import { createAction } from "@reduxjs/toolkit";
import http from "../services/httpServices";

//ACTIONS
const PRODUCTS_FETCHING_REQUEST = createAction("PRODUCTS_FETCHING_REQUEST");
const PRODUCTS_FETCHING_SUCCESS = createAction("PRODUCTS_FETCHING_SUCCESS");
const PRODUCTS_FETCHING_FAILS = createAction("PRODUCTS_FETCHING_FAILS");
const SINGLE_PRODUCT_FETCHING_REQUEST = createAction("SINGLE_PRODUCT_FETCHING_REQUEST");
const SINGLE_PRODUCT_FETCHING_SUCCESS = createAction("SINGLE_PRODUCT_FETCHING_SUCCESS");
const SINGLE_PRODUCT_FETCHING_FAILS = createAction("SINGLE_PRODUCT_FETCHING_FAILS");
const DELETE_PRODUCT_REQUEST = createAction("DELETE_PRODUCT_REQUEST");
const DELETE_PRODUCT_SUCCESS = createAction("DELETE_PRODUCT_SUCCESS");
const DELETE_PRODUCT_FAILS = createAction("DELETE_PRODUCT_FAILS");
const DELETE_PRODUCT_RESET = createAction("DELETE_PRODUCT_RESET");

export const fetchProducts = () => async dispatch => {
	try {
		dispatch(PRODUCTS_FETCHING_REQUEST());
		const {
			data: { data },
		} = await http.get("/products");
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

export const fetchSingleProduct = productId => async dispatch => {
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

export const deleteProduct = productId => async dispatch => {
	try {
		dispatch(DELETE_PRODUCT_REQUEST());
		await http.delete(`/products/${productId}/delete`);
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

export const resetProductDeleteProcess = () => dispatch => {
	dispatch(DELETE_PRODUCT_RESET());
};

//REDUCER
const initialState = {
	products: [],
	singleProduct: {},
	loading: false,
	successfullDeletion: false,
	error: null,
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
			return { ...state, singleProduct: action.payload, loading: false };
		case SINGLE_PRODUCT_FETCHING_FAILS.type:
			return { ...state, loading: false, error: action.payload };
		case DELETE_PRODUCT_REQUEST.type:
			return { ...state, loading: true };
		case DELETE_PRODUCT_SUCCESS.type:
			return { ...state, loading: false, successfullDeletion: true };
		case DELETE_PRODUCT_FAILS.type:
			return { ...state, loading: false, error: action.payload };
		case DELETE_PRODUCT_RESET.type:
			return { ...state, successfullDeletion: false };
		default:
			return state;
	}
}
