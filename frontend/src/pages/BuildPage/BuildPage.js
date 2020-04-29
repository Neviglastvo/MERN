import { TextField } from "@material-ui/core"
import Button from "@material-ui/core/Button"
import { makeStyles } from "@material-ui/core/styles"
import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { builderActions } from "redux/actions/index"
import BuilderPopup from "../../components/BuilderPopup/BuilderPopup"
import "./BuildPage.sass"

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
	const dispatch = useDispatch()

	const auth = useSelector((state) => state.auth)

	const user = auth.user
	const token = user && user.token
	const username = user && user.userName

	const componentsInPopup = useSelector(
		(state) => state.builder.fetchedComponents,
	)

	const buildedItems = useSelector((state) => state.builder.itemBuilded)

	const [open, setOpen] = useState(false)
	const [componentType, setComponentType] = useState({})

	const handleValueChange = (prop) => (event) => {
		dispatch(
			builderActions.setBuildedValue({
				["isComponent"]: false,
				["type"]: prop,
				["item"]: event.target.value,
			}),
		)
	}

	const handleClickOpen = (componentName) => {
		setComponentType({
			componentType: componentName,
		})
		setOpen(true)
		dispatch(builderActions.getComponentsByType(componentName))
	}

	const onClose = (value, componentName) => {
		setOpen(false)
		dispatch(
			builderActions.setBuildedValue({
				["isComponent"]: true,
				["type"]: componentName,
				["item"]: value,
			}),
		)
	}

	const createHandler = async () => {
		console.log("buildedItems", buildedItems)
		dispatch(builderActions.create(buildedItems))
	}

	return (
		<div className="builder">
			<BuilderPopup
				componentType={componentType.componentType}
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
						value={buildedItems.name}
						onChange={handleValueChange("name")}
					/>
				</div>
				<div className="builder__item builder__item--2 builder__item--active">
					<TextField
						id="grade"
						className={classes.item}
						name="grade"
						label="GRADE"
						value={buildedItems.grade}
						onChange={handleValueChange("grade")}
					/>
				</div>
				<div className="builder__item builder__item--3 builder__item--active">
					<Button variant="contained" color="primary" onClick={createHandler}>
						Save
					</Button>
				</div>
				<div className="builder__item builder__item--4">Empty</div>
				<div className="builder__item builder__item--5">Empty</div>
				<div className="builder__item builder__item--6">CPU</div>
				<div className="builder__item builder__item--7">CPU Cooler</div>
				<div className="builder__item builder__item--8 builder__item--active">
					<div className="builder__item-title">
						{buildedItems.components.ram ? buildedItems.components.ram.name : "RAM"}
					</div>
					<TextField
						id="ram"
						className={(classes.item, classes.itemHidden)}
						name="ram"
						label="RAM"
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
						{buildedItems.components.gpu ? buildedItems.components.gpu.name : "GPU"}
					</div>
					<TextField
						id="gpu"
						className={(classes.item, classes.itemHidden)}
						name="gpu"
						label="GPU"
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
						onChange={handleValueChange("motherboard")}
						onClick={() => {
							handleClickOpen("motherboard")
						}}
					/>
				</div>
				<div className="builder__item builder__item--13">Empty</div>
				<div className="builder__item builder__item--14 builder__item--active">
					<div className="builder__item-title">
						{buildedItems.components.psu ? buildedItems.components.psu.name : "PSU"}
					</div>
					<TextField
						id="psu"
						className={(classes.item, classes.itemHidden)}
						name="psu"
						label="PSU"
						onChange={handleValueChange("psu")}
						onClick={() => {
							handleClickOpen("psu")
						}}
					/>
				</div>
				<div className="builder__item builder__item--15">Empty</div>
				<div className="builder__item builder__item--16 builder__item--active">
					<div className="builder__item-title">
						{buildedItems.components.cpu ? buildedItems.components.cpu.name : "CPU"}
					</div>
					<TextField
						id="cpu"
						className={(classes.item, classes.itemHidden)}
						name="cpu"
						label="CPU"
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

// for (let index = 0; index < array.length; index++) {
// 	const element = array[index];

// }
