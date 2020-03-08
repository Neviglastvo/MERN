const express = require("express")
const config = require("config")
const mongoose = require("mongoose")

const app = express()

app.use(express.json({ extended: true }))
app.use("/api/auth", require("./routes/auth.routes"))
app.use("/api/pc", require("./routes/pc.routes"))
app.use("/api/components", require("./routes/components.routes"))
app.use("/api/manufacturers", require("./routes/manufacturers.routes"))

const PORT = config.get("port") || 3000

async function start() {
	try {
		await mongoose.connect(config.get("db"), {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		})
		app.listen(PORT, () => console.log(`Started on ${PORT}`))
	} catch (error) {
		console.log("App start error", error)
		process.exit(1)
	}
}

start()
