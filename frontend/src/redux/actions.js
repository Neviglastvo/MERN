import { HIDE_LOADER, SHOW_LOADER } from "redux/types"

import pcsConstants from "redux/constants/pcs.constants"

export function showLoader() {
	return {
		type: SHOW_LOADER,
	}
}

export function hideLoader() {
	return {
		type: HIDE_LOADER,
	}
}

// export function fetchPcs() {
// 	return async (dispatch) => {
// 		try {
// 			// dispatch(showLoader())
// 			const response = await fetch("/api/pc")
// 			const json = await response.json()
// 			setTimeout(() => {
// 				dispatch({ type: pcsConstants.FETCH_REQUEST, payload: json })
// 				// dispatch(hideLoader())
// 			}, 500)
// 		} catch (error) {
// 			console.log("error", error)
// 			// dispatch(showAlert("Что-то пошло не так"))
// 			// dispatch(hideLoader())
// 		}
// 	}
// }
