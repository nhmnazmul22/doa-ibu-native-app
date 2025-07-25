import mongoose from "mongoose";

// Convert String id to ObjectId
export const convertObjectId = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  return new mongoose.Types.ObjectId(id);
};
