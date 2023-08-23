
const { Schema, model } = require("mongoose");

const Product_schema = new Schema({
    category: { type: String, required: true },
    name: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    unit: { type: String },
    discount_price: { type: String },
    description: { type: String },
    favourite: { type: Boolean },
    img: { type: String, default: undefined, sparse: true },
    available: { type: Boolean },
    archived: { type: Boolean }
},
{
    versionKey: false,
    timestamps: true
});

module.exports = model("Product", Product_schema);