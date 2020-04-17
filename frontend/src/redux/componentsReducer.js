import {
	FETCH_PC_COMPONENTS_MOTHERBOARDS,
	FETCH_PC_COMPONENTS_GPUS,
	FETCH_PC_MANUFACTURERS,
} from "redux/types"

const initialState = {
	manufacturers: {},
	motherboards: {},
	GPUs: {},
}

export const componentsReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_PC_MANUFACTURERS:
			return { ...state, manufacturers: action.payload }
		case FETCH_PC_COMPONENTS_MOTHERBOARDS:
			return { ...state, motherboards: action.payload }
		case FETCH_PC_COMPONENTS_GPUS:
			return { ...state, GPUs: action.payload }

		default:
			return state
	}
}
