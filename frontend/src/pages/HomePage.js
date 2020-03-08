import { Typography } from "@material-ui/core"
import Grid from "@material-ui/core/Grid"
import { makeStyles } from "@material-ui/core/styles"
import React, { useCallback, useEffect, useState } from "react"
import { Loader } from "../components/Loader/Loader"
import { PcList } from "../components/PC/PcList/PcList"
import { useHttp } from "../hooks/http.hook"

const useStyles = makeStyles(theme => ({
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

	const [pcs, setPcs] = useState([])
	const { loading, request } = useHttp()

	const fetchPcs = useCallback(async () => {
		const fetched = await request(`/api/pc`, "GET", null)
		setPcs(fetched)
	}, [request])

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
					Homepage
				</Typography>
				<Grid container spacing={2}>
					{pcs && <PcList pcs={pcs} />}
				</Grid>
			</div>
		)
	}
}

export default HomePage
