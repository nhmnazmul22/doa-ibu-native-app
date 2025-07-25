import { core } from "../utility/midtransClient.js";
import UserModel from "../models/UserModel.js";
// For Donation
export const CreateDonationService = async (req) => {
  const { amount, method, userId } = req.body;
  const orderId = `DONATE-${Date.now()}`;

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

    // Store the payment request as pending (await webhook settlement)
    await UserModel.findByIdAndUpdate(userId, {
      $push: {
        pendingPayments: {
          order_id: orderId,
          amount: amount,
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

// For subscriptions
export const CreateSubscriptionChargeService = async (req) => {
  const { userId, amount, method } = req.body;
  const orderId = `SUBS-${Date.now()}`;

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

    // Find the correct action URL (depends on method)
    const action = chargeRes.actions?.find((a) =>
      [
        "generate-qr-code",
        "deeplink-redirect",
        "mobile_web_checkout_url",
      ].includes(a.name)
    );

    // Store the payment request as pending (await webhook settlement)
    await UserModel.findByIdAndUpdate(userId, {
      $push: {
        pendingPayments: {
          order_id: orderId,
          amount: amount,
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

export const MidtransWebhookService = async (req) => {
  console.log("Webhook", req.body);
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

    if (
      transaction_status === "settlement" ||
      transaction_status === "capture"
    ) {
      const updateData = {
        $inc: { totalSpent: Number(gross_amount) },
        $set: {},
        $push: {},
        $pull: {},
      };

      if (isDonation) {
        updateData.$set.isDonated = true;
        updateData.$set.lastDonationDate = new Date(settlement_time);
        updateData.$push.donations = {
          order_id,
          amount: Number(gross_amount),
          date: new Date(settlement_time),
          method: payment_type,
        };
        updateData.$pull.pendingPayments = { order_id };
      }

      if (isSubscription) {
        const startDate = new Date();
        startDate.setHours(0, 0, 0, 0);

        const endDate = new Date(startDate);
        endDate.setMonth(endDate.getMonth() + 1);
        endDate.setHours(23, 59, 59, 999);

        Object.assign(updateData.$set, {
          subscriptionType: "premium",
          subscriptionStatus: "active",
          subscriptionStartDate: startDate,
          subscriptionEndDate: endDate,
          subscriptionRenewalDate: endDate,
        });

        updateData.$push.subscriptions = {
          order_id,
          amount: Number(gross_amount),
          startDate,
          endDate,
          method: payment_type,
          status: "active",
        };
        updateData.$pull.pendingPayments = { order_id };
      }

      const user = await UserModel.findOneAndUpdate(
        { "pendingPayments.order_id": order_id },
        updateData,
        { new: true }
      );

      if (!user && isSubscription) {
        await UserModel.findOneAndUpdate(
          { "subscriptions.order_id": order_id },
          updateData,
          { new: true }
        );
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
