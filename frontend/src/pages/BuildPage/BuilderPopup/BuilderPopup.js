import { Avatar } from "@material-ui/core"
import AppBar from "@material-ui/core/AppBar"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import IconButton from "@material-ui/core/IconButton"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import Slide from "@material-ui/core/Slide"
import Toolbar from "@material-ui/core/Toolbar"
// import { TransitionProps } from "@material-ui/core/transitions"
import Typography from "@material-ui/core/Typography"
import CloseIcon from "@material-ui/icons/Close"
import { Loader } from "components/Loader/Loader"
import React from "react"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		appBar: {
			position: "relative",
		},
		title: {
			marginLeft: theme.spacing(2),
			flex: 1,
		},
	}),
)

// const Transition = React.forwardRef(function Transition(
// 	props: TransitionProps & { children?: React.ReactElement },
// 	ref: React.Ref<unknown>,
// ) {
// 	return <Slide direction="up" ref={ref} {...props} />
// })

const BuilderPopup = ({ components, onClose, open, componentType }) => {
	const classes = useStyles()

	// console.log("props :>> ", props)

	const handleListItemClick = (value) => {
		onClose(value, componentType)
	}

	const handleClose = () => {
		onClose("", componentType)
	}

	return (
		<Dialog
			fullScreen
			id={componentType}
			aria-labelledby={componentType}
			open={open}
			onClose={handleClose}
		>
			<AppBar className={classes.appBar}>
				<Toolbar>
					<IconButton
						edge="start"
						color="inherit"
						onClick={handleClose}
						aria-label="close"
					>
						<CloseIcon />
					</IconButton>
					<Typography variant="h6" className={classes.title}>
						Choose {componentType}
					</Typography>
				</Toolbar>
			</AppBar>
			<List>
				{components[componentType] ? (
					components[componentType].map((component) => (
						<ListItem
							key={component.name}
							button
							onClick={() => handleListItemClick(component)}
						>
							{/* {console.log("component :", component)} */}
							<Avatar>{component.name.substring(0, 1)}</Avatar>
							<ListItemText primary={component.name} />
						</ListItem>
					))
				) : (
					<Loader open />
				)}
			</List>
		</Dialog>
	)
}

export default BuilderPopup
