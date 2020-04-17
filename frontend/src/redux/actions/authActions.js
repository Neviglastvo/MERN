import {
	USER_LOADING,
	USER_LOADED,
	LOGIN_SUCCESS,
	REGISTER_SUCCESS,
	AUTH_FAIL,
	LOGIN_FAIL,
	LOGOUT_SUCCESS,
	REGISTER_FAIL,
} from "redux/types"

import { useHttp } from "hooks/http.hook"

const { loading, error, request, clearError } = useHttp()

export const loginUser = (userData) => async (dispatch) => {
	dispatch({ type: USER_LOADING })

	await request("/api/auth/login", "POST", { ...userData })
}

export const setCurrentUser = (decoded) => {
	return {
		type: LOGIN_SUCCESS,
		payload: decoded,
	}
}
