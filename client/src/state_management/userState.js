import { createAction } from "@reduxjs/toolkit";
import { decodeToken } from "../utils/helpers";
import http from "../services/httpServices";

//ACTIONS
const USER_SIGNUP_REQUEST = createAction("USER_SIGNUP_REQUEST");
const USER_SIGNUP_SUCCESS = createAction("USER_SIGNUP_SUCCESS");
const USER_SIGNUP_FAILS = createAction("USER_SIGNUP_FAILS");
const USER_LOGIN_REQUEST = createAction("USER_LOGIN_REQUEST");
const USER_LOGIN_SUCCESS = createAction("USER_LOGIN_SUCCESS");
const USER_LOGIN_FAILS = createAction("USER_LOGIN_FAILS");
const USER_LOGOUT = createAction("USER_LOGOUT");
const USER_UPDATE_PROFILE_REQUEST = createAction("USER_UPDATE_PROFILE_REQUEST");
const USER_UPDATE_PROFILE_SUCCESS = createAction("USER_UPDATE_PROFILE_SUCCESS");
const USER_UPDATE_PROFILE_FAILS = createAction("USER_UPDATE_PROFILE_FAILS");

http.setAuthToken(localStorage.getItem("authToken"));

export const signUp = (email, name, password) => async dispatch => {
	try {
		dispatch(USER_SIGNUP_REQUEST());
		const { headers, data } = await http.post("/user/sign-up", { email, name, password });
		dispatch(USER_SIGNUP_SUCCESS(data.data));
		localStorage.setItem("authToken", headers["x-auth-token"]);
	} catch (ex) {
		dispatch(
			USER_SIGNUP_FAILS(
				ex.response && ex.response.data.errorMessage
					? ex.response.data.errorMessage
					: ex.message
			)
		);
	}
};

export const logIn = (email, password) => async dispatch => {
	try {
		dispatch(USER_LOGIN_REQUEST());
		const { headers, data } = await http.post("/user/log-in", { email, password });
		dispatch(USER_LOGIN_SUCCESS(data.data));
		localStorage.setItem("authToken", headers["x-auth-token"]);
	} catch (ex) {
		dispatch(
			USER_LOGIN_FAILS(
				ex.response && ex.response.data.errorMessage
					? ex.response.data.errorMessage
					: ex.message
			)
		);
	}
};

export const logOut = () => dispatch => {
	localStorage.removeItem("authToken");
	dispatch(USER_LOGOUT());
	window.location = "/";
};

export const updateProfile = (email, name, password) => async dispatch => {
	try {
		let dataToUpdate = {};
		if (!password || password === "") {
			dataToUpdate = { email, name };
		} else {
			dataToUpdate = { email, name, password };
		}
		dispatch(USER_UPDATE_PROFILE_REQUEST());
		const { headers, data } = http.put("/user", dataToUpdate);
		dispatch(USER_UPDATE_PROFILE_SUCCESS(data.data));
		localStorage.setItem("authToken", headers["x-auth-token"]);
	} catch (ex) {
		dispatch(
			USER_UPDATE_PROFILE_FAILS(
				ex.response && ex.response.data.errorMessage
					? ex.response.data.errorMessage
					: ex.message
			)
		);
	}
};

const initialState = {
	currentUser: localStorage.getItem("authToken")
		? decodeToken(localStorage.getItem("authToken"))
		: null,
	loading: false,
	successfulUpdate: false,
	error: null,
};

export function userReducer(state = initialState, action) {
	switch (action.type) {
		case USER_SIGNUP_REQUEST.type:
			return { ...state, loading: true };
		case USER_SIGNUP_SUCCESS.type:
			return { ...state, currentUser: action.payload, loading: false };
		case USER_SIGNUP_FAILS.type:
			return { ...state, loading: false, error: action.payload };
		case USER_LOGIN_REQUEST.type:
			return { ...state, loading: true };
		case USER_LOGIN_SUCCESS.type:
			return { ...state, currentUser: action.payload, loading: false };
		case USER_LOGIN_FAILS.type:
			return { ...state, loading: false, error: action.payload };
		case USER_LOGOUT.type:
			return { ...state, currentUser: null };
		case USER_UPDATE_PROFILE_REQUEST.type:
			return { ...state, loading: true };
		case USER_UPDATE_PROFILE_SUCCESS.type:
			return {
				...state,
				currentUser: action.payload,
				loading: false,
				successfulUpdate: true,
			};
		case USER_UPDATE_PROFILE_FAILS.type:
			return { ...state, loading: false, successfulUpdate: false, error: action.payload };
		default:
			return state;
	}
}
