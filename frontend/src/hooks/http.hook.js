import { useCallback, useState } from "react"

export const useHttp = () => {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)

	const request = useCallback(
		async (url, method = "GET", body = null, headers = {}) => {
			try {
				if (body) {
					body = JSON.stringify(body)
					headers["Content-Type"] = "application/json"
				}

				const response = await fetch(url, { method, body, headers })
				const data = await response.json()

				if (!response.ok) {
					throw new Error(data.message || "HttpHook responce error")
				}

				setLoading(false)

				return data
			} catch (error) {
				setLoading(false)
				setError(error.message)
				throw error
			}
		},
		[],
	)

	const clearError = useCallback(() => setError(null), [])

	return { loading, request, error, clearError }
}
