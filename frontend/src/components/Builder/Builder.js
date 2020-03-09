import { Avatar } from "@material-ui/core"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import Step from "@material-ui/core/Step"
import StepLabel from "@material-ui/core/StepLabel"
import Stepper from "@material-ui/core/Stepper"
import Typography from "@material-ui/core/Typography"
import React, { useState } from "react"
import Async from "react-async"
import { useHttp } from "../../hooks/http.hook"

const Builder = props => {
	const { request } = useHttp()

	const loadComponents = async component => {
		// fetch(`/api/components/type/${component}`)

		const data = await fetch(`/api/components/type/2`)
			.then(res => (res.ok ? res : Promise.reject(res)))
			.then(res => res.json())

		console.log("data", data)
		return data
	}

	const { onClose, selectedValue, open, setOpen } = props

	const handleListItemClick = value => {
		console.log("activeStep", activeStep)
		console.log("value", value)

		if (activeStep === props.stepsName.length - 1) {
			console.log("activeStep === props.stepsName.length - 1", "yes")

			onClose(value)
			return
		}

		handleNext(value)
	}

	const handleClose = () => {
		onClose(selectedValue)
	}

	function getStepContent(stepIndex) {
		switch (stepIndex) {
			case 0:
				return "Select campaign settings...."
			case 1:
				return "What is an ad group anyways?"
			case 2:
				return "This is the bit I really care about!"
			default:
				return "Unknown stepIndex"
		}
	}

	const [activeStep, setActiveStep] = useState(0)
	const steps = props.stepsName

	const handleNext = () => {
		setActiveStep(prevActiveStep => prevActiveStep + 1)
	}

	const handleBack = () => {
		setActiveStep(prevActiveStep => prevActiveStep - 1)
	}

	const handleReset = () => {
		setActiveStep(0)
	}

	const [values, setValues] = useState()

	return (
		<Dialog
			aria-labelledby={props.componentName}
			open={open}
			onClose={handleClose}
		>
			<DialogTitle id={props.componentName}>
				Choose {props.componentName}
			</DialogTitle>
			<List>
				{open && (
					<Async promiseFn={loadComponents}>
						<Async.Loading>Loading...</Async.Loading>
						<Async.Fulfilled>
							{data => {
								return (
									<>
										{data.items.map(component => (
											<ListItem
												button
												onClick={() => handleListItemClick(component._id)}
												key={component._id}
											>
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
				)}
				{/* {open & (values !== undefined) ? (
					values.map(value => (
						<ListItem button onClick={() => handleListItemClick(value)} key={value}>
							<ListItemText primary={value.name} />
						</ListItem>
					))
				) : (
					<div>Loading</div>
				)} */}
			</List>

			<Typography>{getStepContent(activeStep)}</Typography>
			<Stepper activeStep={activeStep} alternativeLabel>
				{steps.map(label => (
					<Step key={label}>
						<StepLabel>{label}</StepLabel>
					</Step>
				))}
			</Stepper>
			<div>
				{activeStep === steps.length ? (
					<div>
						<Typography>All steps completed</Typography>
						<Button onClick={handleReset}>Reset</Button>
					</div>
				) : (
					<div>
						<div>
							<Button disabled={activeStep === 0} onClick={handleBack}>
								Back
							</Button>
						</div>
					</div>
				)}
			</div>
		</Dialog>
	)
}

export default Builder
