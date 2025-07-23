import mongoose, { Model, Schema } from "mongoose";

// Define Schema
const DataSchema = new Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, default: "" },
    password: { type: String, required: true },
    phone: { type: String, required: false },
    gender: { type: String, required: false },
    followers: { type: String, required: false, default: "0" },
    following: { type: String, required: false, default: "0" },
    profilePicture: {
      type: String,
      required: false,
    },
    bio: { type: String, required: false, default: "" },
  },
  { versionKey: false, timestamps: true }
);

// Define Model
const MotherModel =
  mongoose.models.mothers || mongoose.model("mothers", DataSchema);
export default MotherModel;
