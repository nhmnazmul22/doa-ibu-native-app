import mongoose from "mongoose";
import { Response } from "express";

// Convert String id to ObjectId
export const convertObjectId = (id: string) => {
  return new mongoose.Types.ObjectId(id);
};

