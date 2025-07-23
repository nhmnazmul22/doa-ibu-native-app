import mongoose from "mongoose";

// Convert String id to ObjectId
export const convertObjectId = (id) => {
  return new mongoose.Types.ObjectId(id);
};
