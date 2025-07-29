import * as DonationService from "../services/DonationService.js";

// Get all Donation Controller
export const GetAllDonationController = async (req, res) => {
  const result = await DonationService.GetAllDonationService(req);
  return res
    .status(result.status)
    .json({ message: result.message, data: result.data });
};

// Get Donation Controller
export const GetDonationController = async (req, res) => {
  const result = await DonationService.GetDonationsService(req);
  return res
    .status(result.status)
    .json({ message: result.message, data: result.data });
};
