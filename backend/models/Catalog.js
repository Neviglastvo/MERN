const { Schema, model, Types } = require("mongoose")

const schema = new Schema({
	type: { component: [{ type: Types.ObjectId, ref: "Component" }] },
})

module.exports = model("Catalog", schema)
