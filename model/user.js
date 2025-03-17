import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  verified: { type: Boolean, default: false }, 
  bookmarkedEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: "eventcards" }]
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;
