const { Router } = require("express")
const User = require("../models/User")
const Pc = require("../models/Pc")
const Component = require("../models/Component")
const ComponentType = require("../models/ComponentType")
const Manufacturer = require("../models/Manufacturer")
const auth = require("../middleware/auth.middleware")
const router = Router()
const colors = require("colors")

router.post("/generate", auth, async (req, res) => {
	try {
		const { name, descr, date, type, manufacturer, ...rest } = req.body

		console.log("{...rest} :>> ", { ...rest })

		const existing = await Component.findOne({ name: name })

		if (existing) {
			// console.log("existing".red, existing)
			return res.status(500).json({ message: `already exist` })
		}

		const component = new Component({
			name,
			descr,
			date,
			score,
			type,
			manufacturer,
			...rest,
		})

		console.log("component", component)

		await component.save()

		res.status(201).json({ component })
	} catch (error) {
		res.status(500).json({
			message: `oof, component.routes.js (generate) error: <br> ${error}`,
		})
	}
})

router.post("/update", auth, async (req, res) => {
	try {
		const data = req.params
		const { score, _id, name, descr, date, type, manufacturer } = req.body
		// console.log("name".cyan, name)
		const id = data.id
		// console.log("data".cyan, data)

		const update = await Component.updateOne(
			{ _id: _id },
			{
				name: name,
				descr: descr,
				date,
				score,
				type: type,
				manufacturer: manufacturer,
			},
		)
		// console.log("data".green, update)

		res.status(201).json({ update })
	} catch (error) {
		res
			.status(500)
			.json({ message: `components.routes.js (/update): <br> ${error}` })
	}
})

router.get("/delete/:id", auth, async (req, res) => {
	try {
		const id = req.params.id

		const remove = await Component.findOneAndDelete({ _id: id })

		res.status(201).json({ remove })
	} catch (error) {
		res
			.status(500)
			.json({ message: `components.routes.js (/delete/:id): <br> ${error}` })
	}
})

router.get("/", async (req, res) => {
	try {
		const items = await Component.find()
		res.json(items)
	} catch (error) {
		// console.log(error)
		res
			.status(500)
			.json({ message: `oof, components.routes.js (/) error: <br> ${error}` })
	}
})

router.get("/type/:type", async (req, res) => {
	try {
		// console.log(req.params)
		const componentType = req.params.type
		const items = await Component.find({ type: componentType })
		// console.log(items)
		res.status(201).json({ items, type: componentType })
	} catch (error) {
		// console.log(error)
		res.status(500).json({
			message: `oof, components.routes.js (/type/:type) error: <br> ${error}`,
		})
	}
})

module.exports = router
