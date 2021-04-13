import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./usersState";
import productsReducer from "./productsState";
import cartReducer from "./cartState";
import orderReducer from "./ordersState";

const reducers = {
	users: userReducer,
	products: productsReducer,
	cart: cartReducer,
	orders: orderReducer,
};

export default function generateStore() {
	return configureStore({ reducer: reducers });
}
