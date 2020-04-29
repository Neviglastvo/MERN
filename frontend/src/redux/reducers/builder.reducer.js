import { builderConstants } from "redux/constants/index"

function getRandomInt(min, max) {
	min = Math.ceil(min)
	max = Math.floor(max)
	return Math.floor(Math.random() * (max - min)) + min
}

const initialState = {
	loading: false,
	fetchedComponents: {},
	itemBuilded: {
		loading: false,
		name: Math.random().toString(36).substring(7),
		descr: "some description",
		grade: getRandomInt(1, 12),
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
			console.log("action", action)
			return {
				...state,
				loading: false,
				itemCreated: action.pc.pc,
			}
		case builderConstants.CREATE_FAILURE:
			return { ...state, loading: false, error: action.error }

		default:
			return state
	}
}
