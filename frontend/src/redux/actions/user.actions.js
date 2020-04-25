import { useAuth } from "hooks/auth.hook"
import { authConstants } from "redux/constants/auth.constants"
import { useHttp } from "hooks/http.hook"

export const userActions = {
	login,
	logout,
	// register,
}

const storageName = "user"

function login(jwtToken, { id, name }) {
	// const { loading, error, request: fetch, clearError } = useHttp()

	return async (dispatch) => {
		dispatch(request({ jwtToken, id, name }))

		// useAuth.login(jwtToken, id, name).then(
		// 	(user) => {
		// 		dispatch(success(user))
		// 	},
		// 	(error) => {
		// 		dispatch(failure(error))
		// 		// dispatch(alertActions.error(error))
		// 	},
		// )

		try {
			const user = await fetch("/api/auth/login", "POST", { jwtToken, id, name })
			// message(data.message)
			// auth.login(data.token, data.userId, data.userName)
			dispatch(success(user))
		} catch (error) {
			console.log(error)
			// message(error)
			// 		// dispatch(alertActions.error(error))
		}
	}

	function request(user) {
		return { type: authConstants.LOGIN_REQUEST, user }
	}
	function success(user) {
		return { type: authConstants.LOGIN_SUCCESS, user }
	}
	function failure(error) {
		return { type: authConstants.LOGIN_FAILURE, error }
	}
}

function logout() {
	localStorage.removeItem(storageName)
	return { type: authConstants.LOGOUT }
}

// function register(user) {
// 	return (dispatch) => {
// 		dispatch(request(user))

// 		useAuth.register(user).then(
// 			(user) => {
// 				dispatch(success())
// 				history.push("/login")
// 				// dispatch(alertActions.success("Registration successful"))
// 			},
// 			(error) => {
// 				dispatch(failure(error))
// 				// dispatch(alertActions.error(error))
// 			},
// 		)
// 	}

// 	function request(user) {
// 		return { type: authConstants.REGISTER_REQUEST, user }
// 	}
// 	function success(user) {
// 		return { type: authConstants.REGISTER_SUCCESS, user }
// 	}
// 	function failure(error) {
// 		return { type: authConstants.REGISTER_FAILURE, error }
// 	}
// }
