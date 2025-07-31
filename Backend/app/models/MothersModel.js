import mongoose, { Model, Schema } from "mongoose";

// Define Schema
const DataSchema = new Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, default: "" },
    phone: { type: String, required: false },
    gender: { type: String, required: false, default: "female" },
    followers: {
      type: [mongoose.Schema.Types.ObjectId],
      required: false,
      default: [],
    },
    profilePicture: { type: String, required: false },
    bio: { type: String, required: false, default: "" },
    role: { type: String, enum: ["mother"], default: "mother" },
  },
  { versionKey: false, timestamps: true }
);

// Define Model
const MotherModel =
  mongoose.models.mothers || mongoose.model("mothers", DataSchema);
export default MotherModel;
