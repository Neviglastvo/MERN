const { Schema, model, Types } = require("mongoose")

const schema = new Schema({
	// name: { type: String, required: true },
	// descr: { type: String },
	// date: { type: Date, default: Date.now },
	// score: { type: Number, default: 0 },
	// type: { type: String, ref: "ComponentType", required: true },
	// type: { type: Types.ObjectId, ref: "ComponentType" },
	// manufacturer: { type: String, ref: "Manufacturer", required: true },
	// manufacturer: { type: Types.ObjectId, ref: "Manufacturer", required: true },
	socket: { type: String },
	chipset: { type: String },
	formFactor: { type: String },
	slots: { type: Object },
	ramType: { type: Number },
	ramSlots: { type: Number },
	ramCapacity: { type: String },
	m2Slots: { type: Number },
	sataSlots: { type: Number },
	pciExpress16: { type: Number },
	pciExpress4: { type: Number },
})

module.exports = model("motherboard", schema)
