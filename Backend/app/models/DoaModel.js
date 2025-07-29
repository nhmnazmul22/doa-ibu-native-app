import mongoose, { Schema } from "mongoose";

// Define Data Schema
const DataScheme = new Schema(
  {
    thumbnail: { type: String },
    audioLink: { type: String, require: true },
    title: { type: String, required: true },
    shortDes: { type: String },
    favoriteUsers: {
      type: [mongoose.Schema.Types.ObjectId],
      required: false,
      default: [],
    },
    duration: { type: String },
    type: { type: String, enum: ["uploaded", "recorded"], default: "uploaded" },
    motherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "mothers",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Define Model (prevent overwrite in dev/watch)
const DoaModel = mongoose.models.doas || mongoose.model("doas", DataScheme);
export default DoaModel;
