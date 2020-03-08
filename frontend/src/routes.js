import React from "react"
import { Route } from "react-router-dom"
import Layout from "./layouts/Layout"

export const AppRoute = ({ needAuth, component: Component, ...rest }) => {
	// console.log("needAuth", needAuth)
	return (
		<Route
			{...rest}
			render={matchProps => (
				<Layout>
					<Component {...matchProps} />
				</Layout>
			)}
		/>
	)
}
