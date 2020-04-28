import { combineReducers } from "redux"
import { app } from "redux/reducers/index"
import { auth } from "redux/reducers/index"
import { alert } from "redux/reducers/index"
import { pcs } from "redux/reducers/index"
import { builder } from "redux/reducers/index"

export const rootReducer = combineReducers({
	app,
	auth,
	alert,
	pcs,
	builder,
})
