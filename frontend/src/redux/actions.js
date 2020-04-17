import {
	FETCH_PCS,
	HIDE_LOADER,
	SHOW_LOADER,
	FETCH_PC_COMPONENTS_MOTHERBOARDS,
	FETCH_PC_MANUFACTURERS,
} from "redux/types"

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

export function fetchPcs() {
	return async (dispatch) => {
		try {
			// dispatch(showLoader())
			const response = await fetch("/api/pc")
			const json = await response.json()
			setTimeout(() => {
				dispatch({ type: FETCH_PCS, payload: json })
				// dispatch(hideLoader())
			}, 500)
		} catch (error) {
			console.log("error", error)
			// dispatch(showAlert("Что-то пошло не так"))
			// dispatch(hideLoader())
		}
	}
}

export function fetchManufacturers() {
	return async (dispatch) => {
		try {
			// dispatch(showLoader())
			await fetch(`/api/manufacturers`)
				.then((response) => response.json())
				.then((data) => {
					const result = data.reduce(
						(obj, item) => ((obj[item["_id"]] = item["name"]), obj),
						{},
					)
					dispatch({ type: FETCH_PC_MANUFACTURERS, payload: result })
				})
			// dispatch(hideLoader())
		} catch (error) {
			console.log("error", error)
		}
	}
}

export function fetchComponentsMotherboards() {
	return async (dispatch) => {
		try {
			// dispatch(showLoader())
			await fetch(`/api/components/type/motherboard`)
				.then((response) => response.json())
				.then((data) => {
					dispatch({ type: FETCH_PC_COMPONENTS_MOTHERBOARDS, payload: data })
				})

			// dispatch(hideLoader())
		} catch (error) {
			console.log("error", error)
		}
	}
}

export function fetchComponentsGpu() {
	return async (dispatch) => {
		try {
			// dispatch(showLoader())
			const response = await fetch(`/api/components/type/gpu`)
			const json = await response.json()
			dispatch({ type: FETCH_PC_COMPONENTS_MOTHERBOARDS, payload: json })
			// dispatch(hideLoader())
		} catch (error) {
			console.log("error", error)
		}
	}
}
