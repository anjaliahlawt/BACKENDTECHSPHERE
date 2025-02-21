const { Schema, model } = require("mongoose");

const registrationSchema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: Number, required: true },
  teamName: { type: String, required: true },
  teamMember1: { type: String, required: true },
  teamMember2: { type: String },
  teamMember3: { type: String },
}, { timestamps: true });
const register= model("Registration", registrationSchema)
module.exports={register};
