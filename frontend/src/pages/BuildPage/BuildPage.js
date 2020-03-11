import { TextField } from "@material-ui/core"
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import { makeStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import React, { useContext, useState, useEffect } from "react"
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
		display: "flex",
	},
}))

const BuildPage = () => {
	const classes = useStyles()
	const message = useAlert()

	const { request } = useHttp()
	const { token } = useContext(AuthContext)

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

	function getRandomInt(min, max) {
		min = Math.ceil(min)
		max = Math.floor(max)
		return Math.floor(Math.random() * (max - min)) + min //Максимум не включается, минимум включается
	}

	// Builder.propTypes = {
	// 	onClose: checkPropTypes.func.isRequired,
	// 	open: checkPropTypes.bool.isRequired,
	// 	selectedValue: checkPropTypes.string.isRequired,
	// }
	const [values, setValues] = useState({
		name: Math.random()
			.toString(36)
			.substring(7),
		descr: "qwe",
		grade: getRandomInt(1, 12),
		motherboard: "motherboard",
		cpu: "cpu",
	})

	const handleValueChange = prop => event => {
		setValues({ ...values, [prop]: event.target.value })
	}

	/////////////////////////////////////////////////////
	const [open, setOpen] = useState({ motherboard: false, cpu: false })
	const [component, setComponent] = useState({
		id: "cpu",
		open: { motherboard: false, cpu: false },
		// selectedValue: null,
	})

	const handleClickOpen = (componentName, componentValues, popupOpen) => {
		console.log("componentName :", componentName)
		console.log("componentValues :", componentValues)
		console.log("popupOpen :", popupOpen)
		setComponent({
			id: componentName,
			open: { [componentName]: true },
		})
		setOpen({ [componentName]: true })
	}

	const onClose = (value, prop) => {
		setOpen({ [prop]: false })
		setValues({ ...values, [prop]: value })
	}

	useEffect(() => {
		console.log("open :", open)
		console.log("component :", component)
		console.log("open[component.id] :", open[component.id])
	}, [open, component])
	////////////////////////////////////////////

	return (
		<div className="builder">
			<Builder
				id={component.id}
				stepsName={["Step1", "Step2", "Step3"]}
				stepsContent={["Step1 content", "Step2 content", "Step3 content"]}
				open={open[component.id]}
				onClose={onClose}
			/>

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
				<div className="builder__item builder__item--subitems builder__item--10">
					<div className="builder__subitem">SSD</div>
					<div className="builder__subitem">M2</div>
					<div className="builder__subitem">Empty</div>
					<div className="builder__subitem">Empty</div>
				</div>
				<div className="builder__item builder__item--11">VGA</div>
				<div className="builder__item builder__item--12">
					<TextField
						id="motherboard"
						className={classes.item}
						name="motherboard"
						label="Motherboard"
						value={values.motherboard}
						onChange={handleValueChange("motherboard")}
						onClick={() => {
							handleClickOpen("motherboard", values.motherboard, open.motherboard)
						}}
					/>
				</div>
				<div className="builder__item builder__item--13">Empty</div>
				<div className="builder__item builder__item--14">PSU</div>
				<div className="builder__item builder__item--15">Empty</div>
				<div className="builder__item builder__item--16">
					<TextField
						id="cpu"
						className={classes.item}
						name="cpu"
						label="CPU"
						value={values.cpu}
						onChange={handleValueChange("cpu")}
						onClick={() => {
							handleClickOpen("motherboard", values.cpu, open.cpu)
						}}
					/>
					{/* <Builder
						id="cpu"
						stepsName={["Step1", "Step2", "Step3"]}
						stepsContent={["Step1 content", "Step2 content", "Step3 content"]}
						selectedValue={values.cpu}
						open={open.cpu}
						onClose={onClose}
					/> */}
				</div>
				<div className="builder__item builder__item--17">PCI-E</div>
				<div className="builder__item builder__item--18">PCI-E</div>
				<div className="builder__item builder__item--19">PCI-E</div>
				<div className="builder__item builder__item--subitems builder__item--20">
					<div className="builder__subitem">FAN</div>
					<div className="builder__subitem">FAN</div>
					<div className="builder__subitem">FAN</div>
					<div className="builder__subitem">FAN</div>
				</div>
			</div>
		</div>
	)
}

export default BuildPage
