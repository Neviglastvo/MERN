import { Button, makeStyles, Paper, TextField } from "@material-ui/core"
import React, { useState } from "react"

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: "center",
		color: theme.palette.text.secondary,
		backgroundColor: "rgba(255, 255, 255, .75)",
	},
	formRoot: {
		display: "flex",
		flexDirection: "column",
	},
	item: {
		display: "flex",
		marginBottom: "10px",
	},
}))

const ComponentCreate = props => {
	console.log("ComponentCreate ")
	const classes = useStyles()

	const [values, setValues] = useState({
		name: Math.random()
			.toString(36)
			.substring(7),
		descr: "This is a component",
		type: "1",
		manufacturer: "2",
	})

	const handleValueChange = prop => event => {
		setValues({ ...values, [prop]: event.target.value })
	}

	return (
		<Paper className={classes.paper}>
			<form id="pc" className={classes.formRoot} noValidate autoComplete="off">
				<TextField
					id="name"
					className={classes.item}
					name="name"
					label="Title"
					variant="outlined"
					value={values.name}
					onChange={handleValueChange("name")}
				/>
				<TextField
					id="descr"
					className={classes.item}
					name="descr"
					label="Descr"
					multiline
					rowsMax="4"
					variant="outlined"
					value={values.descr}
					onChange={handleValueChange("descr")}
				/>
				<TextField
					id="type"
					className={classes.item}
					name="type"
					label="Type"
					variant="outlined"
					value={values.type}
					onChange={handleValueChange("type")}
				/>
				<TextField
					id="manufacturer"
					className={classes.item}
					name="manufacturer"
					label="Manufacturer"
					variant="outlined"
					value={values.manufacturer}
					onChange={handleValueChange("manufacturer")}
				/>

				<Button
					variant="contained"
					color="primary"
					onClick={() => props.createHandler(values)}
				>
					Save
				</Button>
			</form>
		</Paper>
	)
}

export default ComponentCreate
