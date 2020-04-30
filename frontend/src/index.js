import "assets/sass/app.sass"
// import "material-icons/iconfont/material-icons.scss"
import "material-icons"
// import "materialize-css"
// import "materialize-css/sass/materialize.scss"
import React from "react"
import { render } from "react-dom"
import { Provider } from "react-redux"

import "reset-css"
import "typeface-roboto"
import App from "App"
import { store } from "helpers/store"

render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("root"),
)
