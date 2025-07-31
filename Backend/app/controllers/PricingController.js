import * as PricingService from "../services/PricingService.js";

// Get all Pricing Controller
export const GetPricingController = async (req, res) => {
  const result = await PricingService.GetPricingService();
  return res
    .status(result.status)
    .json({ message: result.message, data: result.data });
};

// Create Pricing Controller
export const CreatePricingController = async (req, res) => {
  const result = await PricingService.CreatePricingService(req);
  return res
    .status(result.status)
    .json({ message: result.message, data: result.data });
};

// Update Pricing Controller
export const UpdatePricingController = async (req, res) => {
  const result = await PricingService.UpdatePricingService(req);
  return res
    .status(result.status)
    .json({ message: result.message, data: result.data });
};

// Delete Pricing Controller
export const DeletePricingController = async (req, res) => {
  const result = await PricingService.DeletePricingService(req);
  return res
    .status(result.status)
    .json({ message: result.message, data: result.data });
};
