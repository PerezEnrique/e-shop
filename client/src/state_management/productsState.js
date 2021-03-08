import { createAction } from "@reduxjs/toolkit";
import http from "../services/httpServices";

const productSFetchingStart = createAction("PRODUCTS_FETCHING_START");
const productsFetchingSuccess = createAction("PRODUCTS_FETCHING_SUCCESS");
const productsFetchingFail = createAction("PRODUCTS_FETCHING_FAIL");

const initialState = {
	products: [],
	loading: false,
	error: null,
};

export const fetchProducts = () => async dispatch => {
	try {
		dispatch(productSFetchingStart());
		const response = await http.get("/products");
		dispatch(productsFetchingSuccess(response.data.data));
	} catch (ex) {
		dispatch(
			productsFetchingFail(
				ex.response && ex.response.data.errorMessage
					? ex.response.data.errorMessage
					: ex.message
			)
		);
	}
};

export default function productReducer(state = initialState, action) {
	switch (action.type) {
		case productSFetchingStart.type:
			return { ...state, loading: true };
		case productsFetchingSuccess.type:
			return { ...state, products: action.payload, loading: false };
		case productsFetchingFail.type:
			return { ...state, loading: false, error: action.payload };
		default:
			return state;
	}
}
