import { pcsConstants } from "redux/constants/index"

export function pcs(state = {}, action) {
	switch (action.type) {
		case pcsConstants.GETALL_REQUEST:
			return {
				loading: true,
			}
		case pcsConstants.GETALL_SUCCESS:
			return {
				items: action.pcs,
			}
		case pcsConstants.GETALL_FAILURE:
			return {
				error: action.error,
			}

		case pcsConstants.DELETE_REQUEST:
			// add 'deleting:true' property to pc being deleted
			return {
				...state,
				items: state.items.map((pc) =>
					pc.id === action.id ? { ...pc, deleting: true } : pc,
				),
			}
		case pcsConstants.DELETE_SUCCESS:
			// remove deleted pc from state
			return {
				items: state.items.filter((pc) => pc.id !== action.id),
			}
		case pcsConstants.DELETE_FAILURE:
			// remove 'deleting:true' property and add 'deleteError:[error]' property to pc
			return {
				...state,
				items: state.items.map((pc) => {
					if (pc.id === action.id) {
						// make copy of pc without 'deleting:true' property
						const { deleting, ...pcCopy } = pc
						// return copy of pc with 'deleteError:[error]' property
						return { ...pcCopy, deleteError: action.error }
					}

					return pc
				}),
			}
		default:
			return state
	}
}

// import { FETCH_PCS } from "../types"

// const initialState = {
// 	pcs: [],
// }

// export const pcsReducer = (state = initialState, action) => {
// 	switch (action.type) {
// 		case FETCH_PCS:
// 			return { ...state, pcs: action.payload }

// 		default:
// 			return state
// 	}
// }
