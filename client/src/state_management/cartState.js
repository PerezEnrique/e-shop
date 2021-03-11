import { createAction } from "@reduxjs/toolkit";
import http from "../services/httpServices";

const PRODUCT_FETCHING_START = createAction("PRODUCT_FETCHING_START");
const ADD_ITEM_TO_CART = createAction("ADD_ITEM_TO_CART");
const PRODUCT_FETCHING_FAILS = createAction("PRODUCT_FETCHING_FAILS");

const initialState = {
	cartItems: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],
};

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

export default function cartReducer(state = initialState, action) {
	switch (action.type) {
		case ADD_ITEM_TO_CART.type:
			const newItem = action.payload;
			const sameItemAlreadyOnCart = state.cartItems.find(item => item.id === newItem.id);
			if (sameItemAlreadyOnCart) {
				return {
					...state,
					cartItems: state.cartItems.map(item => {
						if (item.id === newItem.id) {
							return newItem;
						}

						return item;
					}),
				};
			}
			return { ...state, cartItems: [...state.cartItems, newItem] };
		default:
			return state;
	}
}
