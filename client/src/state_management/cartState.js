import { createAction } from "@reduxjs/toolkit";
import http from "../services/httpServices";

//ACTIONS
const PRODUCT_FETCHING_START = createAction("PRODUCT_FETCHING_START");
const ADD_ITEM_TO_CART = createAction("ADD_ITEM_TO_CART");
const PRODUCT_FETCHING_FAILS = createAction("PRODUCT_FETCHING_FAILS");
const REMOVE_ITEM_FROM_CART = createAction("REMOVE_ITEM_FROM_CART");
const SET_PRICES = createAction("SET_PRICES");
const SAVE_SHIPPING_DATA = createAction("SAVE_SHIPPING_DATA");
const SAVE_PAYMENT_METHOD = createAction("SAVE_PAYMENT_METHOD");

export const addItem = (productId, quantity) => async (dispatch, getState) => {
	try {
		dispatch(PRODUCT_FETCHING_START());
		const { data } = await http.get(`/products/${productId}`);
		const item = {
			...data.data,
			quantity: Number(quantity),
		};
		dispatch(ADD_ITEM_TO_CART(item));
		localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
	} catch (ex) {
		dispatch(
			PRODUCT_FETCHING_FAILS(
				ex.response && ex.response.data.errorMessage
					? ex.response.data.errorMessage
					: ex.message
			)
		);
	}
};

export const removeItem = productId => (dispatch, getState) => {
	dispatch(REMOVE_ITEM_FROM_CART(productId));
	localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingData = data => dispatch => {
	dispatch(SAVE_SHIPPING_DATA(data));
	localStorage.setItem("shippingData", JSON.stringify(data));
};

export const savePaymentMethod = data => dispatch => {
	dispatch(SAVE_PAYMENT_METHOD(data));
	localStorage.setItem("paymentMethod", JSON.stringify(data));
};

export const setPrices = () => (dispatch, getState) => {
	const cartItems = [...getState().cart.cartItems];
	const prices = {};

	prices.itemsPrice = cartItems
		.reduce((acc, item) => acc + Number(item.quantity) * Number(item.price), 0)
		.toFixed(2);

	prices.shippingPrice = (Number(prices.itemsPrice) > 100 ? 0 : 10).toFixed(2);

	prices.taxPrice = (Number(prices.itemsPrice) * 0.16).toFixed(2);

	prices.totalPrice = (
		Number(prices.itemsPrice) +
		Number(prices.shippingPrice) +
		Number(prices.taxPrice)
	).toFixed(2);

	dispatch(SET_PRICES(prices));
};

//REDUCER
const initialState = {
	cartItems: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],
	itemsPrice: null,
	shippingPrice: null,
	taxPrice: null,
	totalPrice: null,
	shippingData: localStorage.getItem("shippingData")
		? JSON.parse(localStorage.getItem("shippingData"))
		: {},
	paymentMethod: "paypal",
	loading: false,
	error: null,
};

export default function cartReducer(state = initialState, action) {
	switch (action.type) {
		case PRODUCT_FETCHING_START.type:
			return { ...state, loading: true, error: null };
		case ADD_ITEM_TO_CART.type:
			const newItem = action.payload;
			const sameItemAlreadyOnCart = state.cartItems.find(
				item => item._id === newItem._id
			);
			if (sameItemAlreadyOnCart) {
				return {
					...state,
					cartItems: state.cartItems.map(item => {
						if (item._id === newItem._id) {
							return newItem;
						}

						return item;
					}),
					loading: false,
				};
			}
			return { ...state, cartItems: [...state.cartItems, newItem], loading: false };
		case PRODUCT_FETCHING_FAILS.type:
			return { ...state, loading: false, error: action.payload };
		case REMOVE_ITEM_FROM_CART.type:
			return {
				...state,
				cartItems: state.cartItems.filter(item => item._id !== action.payload),
			};
		case SET_PRICES.type:
			const { itemsPrice, shippingPrice, taxPrice, totalPrice } = action.payload;
			return { ...state, itemsPrice, shippingPrice, taxPrice, totalPrice };
		case SAVE_SHIPPING_DATA.type:
			return {
				...state,
				shippingData: action.payload,
			};
		case SAVE_PAYMENT_METHOD.type:
			return {
				...state,
				paymentMethod: action.payload,
			};
		default:
			return state;
	}
}
