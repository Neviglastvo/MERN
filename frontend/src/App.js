import React from "react"
import { BrowserRouter, Redirect, Switch } from "react-router-dom"
import { Loader } from "./components/Loader/Loader"
import { AuthContext } from "./context/AuthContext"
import { useAuth } from "./hooks/auth.hook"
import AdminCatalogPage from "./pages/Admin/AdminCatalogPage"
import AdminPcPage from "./pages/Admin/AdminPcPage"
import BuildPage from "./pages/BuildPage/BuildPage"
import HomePage from "./pages/HomePage"
import NewsPage from "./pages/NewsPage"
import PcDetailPage from "./pages/PcDetailPage"
import UserPage from "./pages/ProfilePage"
import { AppRoute } from "./routes"

function App() {
	const { token, login, logout, userId, ready, userName } = useAuth()
	const isAuth = !!token

	if (!ready) {
		return <Loader open={ready} />
	}

	console.log("Auth?", isAuth)
	// const routes = AppRoute(isAuth)
	return (
		<AuthContext.Provider
			value={{ token, login, logout, userId, isAuth, userName }}
		>
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
						<AppRoute path="/admin/catalog" component={AdminCatalogPage} />
						<AppRoute path="/:name/:name" exact component={PcDetailPage} />
						<Redirect to="/profile" />
					</Switch>
				)}
			</BrowserRouter>
		</AuthContext.Provider>
	)
}

export default App
