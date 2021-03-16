import { createAction } from "@reduxjs/toolkit";
import http from "../services/httpServices";

//ACTIONS
const USER_SIGNUP_REQUEST = createAction("USER_SIGNUP_REQUEST");
const USER_SIGNUP_SUCCESS = createAction("USER_SIGNUP_SUCCESS");
const USER_SIGNUP_FAIL = createAction("USER_SIGNUP_FAIL");
// const USER_LOGIN_REQUEST = createAction("USER_LOGIN_REQUEST");
// const USER_LOGIN_SUCCESS = createAction("USER_LOGIN_SUCCESS");
// const USER_LOGIN_FAIL = createAction("USER_LOGIN_FAIL");
// const USER_LOGOUT = createAction("USER_LOGOUT");

export const signUp = (email, name, password) => async dispatch => {
	try {
		dispatch(USER_SIGNUP_REQUEST());
		const { data } = await http.post("/user/sign-up", { email, name, password });
		dispatch(USER_SIGNUP_SUCCESS(data.data));
		localStorage.setItem("currentUser", JSON.stringify(data.data));
	} catch (ex) {
		dispatch(
			USER_SIGNUP_FAIL(
				ex.response && ex.response.data.errorMessage
					? ex.response.data.errorMessage
					: ex.message
			)
		);
	}
};

const initialState = {
	currentUser: localStorage.getItem("currentUser")
		? JSON.parse(localStorage.getItem("currentUser"))
		: null,
	loading: false,
	error: null,
};

export function userReducer(state = initialState, action) {
	switch (action.type) {
		case USER_SIGNUP_REQUEST.type:
			return { ...state, loading: true };
		case USER_SIGNUP_SUCCESS.type:
			return { ...state, currentUser: action.payload, loading: false };
		case USER_SIGNUP_FAIL.tyepe:
			return { ...state, loading: false, loginError: action.payload };
		default:
			return state;
	}
}
