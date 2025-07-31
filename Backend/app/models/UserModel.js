import mongoose, { Schema } from "mongoose";

// Define User Schema
const DataScheme = new Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    gender: { type: String },
    profilePicture: { type: String },
    role: { type: String, enum: ["user"], default: "user" },
    // Subscription Info
    subscriptionType: {
      type: String,
      enum: ["free", "premium"],
      default: "free",
    },
    subscriptionStatus: {
      type: String,
      enum: ["active", "inactive", "expire"],
      default: "inactive",
    },
    subscriptionStartDate: { type: Date },
    subscriptionEndDate: { type: Date },
    isDonated: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Define Model
const UserModel = mongoose.models.users || mongoose.model("users", DataScheme);

export default UserModel;
