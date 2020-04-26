import { Typography, Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { PcList } from "components/PC/PcList/PcList"
import React from "react"

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

const HomePage = () => {
	const classes = useStyles()

	return (
		<div className={classes.root}>
			<Typography
				variant="h1"
				component="h1"
				className={classes.title}
				gutterBottom
			>
				Homepage
			</Typography>
			<Grid container spacing={4}>
				<PcList />
			</Grid>
		</div>
	)
}

export default HomePage
