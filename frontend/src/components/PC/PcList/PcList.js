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
	console.log("props :>> ", props)
	const classes = useStyles()

	const { usersPcs, deleteAllow } = props

	const dispatch = useDispatch()

	const auth = useSelector((state) => state.auth)

	const user = auth.user
	const username = user && user.userName
	const token = user && user.token

	const pcs = useSelector((state) => state.pcs)

	useEffect(() => {
		if (usersPcs) {
			dispatch(pcsActions.getAllUsers(token))
		} else {
			dispatch(pcsActions.getAll())
		}
	}, [])

	if (pcs && pcs.loading) {
		return <Loader open={true} />
	}

	return (
		<>
			{pcs &&
				pcs.items &&
				pcs.items.map((item) => {
					console.log("item :", item)
					return (
						<Grid className={classes.root} item sm={12} md={6} lg={4} key={item._id}>
							<PcCard item={item} deleteAllow={props.deleteAllow} />
						</Grid>
					)
				})}
		</>
	)
}
