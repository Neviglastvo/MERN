import Avatar from "@material-ui/core/Avatar"
import Button from "@material-ui/core/Button"
import Checkbox from "@material-ui/core/Checkbox"
import FormControl from "@material-ui/core/FormControl"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import IconButton from "@material-ui/core/IconButton"
import InputAdornment from "@material-ui/core/InputAdornment"
import InputLabel from "@material-ui/core/InputLabel"
import OutlinedInput from "@material-ui/core/OutlinedInput"
import { makeStyles } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import Visibility from "@material-ui/icons/Visibility"
import VisibilityOff from "@material-ui/icons/VisibilityOff"
import clsx from "clsx"
import React, { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import { useAlert } from "../../hooks/alert.hook"
import { useHttp } from "../../hooks/http.hook"

const useStyles = makeStyles(theme => ({
	paper: {
		marginTop: "auto",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		padding: "15px",
	},
	avatar: {
		backgroundColor: theme.palette.secondary.main,
		margin: theme.spacing(0, 0, 1),
	},
	title: {
		margin: theme.spacing(0, 0, 3),
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	input: {
		margin: theme.spacing(0, 0, 2),
	},
	rememberMe: {
		margin: theme.spacing(0, 0, 2),
	},
	submit: {
		margin: theme.spacing(0, 0, 2),
	},
}))

export const User = () => {
	const auth = useContext(AuthContext)
	const isAuth = auth.isAuth
	const username = auth.userName

	const { loading, error, request, clearError } = useHttp(),
		classes = useStyles(),
		message = useAlert(),
		[values, setValues] = useState({
			email: "admin@qwe.qwe",
			password: "313233",
			showPassword: false,
		})

	useEffect(() => {
		message(error)
		clearError()
	}, [error, message, clearError])

	const handleValueChange = prop => event => {
		setValues({ ...values, [prop]: event.target.value })
	}

	const handleClickShowPassword = () => {
		setValues({ ...values, showPassword: !values.showPassword })
	}

	const handleMouseDownPassword = event => {
		event.preventDefault()
	}

	const registerHandler = async () => {
		try {
			const data = await request("/api/auth/register", "POST", { ...values })
			message(data.message)
		} catch (error) {
			console.log(error)
		}
	}

	const loginHandler = async () => {
		try {
			const data = await request("/api/auth/login", "POST", { ...values })
			message(data.message)
			auth.login(data.token, data.userId, data.userName)
		} catch (error) {
			console.log(error)
		}
	}

	const logoutHandler = event => {
		event.preventDefault()
		auth.logout()
	}

	return (
		<React.Fragment>
			{!isAuth ? (
				<div className={clsx(classes.paper)}>
					<Avatar className={clsx(classes.avatar)}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h4" className={clsx(classes.title)}>
						Sign in
					</Typography>
					<Typography component="h4" className={clsx(classes.title)}>
						zxc@qwe.qwe
					</Typography>
					<TextField
						variant="outlined"
						className={clsx(classes.input)}
						value={values.email}
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						autoComplete="off"
						onChange={handleValueChange("email")}
						// autoFocus
					/>
					<FormControl
						className={clsx(classes.margin, classes.textField)}
						variant="outlined"
					>
						<InputLabel htmlFor="password">Password</InputLabel>
						<OutlinedInput
							id="password"
							className={clsx(classes.input)}
							type={values.showPassword ? "text" : "password"}
							value={values.password}
							label="Password"
							onChange={handleValueChange("password")}
							name="password"
							autoComplete="off"
							endAdornment={
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle password visibility"
										onClick={handleClickShowPassword}
										onMouseDown={handleMouseDownPassword}
										edge="end"
									>
										{values.showPassword ? <Visibility /> : <VisibilityOff />}
									</IconButton>
								</InputAdornment>
							}
							labelWidth={70}
						/>
					</FormControl>

					<FormControlLabel
						control={<Checkbox value="remember" color="primary" />}
						label="Remember me"
						className={clsx(classes.rememberMe)}
					/>

					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={clsx(classes.submit)}
						onClick={loginHandler}
						disabled={loading}
					>
						Sign In
					</Button>
					<Button
						className={clsx(classes.submit)}
						type="submit"
						fullWidth
						variant="contained"
						color="secondary"
						onClick={registerHandler}
						disabled={loading}
					>
						Register
					</Button>
				</div>
			) : (
				<div className={clsx(classes.paper)}>
					<Avatar className={clsx(classes.avatar)}>
						{username ? username.substring(0, 1) : ""}
					</Avatar>
					<Typography component="h2" variant="h5" className={clsx(classes.title)}>
						{username ? username.substring(0, 10) : ""}
					</Typography>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={clsx(classes.submit)}
						onClick={logoutHandler}
						disabled={loading}
					>
						Log Out
					</Button>
				</div>
			)}
		</React.Fragment>
	)
}
