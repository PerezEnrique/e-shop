import { createAction } from "@reduxjs/toolkit";
import http from "../services/httpServices";

const CREATE_ORDER_REQUEST = createAction("CREATE_ORDER_REQUEST");
const CREATE_ORDER_SUCCESS = createAction("CREATE_ORDER_SUCCESS");
const CREATE_ORDER_FAILS = createAction("CREATE_ORDER_FAILS");
const ORDER_FETCHING_REQUEST = createAction("ORDER_FETCHING_REQUEST");
const ORDER_FETCHING_SUCCESS = createAction("ORDER_FETCHING_SUCCESS");
const ORDER_FETCHING_FAILS = createAction("ORDER_FETCHING_FAILS");
const USER_ORDERS_FETCHING_REQUEST = createAction("USER_ORDERS_FETCHING_REQUEST");
const USER_ORDERS_FETCHING_SUCCESS = createAction("USER_ORDERS_FETCHING_SUCCESS");
const USER_ORDERS_FETCHING_FAILS = createAction("USER_ORDERS_FETCHING_FAILS");
const ORDER_PAY_REQUEST = createAction("ORDER_PAY_REQUEST");
const ORDER_PAY_SUCCESS = createAction("ORDER_PAY_SUCCESS");
const ORDER_PAY_FAILS = createAction("ORDER_PAY_FAILS");
const ORDER_PAY_RESET = createAction("ORDER_PAY_RESET");

export const createOrder = order => async dispatch => {
	try {
		dispatch(CREATE_ORDER_REQUEST());
		const {
			data: { data },
		} = await http.post("/orders", order);
		dispatch(CREATE_ORDER_SUCCESS(data));
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

export const getOrder = orderId => async dispatch => {
	try {
		dispatch(ORDER_FETCHING_REQUEST());
		const {
			data: { data },
		} = await http.get(`/orders/${orderId}`);
		dispatch(ORDER_FETCHING_SUCCESS(data));
	} catch (ex) {
		dispatch(
			ORDER_FETCHING_FAILS(
				ex.response && ex.response.data.errorMessage
					? ex.response.data.errorMessage
					: `Error ocurred. ${ex.message}`
			)
		);
	}
};

export const getUserOrders = () => async dispatch => {
	try {
		dispatch(USER_ORDERS_FETCHING_REQUEST());
		const {
			data: { data },
		} = await http.get("/orders/my-orders");
		dispatch(USER_ORDERS_FETCHING_SUCCESS(data));
	} catch (ex) {
		dispatch(
			USER_ORDERS_FETCHING_FAILS(
				ex.response && ex.response.data.errorMessage
					? ex.response.data.errorMessage
					: `Error ocurred. ${ex.message}`
			)
		);
	}
};

export const payOrder = (orderId, paymentResult) => async dispatch => {
	try {
		dispatch(ORDER_PAY_REQUEST());
		const {
			data: { data },
		} = await http.put(`/orders/${orderId}/pay`, paymentResult);
		dispatch(ORDER_PAY_SUCCESS(data));
	} catch (ex) {
		dispatch(
			ORDER_PAY_FAILS(
				ex.response && ex.response.data.errorMessage
					? ex.response.data.errorMessage
					: `Error ocurred. ${ex.message}`
			)
		);
	}
};

export const resetOrderPaymentProcess = () => dispatch => {
	dispatch(ORDER_PAY_RESET());
};

const initialState = {
	currentOrder: {
		user: {},
		orderItems: [],
		shippingData: {}, //Estos segundos pisos deben estar definidos, sin importar que vacios, ya que operaremos o destructuraremos sobre ellos en el montado
	},
	successfulOrderCreation: false,
	succesfulOrderPayment: false,
	userOrders: [],
	loading: false,
	error: null,
};

export default function orderReducer(state = initialState, action) {
	switch (action.type) {
		case CREATE_ORDER_REQUEST.type:
			return { ...state, loading: true, error: null };
		case CREATE_ORDER_SUCCESS.type:
			return {
				...state,
				currentOrder: action.payload,
				loading: false,
				successfulOrderCreation: true,
			};
		case CREATE_ORDER_FAILS.type:
			return { ...state, loading: false, error: action.payload };
		case ORDER_FETCHING_REQUEST.type:
			return { ...state, loading: true, error: null };
		case ORDER_FETCHING_SUCCESS.type:
			return { ...state, currentOrder: action.payload, loading: false };
		case ORDER_FETCHING_FAILS.type:
			return { ...state, loading: false, error: action.payload };
		case USER_ORDERS_FETCHING_REQUEST.type:
			return { ...state, loading: true, error: null };
		case USER_ORDERS_FETCHING_SUCCESS.type:
			return { ...state, userOrders: action.payload, loading: false };
		case USER_ORDERS_FETCHING_FAILS.type:
			return { ...state, loading: false, error: action.payload };
		case ORDER_PAY_REQUEST.type:
			return { ...state, loading: true };
		case ORDER_PAY_SUCCESS.type:
			return {
				...state,
				currentOrder: action.payload,
				loading: false,
				successfulOrderPayment: true,
			};
		case ORDER_PAY_FAILS.type:
			return { ...state, loading: false, error: action.payload };
		case ORDER_PAY_RESET.type:
			return { ...state, successfulOrderPayment: false };
		default:
			return state;
	}
}
