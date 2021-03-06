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
const USERS_FETCHING_REQUEST = createAction("USERS_FETCHING_REQUEST");
const USERS_FETCHING_SUCCESS = createAction("USERS_FETCHING_SUCCESS");
const USERS_FETCHING_FAILS = createAction("USERS_FETCHING_FAILS");
const USER_FETCHING_REQUEST = createAction("USER_FETCHING_REQUEST");
const USER_FETCHING_SUCCESS = createAction("USER_FETCHING_SUCCESS");
const USER_FETCHING_FAILS = createAction("USER_FETCHING_FAILS");
const EDIT_ADMIN_STATUS_REQUEST = createAction("EDIT_ADMIN_STATUS_REQUEST");
const EDIT_ADMIN_STATUS_SUCCESS = createAction("EDIT_ADMIN_STATUS_SUCCESS");
const EDIT_ADMIN_STATUS_FAILS = createAction("EDIT_ADMIN_STATUS_FAILS");
const EDIT_ADMIN_STATUS_RESET = createAction("EDIT_ADMIN_STATUS_RESET");

http.setAuthToken(localStorage.getItem("authToken")); //If no token the property simply will be undefinned

export const signUp = userData => async dispatch => {
	try {
		dispatch(USER_SIGNUP_REQUEST());
		const {
			headers,
			data: { data },
		} = await http.post("/api/users/sign-up", userData);
		dispatch(USER_SIGNUP_SUCCESS(data));
		localStorage.setItem("authToken", headers["x-auth-token"]);
		http.setAuthToken(localStorage.getItem("authToken"));
	} catch (ex) {
		dispatch(
			USER_SIGNUP_FAILS(
				ex.response && ex.response.data.errorMessage
					? ex.response.data.errorMessage
					: `Error ocurred. ${ex.message}` //We cannot just use ex.message because that's taken as not handled
			)
		);
	}
};

export const logIn = userData => async dispatch => {
	try {
		dispatch(USER_LOGIN_REQUEST());
		const {
			headers,
			data: { data },
		} = await http.post("/api/users/log-in", userData);
		dispatch(USER_LOGIN_SUCCESS(data));
		localStorage.setItem("authToken", headers["x-auth-token"]);
		http.setAuthToken(localStorage.getItem("authToken"));
	} catch (ex) {
		dispatch(
			USER_LOGIN_FAILS(
				ex.response && ex.response.data.errorMessage
					? ex.response.data.errorMessage
					: `Error ocurred. ${ex.message}`
			)
		);
	}
};

export const logOut = () => dispatch => {
	localStorage.removeItem("authToken");
	localStorage.removeItem("shippingData");
	localStorage.removeItem("paymentMethod");
	dispatch(USER_LOGOUT());
	window.location = "/"; //This will refresh the pay and delete the data stored in memory
};

export const updateProfile = dataToUpdate => async dispatch => {
	try {
		dispatch(USER_UPDATE_PROFILE_REQUEST());
		const {
			headers,
			data: { data },
		} = await http.put("/api/users", dataToUpdate);
		dispatch(USER_UPDATE_PROFILE_SUCCESS(data));
		localStorage.setItem("authToken", headers["x-auth-token"]);
		http.setAuthToken(localStorage.getItem("authToken"));
	} catch (ex) {
		dispatch(
			USER_UPDATE_PROFILE_FAILS(
				ex.response && ex.response.data.errorMessage
					? ex.response.data.errorMessage
					: `Error ocurred. ${ex.message}`
			)
		);
	}
};

export const fetchUsers = () => async dispatch => {
	try {
		dispatch(USERS_FETCHING_REQUEST());
		const {
			data: { data },
		} = await http.get("/api/users");
		dispatch(USERS_FETCHING_SUCCESS(data));
	} catch (ex) {
		dispatch(
			USERS_FETCHING_FAILS(
				ex.response && ex.response.data.errorMessage
					? ex.response.data.errorMessage
					: `Error ocurred. ${ex.message}`
			)
		);
	}
};

export const fetchUser = userId => async dispatch => {
	try {
		dispatch(USERS_FETCHING_REQUEST());
		const {
			data: { data },
		} = await http.get(`/api/users/${userId}`);
		dispatch(USER_FETCHING_SUCCESS(data));
	} catch (ex) {
		dispatch(
			USER_FETCHING_FAILS(
				ex.response && ex.response.data.errorMessage
					? ex.response.data.errorMessage
					: `Error ocurred. ${ex.message}`
			)
		);
	}
};

export const editAdminStatus = (userId, isAdmin) => async dispatch => {
	try {
		dispatch(EDIT_ADMIN_STATUS_REQUEST());
		await http.put(`/api/users/${userId}/edit-status`, { isAdmin });
		dispatch(EDIT_ADMIN_STATUS_SUCCESS());
	} catch (ex) {
		dispatch(
			EDIT_ADMIN_STATUS_FAILS(
				ex.response && ex.response.data.errorMessage
					? ex.response.data.errorMessage
					: `Error ocurred. ${ex.message}`
			)
		);
	}
};

export const resetUpdateProcess = () => dispatch => {
	dispatch(EDIT_ADMIN_STATUS_RESET());
};

const initialState = {
	currentUser: localStorage.getItem("authToken")
		? decodeToken(localStorage.getItem("authToken"))
		: null,
	users: [],
	user: {},
	loading: false,
	successfulUpdate: false,
	error: null,
};

export default function userReducer(state = initialState, action) {
	switch (action.type) {
		case USER_SIGNUP_REQUEST.type:
			return { ...state, loading: true, error: null };
		case USER_SIGNUP_SUCCESS.type:
			return { ...state, currentUser: action.payload, loading: false };
		case USER_SIGNUP_FAILS.type:
			return { ...state, loading: false, error: action.payload };
		case USER_LOGIN_REQUEST.type:
			return { ...state, loading: true, error: null };
		case USER_LOGIN_SUCCESS.type:
			return { ...state, currentUser: action.payload, loading: false };
		case USER_LOGIN_FAILS.type:
			return { ...state, loading: false, error: action.payload };
		case USER_LOGOUT.type:
			return { ...state, currentUser: null };
		case USER_UPDATE_PROFILE_REQUEST.type:
			return { ...state, loading: true, error: null, successfulUpdate: false };
		case USER_UPDATE_PROFILE_SUCCESS.type:
			return {
				...state,
				currentUser: action.payload,
				loading: false,
				successfulUpdate: true,
			};
		case USER_UPDATE_PROFILE_FAILS.type:
			return { ...state, loading: false, successfulUpdate: false, error: action.payload };
		case USERS_FETCHING_REQUEST.type:
			return { ...state, loading: true, error: null };
		case USERS_FETCHING_SUCCESS.type:
			return { ...state, users: action.payload, loading: false };
		case USERS_FETCHING_FAILS.type:
			return { ...state, loading: false, error: action.payload };
		case USER_FETCHING_REQUEST.type:
			return { ...state, loading: true, error: null };
		case USER_FETCHING_SUCCESS.type:
			return { ...state, user: action.payload, loading: false };
		case USER_FETCHING_FAILS.type:
			return { ...state, loading: false, error: action.payload };
		case EDIT_ADMIN_STATUS_REQUEST.type:
			return { ...state, loading: true, successfulUpdate: false, error: null };
		case EDIT_ADMIN_STATUS_SUCCESS.type:
			return { ...state, successfulUpdate: true };
		case EDIT_ADMIN_STATUS_FAILS.type:
			return { ...state, loading: false, successfulUpdate: false, error: action.payload };
		case EDIT_ADMIN_STATUS_RESET.type:
			return { ...state, loading: false, successfulUpdate: false };
		default:
			return state;
	}
}
