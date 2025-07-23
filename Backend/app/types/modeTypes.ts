/*
================ This file contains TypeScript interfaces for MongoDB models used in the application. ================ 
*/
import { Document, ObjectId, Types } from "mongoose";

// User Models Types
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  phone?: string;
  gender?: string;
  subscriptionType?: "free" | "premium" | "donate";
  subscriptionStatus?: "active" | "inactive";
  subscriptionStartDate?: Date;
  subscriptionEndDate?: Date;
  subscriptionRenewalDate?: Date;
  totalDonations?: number;
  totalSpent?: number;
  isActive?: boolean;
}

export interface IDoa extends Document {
  thumbnail: string;
  title: string;
  shortDes: string;
  favorite: boolean;
  duration: string;
  type: "uploaded" | "recorded";
  motherId: ObjectId;
}

export interface IQuote extends Document {
  description: string;
}

export interface IMothers extends Document {
  fullName: string;
  email: string;
  followers: string;
  following: string;
  profilePicture: string;
  bio: string;
}

export interface IDonation extends Document {
  totalAmount: number;
  donnerId: Types.ObjectId;
}
