import { alertActions } from "redux/actions/index"
import { pcsService } from "redux/services/pcs.service"
import { pcsConstants } from "redux/constants/pcs.constants"
import { toast } from "react-toastify"

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
		return { type: pcsConstants.GET_ALL_REQUEST }
	}
	function success(pcs) {
		return { type: pcsConstants.GET_ALL_SUCCESS, pcs }
	}
	function failure(error) {
		return { type: pcsConstants.GET_ALL_FAILURE, error }
	}
}

function getAllUsers() {
	return (dispatch) => {
		dispatch(request())

		pcsService.getAllUsers().then(
			(pcs) => dispatch(success(pcs)),
			(error) => dispatch(failure(error)),
		)
	}

	function request() {
		return { type: pcsConstants.GET_USERS_REQUEST }
	}
	function success(pcs) {
		return { type: pcsConstants.GET_USERS_SUCCESS, pcs }
	}
	function failure(error) {
		return { type: pcsConstants.GET_USERS_FAILURE, error }
	}
}

function create(pc) {
	return (dispatch) => {
		dispatch(request(pc))

		pcsService.create(pc).then(
			(pc) => {
				dispatch(success(pc))
				dispatch(alertActions.success("PC created"))
				toast.success(`PC with name ${pc.pc.name} created`)
			},
			(error) => {
				dispatch(failure(error))
				dispatch(alertActions.error(error))
				toast.error(error)
			},
		)
	}

	function request(pc) {
		return { type: pcsConstants.CREATE_REQUEST, pc }
	}
	function success(pc) {
		return { type: pcsConstants.CREATE_SUCCESS, pc }
	}
	function failure(error) {
		return { type: pcsConstants.CREATE_FAILURE, pc, error }
	}
}

function update(pc) {
	return (dispatch) => {
		dispatch(request(pc))

		pcsService.update(pc).then(
			(pc) => {
				dispatch(success(pc))
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
function _delete(pc) {
	return (dispatch) => {
		dispatch(request(pc))

		pcsService.delete(pc).then(
			(pc) => {
				dispatch(success(pc))
				toast.success(`PC with name ${pc.pc.name} deleted`)
			},
			(error) => {
				dispatch(failure(pc, error))
				toast.error(error)
			},
		)
	}

	function request(pc) {
		return { type: pcsConstants.DELETE_REQUEST, pc }
	}
	function success(pc) {
		return { type: pcsConstants.DELETE_SUCCESS, pc }
	}
	function failure(pc, error) {
		return { type: pcsConstants.DELETE_FAILURE, pc, error }
	}
}
