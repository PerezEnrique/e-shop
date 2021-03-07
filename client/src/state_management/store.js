import { configureStore } from "@reduxjs/toolkit";

const reducers = {};

export default function generateStore() {
	return configureStore({ reducer: reducers });
}
