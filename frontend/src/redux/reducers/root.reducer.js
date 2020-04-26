import { combineReducers } from "redux"
import { app } from "redux/reducers/app.reducer"
import { auth } from "redux/reducers/auth.reducer"
import { alert } from "redux/reducers/alert.reducer"
import { pcs } from "redux/reducers/pcs.reducer"

export const rootReducer = combineReducers({
	app,
	auth,
	alert,
	pcs,
})
