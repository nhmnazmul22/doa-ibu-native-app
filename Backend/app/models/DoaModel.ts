import mongoose, { Model, Schema } from "mongoose";
import { IDoa } from "../types/modeTypes";

// Define Data Schema
const DataScheme: Schema<IDoa> = new Schema(
  {
    thumbnail: { type: String, required: true },
    title: { type: String, required: true },
    shortDes: { type: String, required: true },
    favorite: { type: Boolean, required: true, default: false },
    duration: { type: String },
    type: { type: String, enum: ["uploaded", "recorded"] },
    motherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "mothers",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Define Model (prevent overwrite in dev/watch)
const DoaModel: Model<IDoa> =
  mongoose.models.doas || mongoose.model<IDoa>("doas", DataScheme);
export default DoaModel;
