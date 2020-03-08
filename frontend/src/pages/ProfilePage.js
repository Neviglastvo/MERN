import { Typography } from "@material-ui/core"
import Grid from "@material-ui/core/Grid"
import { makeStyles } from "@material-ui/core/styles"
import React, { useCallback, useContext, useEffect, useState } from "react"
import { Loader } from "../components/Loader/Loader"
import { PcList } from "../components/PC/PcList/PcList"
import { AuthContext } from "../context/AuthContext"
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

const UserPage = () => {
	const classes = useStyles()

	const auth = useContext(AuthContext)
	const username = auth.userName

	const [pcs, setPcs] = useState()
	const { loading, request } = useHttp()
	const { token } = useContext(AuthContext)

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
