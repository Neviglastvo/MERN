import { Avatar } from "@material-ui/core"
import AppBar from "@material-ui/core/AppBar"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import IconButton from "@material-ui/core/IconButton"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
// import { TransitionProps } from "@material-ui/core/transitions"
import Step from "@material-ui/core/Step"
import StepLabel from "@material-ui/core/StepLabel"
import Stepper from "@material-ui/core/Stepper"
import { createStyles, makeStyles } from "@material-ui/core/styles"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import CloseIcon from "@material-ui/icons/Close"
import { Loader } from "components/Loader/Loader"
import React from "react"

const useStyles = makeStyles(() =>
	createStyles({
		appBar: {
			position: "relative",
		},
		title: {
			// marginLeft: theme.spacing(2),
			flex: 1,
		},
		name: {
			marginLeft: "15px",
		},
	}),
)

const BuilderPopup = ({ components, onClose, open, componentType }) => {
	const classes = useStyles()

	function getSteps() {
		return [
			// `Choose INTEL or AMD pc`,
			`Choose ${componentType} manufacturer`,
			`Choose ${componentType} form-factor (size)`,
			`Choose ${componentType} socket`,
			`Choose ${componentType}`,
		]
	}

	function getStepContent(stepIndex) {
		switch (stepIndex) {
			case 0:
				return (
					<List>
						{components[componentType] ? (
							components[componentType].map((component) => (
								<ListItem
									key={component.manufacturer}
									button
									onClick={() => handleListItemClick(component)}
								>
									{/* {console.log("component :", component)} */}
									<Avatar>{component.name.substring(0, 1)}</Avatar>
									<ListItemText primary={component.name} />
								</ListItem>
							))
						) : (
							<Loader open />
						)}
					</List>
				)
			case 1:
				return "What is an ad group anyways?"
			case 2:
				return (
					<List>
						{components[componentType] ? (
							components[componentType].map((component) => (
								<ListItem
									key={component.name}
									button
									onClick={() => handleListItemClick(component)}
								>
									{/* {console.log("component :", component)} */}
									<Avatar>{component.name.substring(0, 1)}</Avatar>
									<ListItemText primary={component.name} />
								</ListItem>
							))
						) : (
							<Loader open />
						)}
					</List>
				)
			default:
				return "Unknown stepIndex"
		}
	}

	const [activeStep, setActiveStep] = React.useState(0)
	const steps = getSteps()

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1)
	}

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1)
	}

	const handleReset = () => {
		setActiveStep(0)
	}

	const handleListItemClick = (value) => {
		onClose(value, componentType)
	}

	const handleClose = () => {
		onClose("", componentType)
	}

	return (
		<Dialog
			fullScreen
			id={componentType}
			aria-labelledby={componentType}
			open={open}
			onClose={handleClose}
		>
			<AppBar className={classes.appBar}>
				<Toolbar>
					<IconButton
						edge="start"
						color="inherit"
						onClick={handleClose}
						aria-label="close"
					>
						<CloseIcon />
					</IconButton>
					<Typography variant="h6" className={classes.title}>
						Choose {componentType}
					</Typography>
				</Toolbar>
			</AppBar>

			<div className={classes.root}>
				<div>
					{activeStep === steps.length ? (
						<div>
							<Typography className={classes.instructions}>
								All steps completed
							</Typography>
							<Button onClick={handleReset}>Reset</Button>
						</div>
					) : (
						<div>
							<div className={classes.instructions}>{getStepContent(activeStep)}</div>
							<div>
								<Button
									disabled={activeStep === 0}
									onClick={handleBack}
									className={classes.backButton}
								>
									Back
								</Button>
								<Button variant="contained" color="primary" onClick={handleNext}>
									{activeStep === steps.length - 1 ? "Finish" : "Next"}
								</Button>
							</div>
						</div>
					)}
				</div>
				<Stepper activeStep={activeStep} alternativeLabel>
					{steps.map((label) => (
						<Step key={label}>
							<StepLabel>{label}</StepLabel>
						</Step>
					))}
				</Stepper>
			</div>
		</Dialog>
	)
}

export default BuilderPopup
