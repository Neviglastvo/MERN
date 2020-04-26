import { red } from "@material-ui/core/colors"
import { makeStyles } from "@material-ui/core/styles"
import React from "react"
import { Link } from "react-router-dom"
import "./pccard.sass"
import {
	Card,
	CardMedia,
	CardHeader,
	Avatar,
	CardContent,
	CardActions,
	Typography,
	IconButton,
} from "@material-ui/core"
import DeleteIcon from "@material-ui/icons/Delete"
import FavoriteIcon from "@material-ui/icons/Favorite"
import ShareIcon from "@material-ui/icons/Share"

const useStyles = makeStyles((theme) => ({
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

const PcCard = (props) => {
	const classes = useStyles()

	const { item: pc } = props
	return (
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
					<Link to={`/${pc.ownerName}/${pc.name}`}>
						{pc.name} ({pc._id})
					</Link>
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
	)
}

export default PcCard
