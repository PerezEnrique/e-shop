import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsState";

const reducers = { productsReducer };

export default function generateStore() {
	return configureStore({ reducer: reducers });
}
