import { TextField } from "@material-ui/core"
import Button from "@material-ui/core/Button"
import { makeStyles } from "@material-ui/core/styles"
import React, { useContext, useEffect, useState } from "react"
import BuilderPopup from "../../components/BuilderPopup/BuilderPopup"
import { useAlert } from "../../hooks/alert.hook"
import { useHttp } from "../../hooks/http.hook"
import "./BuildPage.sass"
import { useDispatch, useSelector } from "react-redux"
import { builderActions } from "redux/actions/index"

const useStyles = makeStyles((theme) => ({
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
	itemHidden: {
		display: "block",
		position: "absolute",
		width: "100%",
		height: "100%",
		top: 0,
		left: 0,
		opacity: 0,
		"& input": {
			cursor: "pointer",
		},
		"&:hover": {
			cursor: "pointer",
		},
	},
}))

const BuildPage = () => {
	const classes = useStyles()
	const message = useAlert()
	const dispatch = useDispatch()

	const auth = useSelector((state) => state.auth)

	const user = auth.user
	const token = auth.user.token
	const username = user && user.userName

	const componentsInPopup = useSelector(
		(state) => state.builder.fetchedComponents,
	)

	const buildedItems = useSelector((state) => state.builder.itemBuilded)

	const { request } = useHttp()

	const createHandler = async (values) => {
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
		return Math.floor(Math.random() * (max - min)) + min
	}

	// Builder.propTypes = {
	// 	onClose: checkPropTypes.func.isRequired,
	// 	open: checkPropTypes.bool.isRequired,
	// 	selectedValue: checkPropTypes.string.isRequired,
	// }
	const [values, setValues] = useState({
		name: Math.random().toString(36).substring(7),
		descr: "qwe",
		grade: getRandomInt(1, 12),
		motherboard: "",
		cpu: "",
		ram: "",
		gpu: "",
		psu: "",
	})

	const handleValueChange = (prop) => (event) => {
		setValues({ ...values, [prop]: event.target.value })
		dispatch(
			builderActions.setBuildedValue({
				["isComponent"]: false,
				["type"]: prop,
				["item"]: event.target.value,
			}),
		)
	}

	const [open, setOpen] = useState(false)
	const [component, setComponent] = useState({})

	const handleClickOpen = (componentName) => {
		setComponent({
			componentType: componentName,
		})
		setOpen(true)
		dispatch(builderActions.getComponentsByType(componentName))
	}

	const onClose = (value, componentName) => {
		setOpen(false)
		setValues({ ...values, [componentName]: value })
		dispatch(
			builderActions.setBuildedValue({
				["isComponent"]: true,
				["type"]: componentName,
				["item"]: value,
			}),
		)
	}

	// useEffect(() => {
	// 	console.log("useEffect open :", open)
	// 	console.log("useEffect components :", components)
	// }, [open, component])

	return (
		<div className="builder">
			<BuilderPopup
				componentType={component.componentType}
				open={open}
				onClose={onClose}
				components={componentsInPopup}
			/>

			<div className="builder__container">
				<div className="builder__item builder__item--1 builder__item--active">
					<TextField
						id="name"
						className={classes.item}
						name="name"
						label="TITLE"
						value={values.name}
						onChange={handleValueChange("name")}
					/>
				</div>
				<div className="builder__item builder__item--2 builder__item--active">
					<TextField
						id="grade"
						className={classes.item}
						name="grade"
						label="GRADE"
						value={values.grade}
						onChange={handleValueChange("grade")}
					/>
				</div>
				<div className="builder__item builder__item--3 builder__item--active">
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
				<div className="builder__item builder__item--8 builder__item--active">
					<div className="builder__item-title">
						{values.ram.name ? values.ram.name : "RAM"}
					</div>
					<TextField
						id="ram"
						className={(classes.item, classes.itemHidden)}
						name="ram"
						label="RAM"
						value={values.ram}
						onChange={handleValueChange("ram")}
						onClick={() => {
							handleClickOpen("ram")
						}}
					/>
				</div>
				<div className="builder__item builder__item--9">Empty</div>
				<div className="builder__item builder__item--subitems builder__item--10">
					<div className="builder__subitem">SSD</div>
					<div className="builder__subitem">M2</div>
					<div className="builder__subitem">Empty</div>
					<div className="builder__subitem">Empty</div>
				</div>
				<div className="builder__item builder__item--11 builder__item--active">
					<div className="builder__item-title">
						{values.gpu.name ? values.gpu.name : "GPU"}
					</div>
					<TextField
						id="gpu"
						className={(classes.item, classes.itemHidden)}
						name="gpu"
						label="GPU"
						value={values.gpu}
						onChange={handleValueChange("gpu")}
						onClick={() => {
							handleClickOpen("gpu")
						}}
					/>
				</div>
				<div className="builder__item builder__item--12 builder__item--active">
					<div className="builder__item-title">
						{buildedItems.components.motherboard
							? buildedItems.components.motherboard.name
							: "MOTHERBOARD"}
					</div>
					<TextField
						id="motherboard"
						className={(classes.item, classes.itemHidden)}
						name="motherboard"
						label="MOTHERBOARD"
						// value={values.motherboard}
						onChange={handleValueChange("motherboard")}
						onClick={() => {
							handleClickOpen("motherboard")
						}}
					/>
				</div>
				<div className="builder__item builder__item--13">Empty</div>
				<div className="builder__item builder__item--14 builder__item--active">
					<div className="builder__item-title">
						{values.psu.name ? values.psu.name : "PSU"}
					</div>
					<TextField
						id="psu"
						className={(classes.item, classes.itemHidden)}
						name="psu"
						label="PSU"
						value={values.psu}
						onChange={handleValueChange("psu")}
						onClick={() => {
							handleClickOpen("psu")
						}}
					/>
				</div>
				<div className="builder__item builder__item--15">Empty</div>
				<div className="builder__item builder__item--16 builder__item--active">
					<div className="builder__item-title">
						{values.cpu.name ? values.cpu.name : "CPU"}
					</div>
					<TextField
						id="cpu"
						className={(classes.item, classes.itemHidden)}
						name="cpu"
						label="CPU"
						value={values.cpu}
						onChange={handleValueChange("cpu")}
						onClick={() => {
							handleClickOpen("cpu")
						}}
					/>
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
