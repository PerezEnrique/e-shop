import { createAction } from "@reduxjs/toolkit";
import http from "../services/httpServices";

const CREATE_ORDER_REQUEST = createAction("CREATE_ORDER_REQUEST");
const CREATE_ORDER_SUCCESS = createAction("CREATE_ORDER_SUCCESS");
const CREATE_ORDER_FAILS = createAction("CREATE_ORDER_FAILS");

export const createOrder = order => async dispatch => {
	try {
		dispatch(CREATE_ORDER_REQUEST());
		const { data } = await http.post("/orders", order);
		dispatch(CREATE_ORDER_SUCCESS(data.data));
	} catch (ex) {
		dispatch(
			CREATE_ORDER_FAILS(
				ex.response && ex.response.data.errorMessage
					? ex.response.data.errorMessage
					: `Error ocurred. ${ex.message}` //We cannot just use ex.message because that's taken as not handled
			)
		);
	}
};

const initialState = {
	currentOrder: null,
	successfulOrderCreation: false,
	loading: false,
	error: null,
};

export default function orderReducer(state = initialState, action) {
	switch (action.type) {
		case CREATE_ORDER_REQUEST.type:
			return { ...state, loading: true };
		case CREATE_ORDER_SUCCESS.type:
			return { ...state, currentOrder: action.payload, loading: false };
		case CREATE_ORDER_FAILS.type:
			return { ...state, loading: false, error: action.payload };
		default:
			return state;
	}
}
