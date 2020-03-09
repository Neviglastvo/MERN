import { TextField } from "@material-ui/core"
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import { makeStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import React, { useContext, useState } from "react"
import Builder from "../../components/Builder/Builder"
import { AuthContext } from "../../context/AuthContext"
import { useAlert } from "../../hooks/alert.hook"
import { useHttp } from "../../hooks/http.hook"
import "./BuildPage.sass"
import { checkPropTypes } from "prop-types"

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
	},
	backButton: {
		marginRight: theme.spacing(1),
	},
	instructions: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
	},
	item: {
		width: "100%",
		height: "100%",
		display: "flex",
	},
}))

// Builder.propTypes = {
// 	onClose: PropTypes.func.isRequired,
// 	open: PropTypes.bool.isRequired,
// 	selectedValue: PropTypes.string.isRequired,
// }

const BuildPage = () => {
	const classes = useStyles()
	const message = useAlert()

	const { request } = useHttp()
	const { token } = useContext(AuthContext)

	const [values, setValues] = useState({
		name: Math.random()
			.toString(36)
			.substring(7),
		descr: "qwe",
		grade: getRandomInt(1, 12),
	})

	function getRandomInt(min, max) {
		min = Math.ceil(min)
		max = Math.floor(max)
		return Math.floor(Math.random() * (max - min)) + min //Максимум не включается, минимум включается
	}

	const handleValueChange = prop => event => {
		console.log("handleValueChange", event.target.value)
		setValues({ ...values, [prop]: event.target.value })
	}

	// const handleClickOpen = () => {
	// 	setOpen(true)
	// }

	// const handleClose = value => {
	// 	console.log("open :", open)
	// 	setOpen(false)
	// 	console.log("open :", open)
	// 	setSelectedValue(value)
	// }
	/////////////////////////////////////////////////////
	const [open, setOpen] = useState(false)
	const [selectedValue, setSelectedValue] = useState()

	const handleClickOpen = () => {
		setOpen(true)
	}

	const handleClose = value => {
		setOpen(false)
		setSelectedValue(value)
	}
	////////////////////////////////////////////
	const createHandler = async values => {
		console.log("values", values)
		try {
			await request(
				"/api/pc/generate",
				"POST",
				{ ...values },
				{ Authorization: `Bearer ${token}` },
			)
			message(`PC with name: ${values.name} saved`)
			console.log("values", values)
		} catch (error) {
			console.error(error)
		}
	}

	// Builder.propTypes = {
	// 	onClose: checkPropTypes.func.isRequired,
	// 	open: checkPropTypes.bool.isRequired,
	// 	selectedValue: checkPropTypes.string.isRequired,
	// }

	return (
		<Grid container spacing={2} className={classes.root}>
			{/* <Grid item xs={12}>
				<PcCreate />
			</Grid> */}

			<Grid item xs={12}>
				<div className="builder">
					<div className="builder__container">
						<div className="builder__item builder__item--1">
							<TextField
								id="name"
								className={classes.item}
								name="name"
								label="Title"
								value={values.name}
								onChange={handleValueChange("name")}
							/>
						</div>
						<div className="builder__item builder__item--2">
							<TextField
								id="grade"
								className={classes.item}
								name="grade"
								label="Grade"
								value={values.grade}
								onChange={handleValueChange("grade")}
							/>
						</div>
						<div className="builder__item builder__item--3">
							<Button
								variant="contained"
								color="primary"
								onClick={() => createHandler(values)}
							>
								Save
							</Button>
						</div>
						<div className="builder__item builder__item--4">Empty</div>
						<div className="builder__item builder__item--5">Empty</div>
						<div className="builder__item builder__item--6">CPU</div>
						<div className="builder__item builder__item--7">CPU Cooler</div>
						<div className="builder__item builder__item--8">RAM</div>
						<div className="builder__item builder__item--9">Empty</div>
						<div className="builder__item builder__item--10">
							<div className="builder__subitem">SSD</div>
							<div className="builder__subitem">M2</div>
							<div className="builder__subitem">Empty</div>
							<div className="builder__subitem">Empty</div>
						</div>
						<div className="builder__item builder__item--11">VGA</div>
						<div className="builder__item builder__item--12">
							<Typography variant="subtitle1">Selected: {selectedValue}</Typography>
							<br />
							<Button variant="contained" color="secondary" onClick={handleClickOpen}>
								Choose motherboard
							</Button>
							<Builder
								selectedValue={selectedValue}
								open={open}
								onClose={handleClose}
								componentName={"motherboard"}
								stepsName={["Step1", "Step2", "Step3"]}
								stepsContent={["Step1 content", "Step2 content", "Step3 content"]}
							/>
							{/* <SimpleDialog selectedValue={""} open={open} onClose={onClose} /> */}
						</div>
						<div className="builder__item builder__item--13">Empty</div>
						<div className="builder__item builder__item--14">PSU</div>
						<div className="builder__item builder__item--15">Empty</div>
						<div className="builder__item builder__item--16">PCI-E</div>
						<div className="builder__item builder__item--17">PCI-E</div>
						<div className="builder__item builder__item--18">PCI-E</div>
						<div className="builder__item builder__item--19">PCI-E</div>
						<div className="builder__item builder__item--20">
							<div className="builder__subitem">FAN</div>
							<div className="builder__subitem">FAN</div>
							<div className="builder__subitem">FAN</div>
							<div className="builder__subitem">FAN</div>
						</div>
					</div>
				</div>
			</Grid>
		</Grid>
	)
}

export default BuildPage
