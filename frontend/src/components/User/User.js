import Avatar from "@material-ui/core/Avatar"
import Button from "@material-ui/core/Button"
import FormControl from "@material-ui/core/FormControl"
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
import { useAlert } from "hooks/alert.hook"
import { useHttp } from "hooks/http.hook"
import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { userActions } from "redux/actions/index"

const useStyles = makeStyles((theme) => ({
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
		"&:last-child": {
			marginBottom: 0,
		},
	},
}))

const User = () => {
	// const auth = useContext(AuthContext)
	// const isAuth = auth.isAuth
	// const username = auth.userName
	const dispatch = useDispatch()

	const { loading, error, request, clearError } = useHttp()
	const classes = useStyles()
	const message = useAlert()

	const loggingIn = useSelector((state) => state.auth.loggingIn)
	const isAuth = useSelector((state) => state.auth.loggedIn)
	const user = useSelector((state) => state.auth.user)
	const username = user && user.userName

	const [values, setValues] = useState({
		email: "admin@qwe.qwe",
		password: "313233",
	})

	const [showPassword, setShowPassword] = useState(false)
	const [submitted, setSubmitted] = useState(false)

	const handleValueChange = (prop) => (event) => {
		setValues({ ...values, [prop]: event.target.value })
	}

	const handleClickShowPassword = () => {
		setShowPassword(!showPassword)
	}

	const handleMouseDownPassword = (event) => {
		event.preventDefault()
	}

	const registerHandler = async () => {
		try {
			const data = await request("/api/auth/register", "POST", { ...values })

			setSubmitted(true)
			message(data.message)
		} catch (error) {
			console.log(error)
			message(error)
		}
	}

	const loginHandler = async () => {
		if (values) {
			dispatch(userActions.login({ ...values }))
		}
	}

	const logoutHandler = (event) => {
		dispatch(userActions.logout())
	}

	return (
		<div className={clsx(classes.paper)}>
			{!isAuth ? (
				<>
					<Avatar className={clsx(classes.avatar)}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h4" className={clsx(classes.title)}>
						Sign in
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
							type={showPassword ? "text" : "password"}
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
										{showPassword ? <Visibility /> : <VisibilityOff />}
									</IconButton>
								</InputAdornment>
							}
							labelWidth={70}
						/>
					</FormControl>

					{/* <FormControlLabel
						control={<Checkbox value="remember" color="primary" />}
						label="Remember me"
						className={clsx(classes.rememberMe)}
					/> */}

					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={clsx(classes.submit)}
						onClick={loginHandler}
						disabled={loggingIn}
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
				</>
			) : (
				<>
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
						disabled={loggingIn}
					>
						Sign Out
					</Button>
				</>
			)}
		</div>
	)
}

export default User
