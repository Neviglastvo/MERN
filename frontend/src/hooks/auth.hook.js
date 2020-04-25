import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { userActions } from "redux/actions/user.actions"

const storageName = "user"

export const useAuth = () => {
	const loggingIn = useSelector((state) => state.auth.loggingIn)
	const dispatch = useDispatch()

	const [ready, setReady] = useState(false)
	const [token, setToken] = useState(null)
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
		dispatch(userActions.login(jwtToken, id, name))
	}, [])

	const logout = useCallback(() => {
		setToken(null)
		setUserId(null)
		setUserName(null)
		localStorage.removeItem(storageName)

		dispatch(userActions.logout())
	}, [])

	useEffect(() => {
		const data = JSON.parse(localStorage.getItem(storageName))
		console.log("data :", data)

		if (data && data.token) {
			login(data.token, data.userId, data.userName)
			dispatch(userActions.login(data.token, data.userId, data.userName))
		}

		setReady(true)
	}, [login])

	return { login, logout, token, ready, userId, userName }
}
