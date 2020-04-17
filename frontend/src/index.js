import "assets/sass/app.sass"
import "material-icons/iconfont/material-icons.scss"
import "materialize-css"
// import "materialize-css/sass/materialize.scss"
import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { applyMiddleware, createStore } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk"
import { rootReducer } from "redux/rootReducer"
import "reset-css"
import "typeface-roboto"
import App from "App"

const store = createStore(
	rootReducer,
	composeWithDevTools(
		applyMiddleware(thunk),
		// other store enhancers if any
	),
)

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("root"),
)
