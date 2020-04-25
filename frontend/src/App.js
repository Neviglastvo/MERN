import { Loader } from "components/Loader/Loader"
import { AuthContext } from "context/AuthContext"
import { useAuth } from "hooks/auth.hook"
import AdminCatalogPage from "pages/Admin/AdminCatalogPage"
import AdminPcPage from "pages/Admin/AdminPcPage"
import AdminMotherboardsPage from "pages/Admin/Catalog/AdminMotherboardsPage"
import AdminVideocardsPage from "pages/Admin/Catalog/AdminVideocardsPage"
import BuildPage from "pages/BuildPage/BuildPage"
import HomePage from "pages/HomePage"
import NewsPage from "pages/NewsPage"
import PcDetailPage from "pages/PcDetailPage"
import UserPage from "pages/ProfilePage"
import React, { useEffect } from "react"
import { BrowserRouter, Redirect, Switch } from "react-router-dom"
import { AppRoute } from "routes"
import { useSelector, useDispatch } from "react-redux"
import { alertActions } from "redux/actions/index"
import { history } from "helpers/history"
import { useAlert } from "hooks/alert.hook"

function App() {
	const loading = useSelector((state) => state.app.loading)
	const isAuth = useSelector((state) => state.auth.loggedIn)
	const user = useSelector((state) => state.auth.user)
	const username = user && user.userName

	if (loading) {
		return <Loader open={loading} />
	}

	console.log("Auth?", isAuth)
	// const routes = AppRoute(isAuth)
	return (
		<BrowserRouter>
			{!isAuth ? (
				<Switch>
					<AppRoute path="/" exact component={HomePage} />
					<AppRoute path="/news" component={NewsPage} />
					<AppRoute path="/build" component={BuildPage} />
					<AppRoute path="/:name/:name" exact component={PcDetailPage} />
					<Redirect to="/" />
				</Switch>
			) : (
				<Switch>
					<AppRoute path="/" exact component={HomePage} />
					<AppRoute path="/news" component={NewsPage} />
					<AppRoute path="/build" component={BuildPage} />
					<AppRoute path="/profile" component={UserPage} />
					<AppRoute path="/admin/pc" component={AdminPcPage} />
					<AppRoute path="/admin/catalog" exact component={AdminCatalogPage} />
					<AppRoute
						path="/admin/catalog/motherboards"
						exact
						component={AdminMotherboardsPage}
					/>
					<AppRoute
						path="/admin/catalog/videocards"
						exact
						component={AdminVideocardsPage}
					/>
					<AppRoute path="/:name/:name" exact component={PcDetailPage} />
					<Redirect to="/profile" />
				</Switch>
			)}
		</BrowserRouter>
	)
}

export default App
