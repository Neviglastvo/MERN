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

function getAllUsers(token) {
	const requestOptions = {
		method: "GET",
		headers: authHeader(token),
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

function create(user) {
	const requestOptions = {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(user),
	}

	return fetch(`/users/create`, requestOptions).then(handleResponse)
}

function _delete(id) {
	const requestOptions = {
		method: "DELETE",
		headers: authHeader(),
	}

	return fetch(`/users/${id}`, requestOptions).then(handleResponse)
}

function update(user) {
	const requestOptions = {
		method: "PUT",
		headers: { ...authHeader(), "Content-Type": "application/json" },
		body: JSON.stringify(user),
	}

	return fetch(`/users/${user.id}`, requestOptions).then(handleResponse)
}

function authHeader(token) {
	// return authorization header with jwt token

	if (token) {
		return { Authorization: "Bearer " + token }
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
