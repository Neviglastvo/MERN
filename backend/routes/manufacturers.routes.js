const { Router } = require("express")
const User = require("../models/User")
const Manufacturer = require("../models/Manufacturer")
const Component = require("../models/Component")
const ComponentType = require("../models/ComponentType")
const auth = require("../middleware/auth.middleware")
const router = Router()
const colors = require("colors")

const path = require("path")
const fileName = path.basename(__filename)

router.post("/generate", auth, async (req, res) => {
	try {
		const { name, description, image } = req.body

		const existing = await Manufacturer.findOne({ name: name })
		if (existing) {
			console.log("existing".red, existing)
			return res.status(500).json({ message: `already exist` })
		}

		const manufacturer = new Manufacturer({
			name,
			description,
			image,
		})

		await manufacturer.save()

		res.status(201).json({ manufacturer })
	} catch (error) {
		res.status(500).json({
			message: `oof, ${fileName} (generate) error: <br> ${error}`,
		})
	}
})

router.post("/update", auth, async (req, res) => {
	try {
		const data = req.params
		const { _id, name, description, image } = req.body
		console.log("name".cyan, name)
		const id = data.id
		console.log("data".cyan, data)

		const update = await Manufacturer.updateOne(
			{ _id: _id },
			{
				name: name,
				description: description,
				image: image,
			},
		)
		console.log("data".green, update)

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
		const owner = await Manufacturer.findOne({ _id: id })
		const ownerID = owner.ownerID

		console.log("pc id".cyan, id)

		const removeManufacturer = await Manufacturer.findOneAndDelete({ _id: id })
		const ownerRemoveManufacturer = await User.updateOne(
			{ _id: ownerID },
			{ $pull: { pcs: id } },
		)

		res.status(201).json({ removeManufacturer, ownerRemoveManufacturer })
	} catch (error) {
		res.status(500).json({ message: `${fileName} (/delete/:id): <br> ${error}` })
	}
})

router.get("/", async (req, res) => {
	try {
		const pcs = await Manufacturer.find()
		res.json(pcs)
	} catch (error) {
		console.log(error)
		res.status(500).json({ message: `oof, ${fileName} (/) error: <br> ${error}` })
	}
})

router.get("/:name", async (req, res) => {
	try {
		const pcs = await Manufacturer.findOne(req.params)
		res.json(pcs)
	} catch (error) {
		console.log(error)
		res
			.status(500)
			.json({ message: `oof, ${fileName} (/:name) error: <br> ${error}` })
	}
})

module.exports = router
