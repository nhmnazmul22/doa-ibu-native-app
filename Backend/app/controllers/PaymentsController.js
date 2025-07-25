import * as PaymentService from "../services/PaymentService.js";

export const CreateDonationController = async (req, res) => {
  const result = await PaymentService.CreateDonationService(req);
  return res
    .status(result.status)
    .json({ message: result.message, data: result.data });
};

// For subscriptions
export const CreateSubscriptionChargeController = async (req, res) => {
  const result = await PaymentService.CreateSubscriptionChargeService(req);
  return res
    .status(result.status)
    .json({ message: result.message, data: result.data });
};


// For Payment verification
export const MidtransWebhookController = async (req, res) => {
  const result = await PaymentService.MidtransWebhookService(req);
  return res
    .status(result.status)
    .json({ message: result.message, data: result.data });
};
