import * as MotherServices from "../services/MotherServices.js";

// Get all Mother Controller
export const GetAllMotherController = async (req, res) => {
  const result = await MotherServices.GetAllMotherService();
  return res
    .status(result.status)
    .json({ message: result.message, data: result.data });
};

// Create Mother Controller
export const CreateMotherController = async (req, res) => {
  const result = await MotherServices.CreateMotherService(req);
  return res
    .status(result.status)
    .json({ message: result.message, data: result.data });
};

// Get single Mother Controller
export const GetMotherController = async (req, res) => {
  const result = await MotherServices.GetMotherService(req);
  return res
    .status(result.status)
    .json({ message: result.message, data: result.data });
};

// Update Mother Controller
export const UpdateMotherController = async (req, res) => {
  const result = await MotherServices.UpdateMotherService(req);
  return res
    .status(result.status)
    .json({ message: result.message, data: result.data });
};

// Delete Mother Controller
export const DeleteMotherController = async (req, res) => {
  const result = await MotherServices.DeleteMotherService(req);
  return res
    .status(result.status)
    .json({ message: result.message, data: result.data });
};
