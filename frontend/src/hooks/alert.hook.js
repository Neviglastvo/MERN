import { stringify } from "javascript-stringify"
import { useCallback } from "react"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const toastList = new Set()
const MAX_TOAST = 3

export const useAlert = (message, messageType) => {
	return useCallback(() => {
		if (message) {
			let toastIdToDismiss = null
			if (toastList.size === MAX_TOAST) {
				const arr = Array.from(toastList)
				const toastId = arr[0]
				if (toastId) {
					toastIdToDismiss = toastId
				}
				toast.dismiss(toastId)
			}

			const id = toast[messageType](stringify(message), {
				// onClose hook to remove the id from the set
				onClose: () => toastList.delete(id),
				onOpen: () => {
					if (toastIdToDismiss !== null) {
						setTimeout(() => {
							toast.dismiss(toastIdToDismiss)
						}, 5000)
					}
				},
			})
			toastList.add(id)
		}
	}, [message])
}
