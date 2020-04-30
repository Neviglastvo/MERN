import { Typography } from "@material-ui/core"
import Grid from "@material-ui/core/Grid"
import { makeStyles } from "@material-ui/core/styles"
import React from "react"
import { useSelector } from "react-redux"
import { PcList } from "../components/PC/PcList/PcList"

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
