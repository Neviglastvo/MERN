import { appConstants } from "redux/constants/index"

const initialState = {
	loading: false,
}

export const app = (state = initialState, action) => {
	switch (action.type) {
		case appConstants.SHOW_LOADER:
			return { ...state, loading: true }
		case appConstants.HIDE_LOADER:
			return { ...state, loading: false }

		default:
			return state
	}
}
