import DonationsModel from "../models/DonationModel.js";
import { convertObjectId } from "../utility/lib.js";

// Get all Donation Service
export const GetAllDonationService = async (req) => {
  try {
    const donations = await DonationsModel.aggregate([
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

    if (donations.length === 0) {
      return { status: 404, message: "Donations not found", data: donations };
    }

    return { status: 200, message: "Donations found", data: donations };
  } catch (err) {
    return {
      status: 500,
      message: "Error in get all Donations route",
      data: err.message || "Something Went Wrong!",
    };
  }
};

// Get Single Donations Service
export const GetDonationsService = async (req) => {
  try {
    const donationId = convertObjectId(req.params.donationId);
    const donation = await DonationsModel.aggregate([
      { $match: { _id: donationId } },
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

    if (donation.length === 0) {
      return { status: 404, message: "Donation not found", data: donation };
    }

    return { status: 200, message: "Donation found", data: donation[0] };
  } catch (err) {
    return {
      status: 500,
      message: "Error in get Donation route",
      data: err.message || "Something Went Wrong!",
    };
  }
};
