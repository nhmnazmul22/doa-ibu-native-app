import mongoose, { Schema } from "mongoose";

const PricingSchema = new Schema(
  {
    title: { type: String, required: true },
    type: { type: String, required: true },
    shortDes: { type: String },
    price: { type: String, required: true },
    features: {
      type: [
        {
          text: { type: String },
          available: { type: Boolean },
        },
      ],
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

// Define Data Schema
const DataScheme = new Schema(
  {
    pricing: {
      type: PricingSchema,
      required: true,
    },
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
