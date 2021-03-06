import { createAction } from "@reduxjs/toolkit";
import http from "../services/httpServices";

const CREATE_ORDER_REQUEST = createAction("CREATE_ORDER_REQUEST");
const CREATE_ORDER_SUCCESS = createAction("CREATE_ORDER_SUCCESS");
const CREATE_ORDER_FAILS = createAction("CREATE_ORDER_FAILS");
const ORDER_FETCHING_REQUEST = createAction("ORDER_FETCHING_REQUEST");
const ORDER_FETCHING_SUCCESS = createAction("ORDER_FETCHING_SUCCESS");
const ORDER_FETCHING_FAILS = createAction("ORDER_FETCHING_FAILS");
const ORDERS_FETCHING_REQUEST = createAction("ORDERS_FETCHING_REQUEST");
const ORDERS_FETCHING_SUCCESS = createAction("ORDERS_FETCHING_SUCCESS");
const ORDERS_FETCHING_FAILS = createAction("ORDERS_FETCHING_FAILS");
const USER_ORDERS_FETCHING_REQUEST = createAction("USER_ORDERS_FETCHING_REQUEST");
const USER_ORDERS_FETCHING_SUCCESS = createAction("USER_ORDERS_FETCHING_SUCCESS");
const USER_ORDERS_FETCHING_FAILS = createAction("USER_ORDERS_FETCHING_FAILS");
const ORDER_PAY_REQUEST = createAction("ORDER_PAY_REQUEST");
const ORDER_PAY_SUCCESS = createAction("ORDER_PAY_SUCCESS");
const ORDER_PAY_FAILS = createAction("ORDER_PAY_FAILS");
const ORDER_PAY_RESET = createAction("ORDER_PAY_RESET");
const ORDER_DELIVER_REQUEST = createAction("ORDER_DELIVER_REQUEST");
const ORDER_DELIVER_SUCCESS = createAction("ORDER_DELIVER_SUCCESS");
const ORDER_DELIVER_FAILS = createAction("ORDER_DELIVER_FAILS");
const ORDER_DELIVER_RESET = createAction("ORDER_DELIVER_RESET");

export const fetchOrders = () => async dispatch => {
	try {
		dispatch(ORDERS_FETCHING_REQUEST());
		const {
			data: { data },
		} = await http.get("/api/orders");
		dispatch(ORDERS_FETCHING_SUCCESS(data));
	} catch (ex) {
		dispatch(
			ORDERS_FETCHING_FAILS(
				ex.response && ex.response.data.errorMessage
					? ex.response.data.errorMessage
					: `Error ocurred. ${ex.message}`
			)
		);
	}
};

export const fetchOrder = orderId => async dispatch => {
	try {
		dispatch(ORDER_FETCHING_REQUEST());
		const {
			data: { data },
		} = await http.get(`/api/orders/${orderId}`);
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

export const fetchUserOrders = () => async dispatch => {
	try {
		dispatch(USER_ORDERS_FETCHING_REQUEST());
		const {
			data: { data },
		} = await http.get("/api/orders/my-orders");
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

export const createOrder = order => async dispatch => {
	try {
		dispatch(CREATE_ORDER_REQUEST());
		const {
			data: { data },
		} = await http.post("/api/orders", order);
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

export const payOrder = (orderId, paymentResult) => async dispatch => {
	try {
		dispatch(ORDER_PAY_REQUEST());
		const {
			data: { data },
		} = await http.put(`/api/orders/${orderId}/pay`, paymentResult);
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

export const deliverOrder = orderId => async dispatch => {
	try {
		dispatch(ORDER_DELIVER_REQUEST());
		const {
			data: { data },
		} = await http.put(`/api/orders/${orderId}/mark-delivered`);
		dispatch(ORDER_DELIVER_SUCCESS(data));
	} catch (ex) {
		dispatch(
			ORDER_DELIVER_FAILS(
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

export const resetOrderDeliverProcess = () => dispatch => {
	dispatch(ORDER_DELIVER_RESET());
};

const initialState = {
	orders: [],
	currentOrder: {
		user: {},
		orderItems: [],
		shippingData: {}, //Estos segundos pisos deben estar definidos, sin importar que vacios, ya que operaremos o destructuraremos sobre ellos en el montado
	},
	successfulCreation: false,
	successfulPayment: false,
	successfulDeliver: false,
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
				successfulCreation: true,
			};
		case CREATE_ORDER_FAILS.type:
			return { ...state, loading: false, error: action.payload };
		case ORDER_FETCHING_REQUEST.type:
			return { ...state, loading: true, error: null };
		case ORDER_FETCHING_SUCCESS.type:
			return { ...state, currentOrder: action.payload, loading: false };
		case ORDER_FETCHING_FAILS.type:
			return { ...state, loading: false, error: action.payload };
		case ORDERS_FETCHING_REQUEST.type:
			return { ...state, loading: true, error: null };
		case ORDERS_FETCHING_SUCCESS.type:
			return { ...state, orders: action.payload, loading: false };
		case ORDERS_FETCHING_FAILS.type:
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
				successfulPayment: true,
			};
		case ORDER_PAY_FAILS.type:
			return { ...state, loading: false, error: action.payload };
		case ORDER_PAY_RESET.type:
			return { ...state, successfulPayment: false };
		case ORDER_DELIVER_REQUEST.type:
			return { ...state, loading: true };
		case ORDER_DELIVER_SUCCESS.type:
			return {
				...state,
				currentOrder: action.payload,
				loading: false,
				successfulDeliver: true,
			};
		case ORDER_DELIVER_FAILS.type:
			return { ...state, loading: false, error: action.payload };
		case ORDER_DELIVER_RESET.type:
			return { ...state, successfulDeliver: false };
		default:
			return state;
	}
}
