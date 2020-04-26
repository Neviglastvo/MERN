import { alertActions } from "redux/actions/index"
import { pcsService } from "redux/services/pcs.service"
import { pcsConstants } from "redux/constants/pcs.constants"

export const pcsActions = {
	create,
	update,
	getAll,
	getAllUsers,
	delete: _delete,
}

function getAll() {
	return (dispatch) => {
		dispatch(request())

		pcsService.getAll().then(
			(pcs) => dispatch(success(pcs)),
			(error) => dispatch(failure(error)),
		)
	}

	function request() {
		return { type: pcsConstants.GETALL_REQUEST }
	}
	function success(pcs) {
		return { type: pcsConstants.GETALL_SUCCESS, pcs }
	}
	function failure(error) {
		return { type: pcsConstants.GETALL_FAILURE, error }
	}
}

function getAllUsers(token) {
	return (dispatch) => {
		dispatch(request())

		pcsService.getAllUsers(token).then(
			(pcs) => dispatch(success(pcs)),
			(error) => dispatch(failure(error)),
		)
	}

	function request() {
		return { type: pcsConstants.GETALL_REQUEST }
	}
	function success(pcs) {
		return { type: pcsConstants.GETALL_SUCCESS, pcs }
	}
	function failure(error) {
		return { type: pcsConstants.GETALL_FAILURE, error }
	}
}

function create(pc) {
	return (dispatch) => {
		dispatch(request(pc))

		pcsService.create(pc).then(
			(pc) => {
				dispatch(success())
				// history.push("/login")
				dispatch(alertActions.success("Registration successful"))
			},
			(error) => {
				dispatch(failure(error))
				dispatch(alertActions.error(error))
			},
		)
	}

	function request(pc) {
		return { type: pcsConstants.REGISTER_REQUEST, pc }
	}
	function success(pc) {
		return { type: pcsConstants.REGISTER_SUCCESS, pc }
	}
	function failure(error) {
		return { type: pcsConstants.REGISTER_FAILURE, error }
	}
}

function update(pc) {
	return (dispatch) => {
		dispatch(request(pc))

		pcsService.update(pc).then(
			(pc) => {
				dispatch(success())
				// history.push("/login")
				dispatch(alertActions.success("Registration successful"))
			},
			(error) => {
				dispatch(failure(error))
				dispatch(alertActions.error(error))
			},
		)
	}

	function request(pc) {
		return { type: pcsConstants.UPDATE_REQUEST, pc }
	}
	function success(pc) {
		return { type: pcsConstants.UPDATE_SUCCESS, pc }
	}
	function failure(error) {
		return { type: pcsConstants.UPDATE_FAILURE, error }
	}
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
	return (dispatch) => {
		dispatch(request(id))

		pcsService.delete(id).then(
			(pc) => {
				dispatch(success(id))
			},
			(error) => {
				dispatch(failure(id, error))
			},
		)
	}

	function request(id) {
		return { type: pcsConstants.DELETE_REQUEST, id }
	}
	function success(id) {
		return { type: pcsConstants.DELETE_SUCCESS, id }
	}
	function failure(id, error) {
		return { type: pcsConstants.DELETE_FAILURE, id, error }
	}
}
