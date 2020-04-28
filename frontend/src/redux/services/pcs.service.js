import { handleResponse, authHeader } from "./helpers.service"

export const pcsService = {
	getAll,
	getById,
	create,
	getByUser,
	delete: _delete,
	update,
}

function getAll() {
	const requestOptions = {
		method: "GET",
	}

	return fetch(`/api/pc/`, requestOptions).then(handleResponse)
}

function getByUser() {
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

function update(pc) {
	const requestOptions = {
		method: "PUT",
		headers: { ...authHeader(), "Content-Type": "application/json" },
		body: JSON.stringify(pc),
	}

	return fetch(`/users/${pc._id}`, requestOptions).then(handleResponse)
}
