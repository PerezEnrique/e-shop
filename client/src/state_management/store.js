import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsState";
import cartReducer from "./cartState";

const reducers = {
	products: productsReducer,
	cart: cartReducer,
};

export default function generateStore() {
	return configureStore({ reducer: reducers });
}
