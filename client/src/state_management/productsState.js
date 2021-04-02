import { createAction } from "@reduxjs/toolkit";
import http from "../services/httpServices";

//ACTIONS
const PRODUCTS_FETCHING_REQUEST = createAction("PRODUCTS_FETCHING_REQUEST");
const PRODUCTS_FETCHING_SUCCESS = createAction("PRODUCTS_FETCHING_SUCCESS");
const PRODUCTS_FETCHING_FAILS = createAction("PRODUCTS_FETCHING_FAILS");
const SINGLE_PRODUCT_FETCHING_REQUEST = createAction("SINGLE_PRODUCT_FETCHING_REQUEST");
const SINGLE_PRODUCT_FETCHING_SUCCESS = createAction("SINGLE_PRODUCT_FETCHING_SUCCESS");
const SINGLE_PRODUCT_FETCHING_FAILS = createAction("SINGLE_PRODUCT_FETCHING_FAILS");

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
					: ex.message
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
					: ex.message
			)
		);
	}
};

//REDUCER
const initialState = {
	products: [],
	singleProduct: {},
	loading: false,
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
		default:
			return state;
	}
}
