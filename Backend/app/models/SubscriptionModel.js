import mongoose, { Schema } from "mongoose";

// Define Data Schema
const DataScheme = new Schema(
  {
    order_id: String,
    amount: Number,
    startDate: Date,
    endDate: Date,
    method: String,
    status: {
      type: String,
      enum: ["active", "expired"],
      default: "active",
    },
    userId: { type: mongoose.Schema.Types.ObjectId, require: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Define Model (prevent overwrite in dev/watch)
const SubscriptionModel =
  mongoose.models.subscriptions || mongoose.model("subscriptions", DataScheme);
export default SubscriptionModel;
