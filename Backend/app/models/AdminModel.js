import mongoose, { Schema } from "mongoose";

// Define Data Schema
const DataScheme = new Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, require: true },
    phoneNumber: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Define Model (prevent overwrite in dev/watch)
const AdminModel =
  mongoose.models.admins || mongoose.model("admins", DataScheme);
export default AdminModel;
