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
		width: "100%",
		display: "flex",
		marginBottom: "10px",
	},
}))

export const PcCreate = props => {
	const classes = useStyles()

	function getRandomInt(min, max) {
		min = Math.ceil(min)
		max = Math.floor(max)
		return Math.floor(Math.random() * (max - min)) + min //Максимум не включается, минимум включается
	}

	const [values, setValues] = useState({
		name: Math.random()
			.toString(36)
			.substring(7),
		descr: "qwe",
		grade: getRandomInt(1, 12),
	})

	const handleValueChange = prop => event => {
		console.log("handleValueChange", event.target.value)
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
					id="grade"
					className={classes.item}
					name="grade"
					label="Grade"
					variant="outlined"
					value={values.grade}
					onChange={handleValueChange("grade")}
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
