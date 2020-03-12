import Avatar from "@material-ui/core/Avatar"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import CardHeader from "@material-ui/core/CardHeader"
import CardMedia from "@material-ui/core/CardMedia"
import { red } from "@material-ui/core/colors"
import Grid from "@material-ui/core/Grid"
import IconButton from "@material-ui/core/IconButton"
import Paper from "@material-ui/core/Paper"
import { makeStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import DeleteIcon from "@material-ui/icons/Delete"
import FavoriteIcon from "@material-ui/icons/Favorite"
import ShareIcon from "@material-ui/icons/Share"
import React from "react"
import { NavLink } from "react-router-dom"
import "./PcList.sass"

const useStyles = makeStyles(theme => ({
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
export const PcList = props => {
	const classes = useStyles()

	console.log(props.pcs)

	if (!props.pcs.length) {
		return (
			<Grid item xs={12}>
				<Paper className={classes.paper}>No pcs</Paper>
			</Grid>
		)
	}

	return (
		<>
			{props.pcs.map(pc => {
				console.log("pc :", pc)
				return (
					<Grid item sm={12} md={6} lg={4} key={pc._id}>
						<Card className={`${classes.itemRoot} grade grade--${pc.grade}`}>
							<CardMedia
								className={classes.media}
								image="/img/pc/pcThumb.png"
								title="pcThumb"
							/>
							<CardHeader
								avatar={
									<>
										<Avatar aria-label="recipe" className={classes.userAvatar}>
											{pc.ownerName.substring(0, 1)}
										</Avatar>
										<Typography component="h2" className={classes.userName}>
											{pc.ownerName.substring(0, 10)}
										</Typography>
									</>
								}
								title={
									<NavLink to={`/${pc.ownerName}/${pc.name}`}>
										{pc.name} ({pc._id})
									</NavLink>
								}
								subheader={new Date(pc.date).toLocaleDateString()}
							/>
							<CardContent>
								<Typography variant="body2" color="textSecondary" component="p">
									Grade: {pc.grade}
								</Typography>
								<Typography variant="body2" color="textSecondary" component="p">
									{pc.descr}
								</Typography>
							</CardContent>
							<CardActions disableSpacing>
								<IconButton aria-label="add to favorites">
									<FavoriteIcon />
								</IconButton>
								{pc.like}
								<IconButton aria-label="share">
									<ShareIcon />
								</IconButton>

								{!!props.deleteAllow && (
									<IconButton
										aria-label="delete"
										onClick={() => props.deleteHandler(pc._id)}
									>
										<DeleteIcon />
									</IconButton>
								)}
							</CardActions>
						</Card>
					</Grid>
				)
			})}
		</>
	)
}
