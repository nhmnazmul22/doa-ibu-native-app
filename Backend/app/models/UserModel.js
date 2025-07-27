import mongoose, { Schema } from "mongoose";

// Define User Schema
const DataScheme = new Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String },
    gender: { type: String },
    profilePicture: { type: String },
    role: { type: String, enum: ["user"], default: "user" },
    qrUrl: {type: String },
    // Subscription Info
    subscriptionType: {
      type: String,
      enum: ["free", "premium", "donate"],
      default: "free",
    },
    subscriptionStatus: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },
    subscriptionStartDate: { type: Date },
    subscriptionEndDate: { type: Date },
    subscriptionRenewalDate: { type: Date },

    // Donation Summary
    isDonated: { type: Boolean, default: false },
    lastDonationDate: { type: Date },
    totalDonations: { type: Number, default: 0 },
    totalSpent: { type: Number, default: 0 },

    // Detailed Records
    donations: [
      {
        order_id: String,
        amount: Number,
        date: Date,
        method: String,
        date: { type: Date, default: Date.now },
      },
    ],
    pendingPayments: [
      {
        order_id: String,
        type: { type: String, enum: ["donation", "subscription"] },
        amount: Number,
        method: String,
        date: { type: Date, default: Date.now },
      },
    ],
    subscriptions: [
      {
        order_id: String,
        amount: Number,
        startDate: Date,
        endDate: Date,
        method: String,
        status: {
          type: String,
          enum: ["active", "expired", "cancelled"],
          default: "active",
        },
        date: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Define Model (prevent overwrite in dev/watch)
const UserModel = mongoose.models.users || mongoose.model("users", DataScheme);

export default UserModel;
