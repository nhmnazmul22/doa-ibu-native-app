import mongoose, { Model, Schema } from "mongoose";
import { IUser } from "../types/modeTypes";

// Define Data Schema
const DataScheme: Schema<IUser> = new Schema<IUser>(
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
const UserModel: Model<IUser> =
  mongoose.models.users || mongoose.model<IUser>("users", DataScheme);

export default UserModel;
