import { Typography } from "@material-ui/core"
import Grid from "@material-ui/core/Grid"
import { makeStyles } from "@material-ui/core/styles"
import React, { useCallback, useContext, useEffect, useState } from "react"
import { Loader } from "../components/Loader/Loader"
import { PcList } from "../components/PC/PcList/PcList"
import { AuthContext } from "../context/AuthContext"
import { useHttp } from "../hooks/http.hook"
import { useSelector } from "react-redux"

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	title: {
		color: "#fff",
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: "center",
		color: theme.palette.text.secondary,
	},
}))

const UserPage = () => {
	const classes = useStyles()

	const auth = useSelector((state) => state.auth)

	const loggingIn = auth.loggingIn
	const isAuth = auth.loggedIn
	const user = auth.user
	const username = user && user.userName
	const token = user && user.token

	const [pcs, setPcs] = useState()
	const { loading, request } = useHttp()

	const fetchPcs = useCallback(async () => {
		const fetched = await request(`/api/pc/user`, "GET", null, {
			Authorization: `Bearer ${token}`,
		})
		setPcs(fetched)
	}, [token, request])

	useEffect(() => {
		fetchPcs()
	}, [fetchPcs])

	if (loading) {
		return <Loader />
	} else {
		return (
			<div className={classes.root}>
				<Typography
					variant="h1"
					component="h1"
					className={classes.title}
					gutterBottom
				>
					Hello {username}
				</Typography>
				<Grid container spacing={4}>
					{pcs && <PcList pcs={pcs} deleteAllow="true" />}
				</Grid>
			</div>
		)
	}
}

export default UserPage
