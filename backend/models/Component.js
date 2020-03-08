const { Schema, model, Types } = require("mongoose")

const schema = new Schema({
	name: { type: String, required: true },
	descr: { type: String },
	date: { type: Date, default: Date.now },
	score: { type: Number, default: 0 },
	type: { type: String, ref: "ComponentType" },
	// type: { type: Types.ObjectId, ref: "ComponentType" },
	manufacturer: { type: String, ref: "Manufacturer" },
	// manufacturer: { type: Types.ObjectId, ref: "Manufacturer" },
})

module.exports = model("Component", schema)
