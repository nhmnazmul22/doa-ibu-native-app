import * as MotherServices from "../services/MotherServices.js";

// Get all Mother Controller
export const GetAllMotherController = async (req, res) => {
  const result = await MotherServices.GetAllMotherService();
  return res
    .status(result.status)
    .json({ message: result.message, data: result.data });
};

// Register Mother Controller
export const RegisterMotherController = async (req, res) => {
  const result = await MotherServices.RegisterMotherService(req);
  return res
    .status(result.status)
    .json({ message: result.message, data: result.data });
};

// Login Mother Controller
export const LoginMotherController = async (req, res) => {
  const result = await MotherServices.LoginMotherService(req, res);
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
