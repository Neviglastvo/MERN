import { handleResponse, authHeader } from "./helpers.service"

export const builderService = {
	getComponentsByType,
	create,
}

function getComponentsByType(typeName) {
	const requestOptions = {
		method: "GET",
		headers: authHeader(),
	}

	return fetch(`/api/components/type/${typeName}`, requestOptions).then(
		handleResponse,
	)
}

function create(pc) {
	const requestOptions = {
		method: "POST",
		headers: authHeader(),
		body: JSON.stringify(pc),
	}

	return fetch(`/api/pc/generate`, requestOptions).then(handleResponse)
}

function update(pc) {
	const requestOptions = {
		method: "PUT",
		headers: { ...authHeader(), "Content-Type": "application/json" },
		body: JSON.stringify(pc),
	}

	return fetch(`/users/${pc._id}`, requestOptions).then(handleResponse)
}
