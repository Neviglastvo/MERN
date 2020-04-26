import Avatar from "@material-ui/core/Avatar"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import CardHeader from "@material-ui/core/CardHeader"
import CardMedia from "@material-ui/core/CardMedia"
import { red } from "@material-ui/core/colors"
import Grid from "@material-ui/core/Grid"
import IconButton from "@material-ui/core/IconButton"
import { makeStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import FavoriteIcon from "@material-ui/icons/Favorite"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import ShareIcon from "@material-ui/icons/Share"
import React from "react"

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: "center",
		color: theme.palette.text.secondary,
	},
	formRoot: {
		maxWidth: "100%",
	},
	itemRoot: {
		maxWidth: "100%",
	},
	media: {
		height: "200px",
		// height: 0,
		// paddingTop: "56.25%",
		backgroundSize: "contain",
		borderBottom: "1px solid #ccc",
	},
	avatar: {
		backgroundColor: red[500],
	},
}))

const PcView = ({ pc }) => {
	console.log("pc :", pc)
	const classes = useStyles()
	return (
		<Grid item xs={12}>
			<Card className={classes.itemRoot}>
				<CardMedia
					className={classes.media}
					image="/img/pc/pcThumb.png"
					title="pcThumb"
				/>
				<CardHeader
					avatar={<Avatar aria-label="recipe" className={classes.avatar} />}
					action={
						<IconButton aria-label="settings">
							<MoreVertIcon />
						</IconButton>
					}
					title={pc.name}
					subheader={pc.date}
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
					<IconButton aria-label="share">
						<ShareIcon />
					</IconButton>
				</CardActions>
			</Card>
		</Grid>
	)
}
export default PcView
