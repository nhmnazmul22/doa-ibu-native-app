import mongoose, { Model, Schema } from "mongoose";
import { IQuote } from "../types/modeTypes";

//Define Schema
const DataScheme: Schema<IQuote> = new Schema<IQuote>(
  {
    description: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Define Model
const QuoteModel: Model<IQuote> =
  mongoose.models.qoutes || mongoose.model<IQuote>("qoutes", DataScheme);
export default QuoteModel;
