import { authConstants } from "redux/constants/auth.constants"
import { authService } from "redux/services/auth.service"
import { alertActions } from "redux/actions/index"
import { toast } from "react-toastify"

export const userActions = {
	login,
	logout,
	// register,
}

const storageName = "user"

function login({ email, password }) {
	return (dispatch) => {
		dispatch(request(email, password))

		authService.login(email, password).then(
			(user) => {
				dispatch(success(user))
				dispatch(alertActions.success(`Logged in as ${email}`))
				toast.success(`Logged in as ${email}`)
			},
			(error) => {
				dispatch(failure(error))
				dispatch(alertActions.error(error))
				toast.error(error)
			},
		)
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
