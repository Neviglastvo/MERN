import { pcsConstants } from "redux/constants/index"

const initialState = {
	loading: false,
	items: [],
	userItems: [],
	error: null,
}

export function pcs(state = initialState, action) {
	switch (action.type) {
		case pcsConstants.GET_ALL_REQUEST:
			return {
				...state,
				loading: true,
			}
		case pcsConstants.GET_ALL_SUCCESS:
			return {
				...state,
				loading: false,
				items: action.pcs,
			}
		case pcsConstants.GET_ALL_FAILURE:
			return {
				...state,
				loading: false,
				error: action.error,
			}

		case pcsConstants.GET_BY_USER_REQUEST:
			return {
				...state,
				loading: true,
			}
		case pcsConstants.GET_BY_USER_SUCCESS:
			return {
				...state,
				loading: false,
				userItems: action.pcs,
			}
		case pcsConstants.GET_BY_USER_FAILURE:
			return {
				...state,
				loading: false,
				error: action.error,
			}

		case pcsConstants.CREATE_REQUEST:
			return { ...state, loading: true, creating: true }
		case pcsConstants.CREATE_SUCCESS:
			return { ...state, loading: false, items: state.items.concat(action.pc.pc) }
		case pcsConstants.CREATE_FAILURE:
			return { ...state, loading: false, error: action.error }

		case pcsConstants.DELETE_REQUEST:
			// add 'deleting:true' property to pc being deleted
			return {
				...state,
				items: state.items.map((pc) =>
					pc._id === action.pc._id ? { ...pc, deleting: true } : pc,
				),
			}
		case pcsConstants.DELETE_SUCCESS:
			// remove deleted pc from state
			return {
				...state,
				items: state.items.filter((pc) => pc._id !== action.pc.pc._id),
			}
		case pcsConstants.DELETE_FAILURE:
			// remove 'deleting:true' property and add 'deleteError:[error]' property to pc
			return {
				...state,
				items: state.items.map((pc) => {
					if (pc._id === action.pc._id) {
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
