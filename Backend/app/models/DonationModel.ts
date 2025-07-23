import mongoose, { Model, ObjectId, Schema } from "mongoose";
import { IDonation } from "../types/modeTypes";

// Define Data schema
const DataSchema: Schema<IDonation> = new Schema({
  totalAmount: { type: Number, default: 0, require: true },
  donnerId: { type: Schema.Types.ObjectId, required: true, ref: "users" },
});

// Define Model
const DonationModel: Model<IDonation> =
  mongoose.models.donations ||
  mongoose.model<IDonation>("donations", DataSchema);

export default DonationModel;
