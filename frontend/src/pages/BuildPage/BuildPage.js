import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import { makeStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import PropTypes from "prop-types"
import React, { useCallback, useEffect, useState } from "react"
import Builder from "../../components/Builder/Builder"
import { useHttp } from "../../hooks/http.hook"
import "./BuildPage.sass"

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
}))

Builder.propTypes = {
	onClose: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired,
	selectedValue: PropTypes.string.isRequired,
}

const BuildPage = () => {
	const classes = useStyles()
	const { request } = useHttp()

	const [open, setOpen] = useState(false)
	const [selectedValue, setSelectedValue] = useState()

	useEffect(() => {
		console.log("useEffect selectedValue", selectedValue)
	})

	const handleClickOpen = () => {
		setOpen(true)
	}

	const onClose = value => {
		console.log("onClose value", value)
		setOpen(false)
		setSelectedValue(value)
		console.log("selectedValue", selectedValue)
	}

	const fetch = useCallback(
		async component => {
			const data = await request(`/api/${component}`, "GET", null)
		},
		[request],
	)

	return (
		<Grid container spacing={2} className={classes.root}>
			{/* <Grid item xs={12}>
				<PcCreate />
			</Grid> */}

			<Grid item xs={12}>
				<div className="builder">
					<div className="builder__container">
						<div className="builder__item builder__item--1">Name</div>
						<div className="builder__item builder__item--2">Score</div>
						<div className="builder__item builder__item--3">Price</div>
						<div className="builder__item builder__item--4">Motherboard</div>
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
							<Button variant="outlined" color="secondary" onClick={handleClickOpen}>
								Select Motherboard
							</Button>
							<Builder
								selectedValue={""}
								open={open}
								onClose={onClose}
								componentName={"Motherboard"}
								values={["username@gmail.com", "user02@gmail.com"]}
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
