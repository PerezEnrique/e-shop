import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userState";
import productsReducer from "./productsState";
import cartReducer from "./cartState";
import orderReducer from "./orderState";

const reducers = {
	user: userReducer,
	products: productsReducer,
	cart: cartReducer,
	order: orderReducer,
};

export default function generateStore() {
	return configureStore({ reducer: reducers });
}
