import { FETCH_PCS } from "./types"

const initialState = {
	pcs: [],
}

export const pcsReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_PCS:
			return { ...state, pcs: action.payload }

		default:
			return state
	}
}
