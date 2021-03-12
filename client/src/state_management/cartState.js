import { createAction } from "@reduxjs/toolkit";
import http from "../services/httpServices";

//ACTIONS
const PRODUCT_FETCHING_START = createAction("PRODUCT_FETCHING_START");
const ADD_ITEM_TO_CART = createAction("ADD_ITEM_TO_CART");
const PRODUCT_FETCHING_FAILS = createAction("PRODUCT_FETCHING_FAILS");
const REMOVE_ITEM_FROM_CART = createAction("REMOVE_ITEM_FROM_CART");

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

//REDUCER
const initialState = {
	cartItems: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],
	loading: false,
	error: null,
};

export default function cartReducer(state = initialState, action) {
	switch (action.type) {
		case PRODUCT_FETCHING_START.type:
			return { ...state, loading: true };
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
		default:
			return state;
	}
}
