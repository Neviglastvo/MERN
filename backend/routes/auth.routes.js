const { Router } = require("express")
const bcrypt = require("bcryptjs")
const config = require("config")
const jwt = require("jsonwebtoken")
const { check, validationResult } = require("express-validator")
const User = require("../models/User")
const router = Router()
const colors = require("colors")

router.post(
	"/register",
	[
		check("email", "Invalid Email").isEmail(),
		check("password", "Invalid Password. Pass must be >= 6 symbols").isLength({
			min: 6,
		}),
	],
	async (req, res) => {
		try {
			console.log(req.body)

			const errors = validationResult(req)

			if (!errors.isEmpty()) {
				return res.status(400).json({
					errors: errors.array(),
					message: "Invalid registration data",
				})
			}

			const { email, password } = req.body
			const candidate = await User.findOne({ email })

			if (candidate) {
				res.status(400).json({ message: "User already exist" })
			}

			const name = email.substring(0, email.indexOf("@"))
			console.log("existing".green, name)

			const hashedPassword = await bcrypt.hash(password, 12)

			const user = new User({ email, name, password: hashedPassword })
			console.log("req".red, user)
			await user.save()

			res.status(201).json({ message: "User created" })
		} catch (error) {
			console.log(error)
			res
				.status(500)
				.json({ message: `oof, auth.routes.js (register) error: <br> ${error}` })
		}
	},
)

router.post(
	"/login",
	[
		check("email", "Invalid Email has entered").normalizeEmail().isEmail(),
		check("password", "Invalid Password. Try better").exists(),
	],
	async (req, res) => {
		try {
			const errors = validationResult(req)

			if (!errors.isEmpty()) {
				return res.status(400).json({
					errors: errors.array(),
					message: "Invalid registration data",
				})
			}

			const { email, password } = req.body

			const user = await User.findOne({ email })

			if (!user) {
				res.status(400).json({ message: "User does not exist" })
			}

			const isPassMatch = await bcrypt.compare(password, user.password)

			if (!isPassMatch) {
				res.status(400).json({ message: "Wrong password, try better" })
			}

			const token = jwt.sign(
				{ userID: user.id, userName: user.name },
				config.get("jwtSecret"),
				{
					expiresIn: "12h",
				},
			)

			// const userName = await User.findOne({ email, userName: req.user.name })
			const userName = user.name

			res.json({ token, userId: user.id, userName })
		} catch (error) {
			res
				.status(500)
				.json({ message: `oof, auth.routes.js (login) error: <br> ${error}` })
		}
	},
)

module.exports = router
