export const authService = {
	login,
	logout,
	// register,
	// update,
}

const storageName = "user"

function login(email, password) {
	const requestOptions = {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ email, password }),
	}

	return fetch(`/api/auth/login`, requestOptions)
		.then(handleResponse)
		.then((user) => {
			// store user details and jwt token in local storage to keep user logged in between page refreshes
			localStorage.setItem(storageName, JSON.stringify(user))

			return user
		})
}

function logout() {
	// remove user from local storage to log user out
	localStorage.removeItem(storageName)
}

function handleResponse(response) {
	return response.text().then((text) => {
		const data = text && JSON.parse(text)
		if (!response.ok) {
			if (response.status === 401) {
				// auto logout if 401 response returned from api
				logout()
				// location.reload(true)
			}

			const error = (data && data.message) || response.statusText
			return Promise.reject(error)
		}

		return data
	})
}
