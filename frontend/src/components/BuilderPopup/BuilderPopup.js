import { Avatar } from "@material-ui/core"
import Dialog from "@material-ui/core/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import { Loader } from "components/Loader/Loader"
import React from "react"
import { useSelector } from "react-redux"

const BuilderPopup = (props) => {
	const { components, onClose, open, componentType } = props

	// console.log("props :>> ", props)

	const handleListItemClick = (value) => {
		onClose(value, componentType)
	}

	const handleClose = () => {
		onClose("", componentType)
	}

	return (
		<Dialog
			id={componentType}
			aria-labelledby={componentType}
			open={open}
			onClose={handleClose}
		>
			<DialogTitle>Choose {componentType}</DialogTitle>
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
