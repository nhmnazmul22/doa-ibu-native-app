import SubscriptionModel from "../models/SubscriptionModel.js";
import { convertObjectId } from "../utility/lib.js";

// Get all Subscription Service
export const GetAllSubscriptionService = async (req) => {
  try {
    const subscription = await SubscriptionModel.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      { $unwind: "$userDetails" },
      { $project: { userId: 0, "userDetails.password": 0 } },
      { $sort: { createdAt: -1 } },
    ]);

    if (subscription.length === 0) {
      return {
        status: 404,
        message: "Subscriptions not found",
        data: subscription,
      };
    }

    return { status: 200, message: "Subscriptions found", data: subscription };
  } catch (err) {
    return {
      status: 500,
      message: "Error in get all Subscription route",
      data: err.message || "Something Went Wrong!",
    };
  }
};

// Get Single Donations Service
export const GetSubscriptionService = async (req) => {
  try {
    const subscriptionId = convertObjectId(req.params.subscriptionId);
    const subscription = await SubscriptionModel.aggregate([
      { $match: { _id: subscriptionId } },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      { $unwind: "$userDetails" },
      { $project: { userId: 0, "userDetails.password": 0 } },
    ]);

    if (subscription.length === 0) {
      return { status: 404, message: "Donation not found", data: subscription };
    }

    return { status: 200, message: "Donation found", data: subscription[0] };
  } catch (err) {
    return {
      status: 500,
      message: "Error in get Subscription route",
      data: err.message || "Something Went Wrong!",
    };
  }
};
