import { Avatar } from "@material-ui/core"
import Dialog from "@material-ui/core/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import React from "react"
import Async from "react-async"

const Builder = props => {
	const { onClose, open, id } = props

	const loadComponents = async () => {
		const data = await fetch(`/api/components/type/${id}`)
			.then(res => (res.ok ? res : Promise.reject(res)))
			.then(res => res.json())

		return data
	}

	const handleListItemClick = value => {
		onClose(value, id)
	}

	const handleClose = () => {
		onClose("", id)
	}

	return (
		<Dialog id={id} aria-labelledby={id} open={open} onClose={handleClose}>
			<DialogTitle>Choose {id}</DialogTitle>
			<List>
				<Async promiseFn={loadComponents}>
					<Async.Loading>Loading...</Async.Loading>
					<Async.Fulfilled>
						{data => {
							console.log("data", data)

							return (
								<>
									{data.items.map(component => (
										<ListItem
											key={component.name}
											button
											onClick={() => handleListItemClick(component)}
										>
											{console.log("component :", component)}
											<Avatar>{component.name.substring(0, 1)}</Avatar>
											<ListItemText primary={component.name} />
										</ListItem>
									))}
								</>
							)
						}}
					</Async.Fulfilled>
					<Async.Rejected>
						{error => `Something went wrong: ${error.message}`}
					</Async.Rejected>
				</Async>
			</List>
		</Dialog>
	)
}

export default Builder
