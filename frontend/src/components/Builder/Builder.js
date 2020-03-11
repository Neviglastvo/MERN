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
	const { onClose, open, id, stepsName } = props

	console.log("builder open ", open)

	const loadComponents = async () => {
		const data = await fetch(`/api/components/type/${id}`)
			.then(res => (res.ok ? res : Promise.reject(res)))
			.then(res => res.json())

		return data
	}

	const handleListItemClick = value => {
		if (activeStep === stepsName.length - 1) {
			onClose(value, id)
			return
		}

		handleNext(value)
	}

	const handleClose = () => {
		onClose("", id)
	}

	function getStepContent(stepIndex) {
		switch (stepIndex) {
			case 0:
				return "Select campaign settings...."
			case 1:
				return "What is an ad `1group anyways?"
			case 2:
				return "This is the bit I really care about!"
			default:
				return "Unknown stepIndex"
		}
	}

	const [activeStep, setActiveStep] = useState(0)
	const steps = stepsName

	const handleNext = () => {
		setActiveStep(prevActiveStep => prevActiveStep + 1)
	}

	const handleBack = () => {
		setActiveStep(prevActiveStep => prevActiveStep - 1)
	}

	const handleReset = () => {
		setActiveStep(0)
	}
	console.log("builder open ", open)

	return (
		<Dialog id={id} aria-labelledby={id} open={open} onClose={handleClose}>
			<DialogTitle>Choose {id}</DialogTitle>
			<List>
				{console.log("builder open ", open)}

				<Async promiseFn={loadComponents}>
					<Async.Loading>Loading...</Async.Loading>
					<Async.Fulfilled>
						{data => {
							console.log("data", data)

							return (
								<>
									{data.items.map(component => (
										<ListItem
											button
											onClick={() => handleListItemClick(component.name)}
											key={component.name}
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
