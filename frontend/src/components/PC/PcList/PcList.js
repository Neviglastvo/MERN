import { red } from "@material-ui/core/colors"
import Grid from "@material-ui/core/Grid"
import { makeStyles } from "@material-ui/core/styles"
import { Loader } from "components/Loader/Loader"
import React, { useEffect } from "react"
import "./PcList.sass"
import PcCard from "components/PC/PcCard/PcCard"
import { useDispatch, useSelector } from "react-redux"
import { pcsActions } from "redux/actions/index"

const useStyles = makeStyles((theme) => ({
	root: {
		position: "relative",
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: "center",
		color: theme.palette.text.secondary,
	},
	itemRoot: {
		maxWidth: "100%",
		height: "100%",
		backgroundColor: "rgba(255, 255, 255, .75)",
	},
	media: {
		height: 0,
		paddingTop: "56.25%", // 16:9
		backgroundSize: "contain",
		borderBottom: "1px solid #ccc",
	},
	userAvatar: {
		backgroundColor: red[500],
		marginBottom: "10px",
	},
	userName: {
		color: "black",
		textAlign: "center",
	},
}))

export const PcList = (props) => {
	const classes = useStyles()

	const { usersPcs, deleteAllow } = props

	const dispatch = useDispatch()

	const auth = useSelector((state) => state.auth)

	const user = auth.user
	const username = user && user.userName
	const token = user && user.token

	const pcs = useSelector((state) => state.pcs)

	const items = usersPcs ? pcs.userItems : pcs.items

	useEffect(() => {
		if (pcs.userItems.length > 0 && pcs.items.length > 0) {
			console.log("no need to fetch again")
			return
		}

		if (usersPcs) {
			dispatch(pcsActions.getByUser())
		} else {
			dispatch(pcsActions.getAll(dispatch))
		}
	}, [])

	function handleDeletePc(pc) {
		dispatch(pcsActions.delete(pc))
	}

	return (
		<>
			{pcs.loading && <Loader open />}
			{pcs.error && <span className="text-danger">ERROR: {pcs.error}</span>}
			{items &&
				items.map((item) => {
					return (
						<Grid className={classes.root} item sm={12} md={6} lg={4} key={item._id}>
							<PcCard
								item={item}
								deleteAllow={deleteAllow}
								handleDeletePc={handleDeletePc}
							/>
						</Grid>
					)
				})}
		</>
	)
}
