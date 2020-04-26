import { alertConstants } from "redux/constants"

const initialState = { type: "", message: "" }

export function alert(state = initialState, action) {
	switch (action.type) {
		case alertConstants.SUCCESS:
			return {
				...state,
				type: "success",
				message: action.message,
			}
		case alertConstants.ERROR:
			return {
				...state,
				type: "error",
				message: action.message,
			}
		case alertConstants.CLEAR:
			return initialState
		default:
			return state
	}
}
