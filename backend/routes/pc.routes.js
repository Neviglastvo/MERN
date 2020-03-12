const { Router } = require("express")
const User = require("../models/User")
const Pc = require("../models/Pc")
const auth = require("../middleware/auth.middleware")
const router = Router()
const colors = require("colors")

router.post("/generate", auth, async (req, res) => {
	try {
		console.log("pc req.body".cyan, req.body)
		const { name, descr, date, grade, motherboard, cpu, ram, gpu, psu } = req.body

		console.log("pc cpu".cyan, cpu)

		const existing = await Pc.findOne({ name })
		if (existing) {
			console.log("existing".red, existing)
			return res.status(500).json({ message: `already exist` })
		}

		const ownerID = req.user.userID

		const owner = await User.findOne({ _id: ownerID })
		const ownerName = owner.name

		const pc = new Pc({
			name,
			descr,
			like: 0,
			dislike: 0,
			grade,
			date,
			ownerID,
			ownerName,
			components: { motherboard, cpu, ram, gpu, psu },
		})

		console.log("pc".cyan, pc)

		const ownerInsertPc = await User.updateOne(
			{ _id: ownerID },
			{ $push: { pcs: [pc._id] } },
		)

		await pc.save()

		res.status(201).json({ pc, ownerInsertPc })
	} catch (error) {
		res
			.status(500)
			.json({ message: `oof, pc.routes.js (generate) error: <br> ${error}` })
	}
})

router.get("/delete/:id", auth, async (req, res) => {
	try {
		const id = req.params.id
		const owner = await Pc.findOne({ _id: id })
		const ownerID = owner.ownerID

		console.log("pc id".cyan, id)

		const removePc = await Pc.findOneAndDelete({ _id: id })
		const ownerRemovePc = await User.updateOne(
			{ _id: ownerID },
			{ $pull: { pcs: id } },
		)

		res.status(201).json({ removePc, ownerRemovePc })
	} catch (error) {
		res.status(500).json({ message: `pc.routes.js (/delete/:id): <br> ${error}` })
	}
})

router.get("/user", auth, async (req, res) => {
	try {
		const pcs = await Pc.find({ ownerID: req.user.userID })
		res.json(pcs)
	} catch (error) {
		res
			.status(500)
			.json({ message: `oof, pc.routes.js (/) error: <br> ${error}` })
	}
})

router.get("/", async (req, res) => {
	try {
		const pcs = await Pc.find()
		res.json(pcs)
	} catch (error) {
		console.log(error)
		res
			.status(500)
			.json({ message: `oof, pc.routes.js (/) error: <br> ${error}` })
	}
})

router.get("/:name", async (req, res) => {
	try {
		const pcs = await Pc.findOne(req.params)
		res.json(pcs)
	} catch (error) {
		console.log(error)
		res
			.status(500)
			.json({ message: `oof, pc.routes.js (/:name) error: <br> ${error}` })
	}
})

module.exports = router
