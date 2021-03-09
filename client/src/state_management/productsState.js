import { createAction } from "@reduxjs/toolkit";
import http from "../services/httpServices";

const PRODUCTS_FETCHING_START = createAction("PRODUCTS_FETCHING_START");
const PRODUCTS_FETCHING_SUCCESS = createAction("PRODUCTS_FETCHING_SUCCESS");
const SINGLE_PRODUCT_FETCHING_SUCCESS = createAction("SINGLE_PRODUCT_FETCHING_SUCCESS");
const PRODUCTS_FETCHING_FAIL = createAction("PRODUCTS_FETCHING_FAIL");

const initialState = {
	products: [],
	singleProduct: {},
	loading: false,
	error: null,
};

export const fetchProducts = () => async dispatch => {
	try {
		dispatch(PRODUCTS_FETCHING_START());
		const response = await http.get("/products");
		dispatch(PRODUCTS_FETCHING_SUCCESS(response.data.data));
	} catch (ex) {
		dispatch(
			PRODUCTS_FETCHING_FAIL(
				ex.response && ex.response.data.errorMessage
					? ex.response.data.errorMessage
					: ex.message
			)
		);
	}
};

export const fetchSingleProduct = productId => async dispatch => {
	try {
		dispatch(PRODUCTS_FETCHING_START());
		const response = await http.get(`/products/${productId}`);
		dispatch(SINGLE_PRODUCT_FETCHING_SUCCESS(response.data.data));
	} catch (ex) {
		dispatch(
			PRODUCTS_FETCHING_FAIL(
				ex.response && ex.response.data.errorMessage
					? ex.response.data.errorMessage
					: ex.message
			)
		);
	}
};

export default function productReducer(state = initialState, action) {
	switch (action.type) {
		case PRODUCTS_FETCHING_START.type:
			return { ...state, loading: true };
		case PRODUCTS_FETCHING_SUCCESS.type:
			return { ...state, products: action.payload, loading: false };
		case SINGLE_PRODUCT_FETCHING_SUCCESS.type:
			return { ...state, singleProduct: action.payload, loading: false };
		case PRODUCTS_FETCHING_FAIL.type:
			return { ...state, loading: false, error: action.payload };
		default:
			return state;
	}
}
