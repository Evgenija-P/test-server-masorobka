const { Schema, model } = require("mongoose");

const Gallery_schema = new Schema({
    img_url: { type: String, required: true },
    product_id: { type: Schema.Types.ObjectId, ref: "Product", default: null },
    used: { type: Boolean, required: true },
},
{
	versionKey: false,
	timestamps: true
});

module.exports = model("Gallery", Gallery_schema);