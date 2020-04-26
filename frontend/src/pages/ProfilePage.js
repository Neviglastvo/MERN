import { Typography } from "@material-ui/core"
import Grid from "@material-ui/core/Grid"
import { makeStyles } from "@material-ui/core/styles"
import React, { useCallback, useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Loader } from "../components/Loader/Loader"
import { PcList } from "../components/PC/PcList/PcList"
import { useHttp } from "../hooks/http.hook"
import { pcsActions } from "redux/actions/index"

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

	const user = auth.user
	const username = user && user.userName

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
				<PcList usersPcs deleteAllow />
			</Grid>
		</div>
	)
}

export default UserPage
