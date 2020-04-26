export const pcsService = {
	getAll,
	getById,
	create,
	getAllUsers,
	delete: _delete,
	update,
}

function getAll() {
	const requestOptions = {
		method: "GET",
	}

	return fetch(`/api/pc/`, requestOptions).then(handleResponse)
}

function getAllUsers() {
	const requestOptions = {
		method: "GET",
		headers: authHeader(),
	}

	return fetch(`/api/pc/user`, requestOptions).then(handleResponse)
}

function getById(userId) {
	const requestOptions = {
		method: "GET",
		headers: authHeader(),
	}

	return fetch(`/api/pc/user`, requestOptions).then(handleResponse)
}

function create(pc) {
	const requestOptions = {
		method: "POST",
		headers: authHeader(),
		body: JSON.stringify(pc),
	}

	return fetch(`/api/pc/generate`, requestOptions).then(handleResponse)
}

function _delete(pc) {
	const requestOptions = {
		method: "GET",
		headers: authHeader(),
	}

	const pcId = pc._id

	return fetch(`/api/pc/delete/${pcId}`, requestOptions).then(handleResponse)
}

function update(user) {
	const requestOptions = {
		method: "PUT",
		headers: { ...authHeader(), "Content-Type": "application/json" },
		body: JSON.stringify(user),
	}

	return fetch(`/users/${user.id}`, requestOptions).then(handleResponse)
}

function authHeader() {
	// return authorization header with jwt token

	const user = JSON.parse(localStorage.getItem("user"))
	const userToken = user.token

	if (userToken) {
		return {
			Authorization: "Bearer " + userToken,
			"Content-Type": "application/json",
		}
	} else {
		return {}
	}
}

function handleResponse(response) {
	return response.text().then((text) => {
		const data = text && JSON.parse(text)
		if (!response.ok) {
			if (response.status === 401) {
				// auto logout if 401 response returned from api
				// logout()
				// location.reload(true)
			}

			const error = (data && data.message) || response.statusText
			return Promise.reject(error)
		}

		return data
	})
}
