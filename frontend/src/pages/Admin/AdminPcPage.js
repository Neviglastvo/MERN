import Grid from "@material-ui/core/Grid"
import { makeStyles } from "@material-ui/core/styles"
import { PcCreate } from "components/PC/PcCreate"
import { PcList } from "components/PC/PcList/PcList"
import React from "react"
import { useSelector } from "react-redux"

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
}))

const AdminPcPage = () => {
	const classes = useStyles()

	const auth = useSelector((state) => state.auth)

	// const user = auth.user
	// const token = auth.user.token

	return (
		<Grid container spacing={2} className={classes.root}>
			<Grid item xs={3}>
				<PcCreate />
			</Grid>

			<Grid item xs={9}>
				<Grid container spacing={2}>
					<PcList deleteAllow />
				</Grid>
			</Grid>
		</Grid>
	)
}

export default AdminPcPage
