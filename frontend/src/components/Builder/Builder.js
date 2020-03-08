import Avatar from "@material-ui/core/Avatar"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import ListItemText from "@material-ui/core/ListItemText"
import Step from "@material-ui/core/Step"
import StepLabel from "@material-ui/core/StepLabel"
import Stepper from "@material-ui/core/Stepper"
import Typography from "@material-ui/core/Typography"
import PersonIcon from "@material-ui/icons/Person"
import React, { useState } from "react"

const Builder = props => {
	const { onClose, open } = props

	const handleListItemClick = value => {
		console.log("activeStep", activeStep)
		console.log("value", value)
		if (activeStep === props.stepsName.length - 1) {
			onClose(value)
			return
		}

		handleNext(value)
	}

	function getStepContent(stepIndex) {
		switch (stepIndex) {
			case 0:
				return "Select campaign settings..."
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

	return (
		<Dialog onClose={onClose} aria-labelledby={props.componentName} open={open}>
			<DialogTitle id={props.componentName}>
				Choose {props.componentName}
			</DialogTitle>
			<List>
				{props.values.map(value => (
					<ListItem button onClick={() => handleListItemClick(value)} key={value}>
						<ListItemAvatar>
							<Avatar>
								<PersonIcon />
							</Avatar>
						</ListItemAvatar>
						<ListItemText primary={value} />
					</ListItem>
				))}
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
