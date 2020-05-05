import { history } from "helpers/history"
import { toast } from "react-toastify"

const storageName = "user"

export function logout() {
	// remove user from local storage to log user out
	localStorage.removeItem(storageName)
	history.push("/")
}

export function authHeader() {
	// return authorization header with jwt token

	const user = JSON.parse(localStorage.getItem("user"))
	const userToken = user ? user.token : logout()

	if (userToken) {
		return {
			Authorization: "Bearer " + userToken,
			"Content-Type": "application/json",
		}
	} else {
		return {}
	}
}

export function handleResponse(response) {
	console.log("responcs", response)
	return response.text().then((text) => {
		const data = text && JSON.parse(text)
		if (!response.ok) {
			if (response.status === 401) {
				// auto logout if 401 response returned from api
				logout()
				history.push("/")
				toast.warn("Unauthorised")
			}

			const error = (data && data.message) || response.statusText
			return Promise.reject(error)
		}

		return data
	})
}
