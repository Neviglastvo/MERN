import { builderConstants } from "redux/constants/index"

const initialState = {
	loading: false,
	fetchedComponents: {},
	itemBuilded: {
		loading: false,
		name: null,
		grade: null,
		components: {},
		ableToStart: false,
		finishedBuild: false,
	},
	itemCreated: null,
	error: null,
}

export function builder(state = initialState, action) {
	switch (action.type) {
		case builderConstants.GET_BY_COMPONENT_REQUEST:
			return {
				...state,
				loading: true,
			}
		case builderConstants.GET_BY_COMPONENT_SUCCESS:
			return {
				...state,
				loading: false,

				fetchedComponents: Object.assign(
					{ ...state.fetchedComponents },
					{ [action.components.type]: action.components.items },
				),
			}
		case builderConstants.GET_BY_COMPONENT_FAILURE:
			return {
				...state,
				loading: false,
				error: action.error,
			}

		case builderConstants.SET_COMPONENT:
			const data = action.value
			const isComponent = data.isComponent
			const key = data.type
			const value = data.item

			if (!isComponent) {
				return {
					...state,
					itemBuilded: { ...state.itemBuilded, [key]: value },
				}
			} else if (isComponent) {
				// The key to updating nested data is that every level of nesting must be copied and updated appropriately
				//ty redux

				return {
					...state,
					itemBuilded: {
						...state.itemBuilded,
						components: {
							...state.itemBuilded.components,
							[key]: value,
						},
					},
				}
			}

		case builderConstants.CREATE_REQUEST:
			return { ...state, loading: true }
		case builderConstants.CREATE_SUCCESS:
			return {
				...state,
				loading: false,
				itemCreated: action.item,
			}
		case builderConstants.CREATE_FAILURE:
			return { ...state, loading: false, error: action.error }

		default:
			return state
	}
}
