import { useCallback, useEffect } from "react"
import { useDispatch } from "react-redux"
import { userActions } from "redux/actions/user.actions"

const storageName = "user"

export const useAuth = () => {
	const dispatch = useDispatch()

	const login = useCallback((jwtToken, id, name) => {
		dispatch(userActions.login(jwtToken, id, name))
	}, [])

	const logout = useCallback(() => {
		dispatch(userActions.logout())
	}, [])

	useEffect(() => {
		const data = JSON.parse(localStorage.getItem(storageName))
		if (data && data.token) {
			dispatch(userActions.login(data.token, data.userId, data.userName))
		}
	}, [login])

	return { login, logout }
}
