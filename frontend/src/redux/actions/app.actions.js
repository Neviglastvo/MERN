import { appConstants } from "redux/constants/index"

export const appActions = {
	showLoader,
	hideLoader,
}

export function showLoader() {
	return {
		type: appConstants.SHOW_LOADER,
	}
}

export function hideLoader() {
	return {
		type: appConstants.HIDE_LOADER,
	}
}
