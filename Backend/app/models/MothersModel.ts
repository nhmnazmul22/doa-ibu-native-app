import mongoose, { Model, Schema } from "mongoose";
import { IMothers } from "../types/modeTypes";

// Define Schema
const DataSchema: Schema<IMothers> = new Schema<IMothers>(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, default: "" },
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
const MotherModel: Model<IMothers> =
  mongoose.models.mothers || mongoose.model<IMothers>("mothers", DataSchema);
export default MotherModel;
