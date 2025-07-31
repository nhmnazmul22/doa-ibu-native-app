import PricingModel from "../models/PricingModel.js";
import { convertObjectId } from "../utility/lib.js";

// Get Pricing Service
export const GetPricingService = async () => {
  try {
    const pricing = await PricingModel.find({});

    if (pricing.length === 0) {
      return { status: 404, message: "Pricing not found", data: pricing };
    }

    return { status: 200, message: "Pricing found", data: pricing };
  } catch (err) {
    return {
      status: 500,
      message: "Error in get pricing route",
      data: err.message || "Something Went Wrong!",
    };
  }
};

// Create Pricing Service
export const CreatePricingService = async (req) => {
  try {
    const { title, type, price, features } = req.body;

    if (!title || !type || !price || !features) {
      return { status: 400, message: "Required Filed missing", data: null };
    }

    const NewPricing = await PricingModel.create(req.body);

    if (!NewPricing) {
      return { status: 500, message: "Server Issue", data: null };
    }

    return {
      status: 201,
      message: "Pricing create successful",
      data: NewPricing,
    };
  } catch (err) {
    return {
      status: 500,
      message: "Error in create pricing route",
      data: err.message || "Something Went Wrong!",
    };
  }
};

// Update Pricing Service
export const UpdatePricingService = async (req) => {
  try {
    const pricingId = convertObjectId(req.params.pricingId);

    const pricing = await PricingModel.findById(pricingId);

    if (!pricing) {
      return {
        status: 404,
        message: "Pricing not found",
        data: null,
      };
    }

    const updatePricing = await PricingModel.findByIdAndUpdate(
      pricingId,
      req.body,
      {
        new: true,
      }
    );

    if (!updatePricing) {
      return { status: 500, message: "Server Issue", data: updatePricing };
    }

    return {
      status: 201,
      message: "Pricing updated successful",
      data: updatePricing,
    };
  } catch (err) {
    return {
      status: 500,
      message: "Error in update pricing route",
      data: err.message || "Something Went Wrong!",
    };
  }
};

// Delete Pricing Service
export const DeletePricingService = async (req) => {
  try {
    const pricingId = convertObjectId(req.params.pricingId);
    const pricing = await PricingModel.findById(pricingId);

    if (!pricing) {
      return {
        status: 404,
        message: "Pricing not found",
        data: null,
      };
    }

    const deletePrice = await PricingModel.findOneAndDelete({ _id: pricingId });

    if (!deletePrice) {
      return { status: 404, message: "Doa delete failed", data: deletePrice };
    }

    return {
      status: 200,
      message: "Pricing deleted successful",
      data: deletePrice,
    };
  } catch (err) {
    return {
      status: 500,
      message: "Error in delete pricing route",
      data: err.message || "Something Went Wrong!",
    };
  }
};
