import { useCallback } from "react"

export const useAlert = () => {
	return useCallback(text => {
		if (text) {
			window.M.toast({ html: text })
		}
	}, [])
}
