import mongoose, { Schema } from "mongoose";

// Define Data Schema
const DataScheme = new Schema(
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
  {
    timestamps: true,
    versionKey: false,
  }
);

// Define Model (prevent overwrite in dev/watch)
const PricingModel =
  mongoose.models.pricing || mongoose.model("pricing", DataScheme);
export default PricingModel;
