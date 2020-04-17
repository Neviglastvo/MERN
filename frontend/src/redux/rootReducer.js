import { combineReducers } from "redux"
import { pcsReducer } from "redux/pcsReducer"
import { appReducer } from "redux/appReducer"
import { componentsReducer } from "redux/componentsReducer"
import { authReducer } from "./authReducer"

export const rootReducer = combineReducers({
	app: appReducer,
	auth: authReducer,
	pcs: pcsReducer,
	components: componentsReducer,
})
