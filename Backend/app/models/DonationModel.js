import mongoose, { Schema } from "mongoose";

// Define Data Schema
const DataScheme = new Schema(
  {
    order_id: String,
    amount: Number,
    method: String,
    userId: { type: mongoose.Schema.Types.ObjectId, require: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Define Model (prevent overwrite in dev/watch)
const DonationsModel =
  mongoose.models.donations || mongoose.model("donations", DataScheme);
export default DonationsModel;
