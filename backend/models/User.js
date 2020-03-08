const { Schema, model, Types } = require("mongoose")

const schema = new Schema({
	email: { type: String, required: true, unique: true },
	name: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	pcs: [{ type: Types.ObjectId, ref: "Pc" }],
})

module.exports = model("User", schema)
