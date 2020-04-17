import {
	USER_LOADING,
	USER_LOADED,
	LOGIN_SUCCESS,
	REGISTER_SUCCESS,
	AUTH_FAIL,
	LOGIN_FAIL,
	LOGOUT_SUCCESS,
	REGISTER_FAIL,
} from "./types"

const initialState = {
	token: localStorage.getItem("token"),
	isAuth: false,
	isLoading: false,
	user: null,
}

export const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case USER_LOADING:
			return {
				...state,
				isLoading: true,
			}

		case USER_LOADED:
			return {
				...state,
				isAuth: true,
				isLoading: false,
				user: action.payload,
			}

		case LOGIN_SUCCESS:
		case REGISTER_SUCCESS:
			return {
				...state,
				...action.payload,
				isAuth: true,
				isLoading: false,
			}

		case AUTH_FAIL:
		case LOGIN_FAIL:
		case LOGOUT_SUCCESS:
		case REGISTER_FAIL:
			localStorage.removeItem("token")
			return initialState

		default:
			return state
	}
}
