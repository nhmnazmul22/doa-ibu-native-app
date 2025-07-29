import * as SubscriptionService from "../services/SubscriptionService.js";

// Get all Subscription Controller
export const GetAllSubscriptionController = async (req, res) => {
  const result = await SubscriptionService.GetAllSubscriptionService(req);
  return res
    .status(result.status)
    .json({ message: result.message, data: result.data });
};

// Get Subscription Controller
export const GetSubscriptionController = async (req, res) => {
  const result = await SubscriptionService.GetSubscriptionService(req);
  return res
    .status(result.status)
    .json({ message: result.message, data: result.data });
};
