const express = require("express")
const config = require("config")
const mongoose = require("mongoose")
const path = require("path")

const app = express()

const PORT = 9001
// const PORT =
// 	process.env.NODE_ENV === "production"
// 		? process.env.PORT
// 		: config.get("port") || 9001

app.use(express.json({ extended: true }))

app.use("/api/auth", require("./routes/auth.routes"))
app.use("/api/pc", require("./routes/pc.routes"))
app.use("/api/components", require("./routes/components.routes"))
app.use("/api/manufacturers", require("./routes/manufacturers.routes"))

if (process.env.NODE_ENV === "production") {
	app.use("/", express.static(path.join(__dirname, "frontend", "build")))

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
	})
}

async function start() {
	try {
		await mongoose.connect(process.env.MONGODB_URI || config.get("db"), {
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
