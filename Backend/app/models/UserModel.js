import mongoose, { Model, Schema } from "mongoose";

// Define Data Schema
const DataScheme = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: false },
    gender: { type: String, required: false },
    subscriptionType: {
      type: String,
      enum: ["free", "premium", "donate"],
      default: "free",
    },
    subscriptionStatus: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    isDonated: { type: Boolean, default: false },
    subscriptionStartDate: { type: Date, required: false },
    subscriptionEndDate: { type: Date, required: false },
    subscriptionRenewalDate: { type: Date, required: false },
    totalDonations: { type: Number, default: 0, required: false },
    totalSpent: { type: Number, default: 0, required: false },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Define Model (prevent overwrite in dev/watch)
const UserModel = mongoose.models.users || mongoose.model("users", DataScheme);

export default UserModel;
