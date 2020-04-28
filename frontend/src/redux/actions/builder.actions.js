import { alertActions } from "redux/actions/index"
import { builderService } from "redux/services/builder.service"
import { builderConstants } from "redux/constants/builder.constants"
import { toast } from "react-toastify"

export const builderActions = {
	create,
	update,
	getComponentsByType,
	setBuildedValue,
}

function getComponentsByType(typeName) {
	return (dispatch) => {
		dispatch({ type: builderConstants.GET_BY_COMPONENT_REQUEST })

		builderService.getComponentsByType(typeName).then(
			(components) =>
				dispatch({ type: builderConstants.GET_BY_COMPONENT_SUCCESS, components }),
			(error) =>
				dispatch({ type: builderConstants.GET_BY_COMPONENT_FAILURE, error }),
		)
	}
}

function setBuildedValue(value) {
	return (dispatch) => {
		dispatch({ type: builderConstants.SET_COMPONENT, value })
	}
}

function create(pc) {
	return (dispatch) => {
		dispatch(request(pc))

		builderService.create(pc).then(
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
		return { type: builderConstants.CREATE_REQUEST, pc }
	}
	function success(pc) {
		return { type: builderConstants.CREATE_SUCCESS, pc }
	}
	function failure(error) {
		return { type: builderConstants.CREATE_FAILURE, pc, error }
	}
}

function update(pc) {
	return (dispatch) => {
		dispatch(request(pc))

		builderService.update(pc).then(
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
		return { type: builderConstants.UPDATE_REQUEST, pc }
	}
	function success(pc) {
		return { type: builderConstants.UPDATE_SUCCESS, pc }
	}
	function failure(error) {
		return { type: builderConstants.UPDATE_FAILURE, error }
	}
}
