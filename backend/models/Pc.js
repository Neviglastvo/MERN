const { Schema, model, Types } = require("mongoose")

const schema = new Schema({
	name: { type: String, required: true },
	descr: { type: String, required: true },
	date: { type: Date, default: Date.now },
	ownerID: { type: Types.ObjectId, ref: "User" },
	ownerName: { type: String, ref: "User" },
	score: { type: Number, default: 0 },
	like: { type: Number, default: 0 },
	dislike: { type: Number, default: 0 },
	grade: { type: Number, default: 0 },
	components: {
		ref: "Component",
		type: Object,
	},
})

module.exports = model("Pc", schema)
