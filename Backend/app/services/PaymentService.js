import { core } from "../utility/midtransClient.js";
import UserModel from "../models/UserModel.js";
import { convertObjectId } from "../utility/lib.js";
import DonationsModel from "../models/SubscriptionModel.js";
import SubscriptionModel from "../models/SubscriptionModel.js";
// Create Donation Charge
export const CreateDonationService = async (req) => {
  const { amount, method, userId } = req.body;
  const orderId = `DONATE-${userId}`;

  const payload = {
    transaction_details: { order_id: orderId, gross_amount: amount },
    payment_type: method,
  };

  if (method === "qris") {
    payload.qris = {};
  } else if (method === "gopay") {
    payload.gopay = {
      enable_callback: true,
      callback_url: "doaibu://callback",
    };
  } else {
    return {
      status: 400,
      message: "Please, pay with QRIS or GoPay",
      data: null,
    };
  }

  try {
    const chargeRes = await core.charge(payload);
    const action = chargeRes.actions?.find(
      (a) => a.name.includes("qr-code") || a.name.includes("deeplink-redirect")
    );

    // Save latest pending payment
    await UserModel.findByIdAndUpdate(userId, {
      $set: {
        latestPendingPayment: {
          order_id: orderId,
          amount,
          type: "donation",
          method,
        },
      },
    });

    return {
      status: 201,
      message: "Donation initiated, awaiting payment",
      data: {
        order_id: orderId,
        redirect_url: action?.url || chargeRes.redirect_url,
      },
    };
  } catch (err) {
    return {
      status: 500,
      message: "Error in Create Donation route",
      data: err.message || "Something Went Wrong!",
    };
  }
};

// Create Subscription Charge
export const CreateSubscriptionChargeService = async (req) => {
  const { userId, amount, method } = req.body;
  const orderId = `SUBS-${userId}`;

  const payload = {
    payment_type: method,
    transaction_details: {
      order_id: orderId,
      gross_amount: amount,
    },
  };

  if (method === "qris") {
    payload.qris = {};
  } else if (method === "gopay") {
    payload.gopay = {
      enable_callback: true,
      callback_url: "doaibu://callback",
    };
  } else {
    return {
      status: 400,
      message: "Please, pay with QRIS or GoPay",
      data: null,
    };
  }

  try {
    const chargeRes = await core.charge(payload);
    const action = chargeRes.actions?.find((a) =>
      [
        "generate-qr-code",
        "deeplink-redirect",
        "mobile_web_checkout_url",
      ].includes(a.name)
    );

    // Save latest pending payment
    await UserModel.findByIdAndUpdate(userId, {
      $set: {
        latestPendingPayment: {
          order_id: orderId,
          amount,
          type: "subscription",
          method,
        },
      },
    });

    return {
      status: 201,
      message: "Subscription payment initiated, awaiting payment",
      data: {
        order_id: orderId,
        redirect_url: action?.url || chargeRes.redirect_url || null,
      },
    };
  } catch (err) {
    return {
      status: 500,
      message: "Error in Subscription payment route",
      data: err.message || "Something went wrong!",
    };
  }
};

// Midtrans Webhook Handler
export const MidtransWebhookService = async (req) => {
  const {
    order_id,
    transaction_status,
    payment_type,
    gross_amount,
    settlement_time,
  } = req.body;

  try {
    const isDonation = order_id.startsWith("DONATE");
    const isSubscription = order_id.startsWith("SUBS");
    const userId = convertObjectId(order_id.split("-")[1]);

    if (
      transaction_status === "settlement" ||
      transaction_status === "capture"
    ) {
      if (isDonation) {
        await UserModel.findOneAndUpdate(
          { _id: userId },
          {
            isDonated: true,
          },
          { new: true }
        );

        const donationObj = {
          order_id: order_id,
          amount: Number(gross_amount),
          method: payment_type,
          userId: userId,
        };

        await DonationsModel.create(donationObj);
      }

      if (isSubscription) {
        await UserModel.findOneAndUpdate(
          { _id: userId },
          {
            subscriptionType: "premium",
            subscriptionStatus: "active",
          },
          { new: true }
        );

        const startDate = new Date();
        startDate.setHours(0, 0, 0, 0);

        const endDate = new Date(startDate);
        endDate.setMonth(endDate.getMonth() + 1);
        endDate.setHours(23, 59, 59, 999);

        const subscriptionObj = {
          order_id,
          amount: Number(gross_amount),
          startDate,
          endDate,
          method: payment_type,
          status: "active",
          userId: userId,
        };

        await SubscriptionModel.create(subscriptionObj);
      }
    }

    return {
      status: 200,
      message: `${isDonation ? "Donation" : "Subscription"} Payment successful`,
      data: { received: true },
    };
  } catch (err) {
    return {
      status: 500,
      message: "Failed to verify payment status",
      data: err.message || "Something went wrong!",
    };
  }
};
