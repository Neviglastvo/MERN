const { Schema, model, Types } = require("mongoose")

const schema = new Schema({
	name: { type: String, required: true },
	descr: { type: String, required: true },
	date: { type: Date, default: Date.now },
	ownerID: { type: Types.ObjectId, ref: "User" },
	ownerName: { type: String, ref: "User" },
	components: {
		componentType: [
			{
				ref: "ComponentType",
				type: Types.ObjectId,
				component: [
					{
						ref: "Component",
						type: Types.ObjectId,
					},
				],
			},
		],
	},
	score: { type: Number, default: 0 },
	like: { type: Number, default: 0 },
	dislike: { type: Number, default: 0 },
	grade: { type: Number, default: 0 },
})

module.exports = model("Pc", schema)
