import React, { useCallback, useEffect, useState } from "react"
import { Redirect } from "react-router-dom"
const storageName = "userData"

export const useAuth = () => {
	const [token, setToken] = useState(null)
	const [ready, setReady] = useState(false)
	const [userId, setUserId] = useState(null)
	const [userName, setUserName] = useState(null)

	const login = useCallback((jwtToken, id, name) => {
		setToken(jwtToken)
		setUserId(id)
		setUserName(name)

		localStorage.setItem(
			storageName,
			JSON.stringify({ userId: id, token: jwtToken, userName: name }),
		)
	}, [])

	const logout = useCallback(() => {
		setToken(null)
		setUserId(null)
		setUserName(null)
		localStorage.removeItem(storageName)
	}, [])

	useEffect(() => {
		const data = JSON.parse(localStorage.getItem(storageName))
		console.log("data :", data)
		if (!data.token) {
			logout()
			return <Redirect to="/" />
		}

		if (data && data.token) {
			login(data.token, data.userId, data.userName)
		}

		setReady(true)
	}, [login])

	return { login, logout, token, ready, userId, userName }
}
