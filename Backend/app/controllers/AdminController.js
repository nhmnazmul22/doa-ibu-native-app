import * as AdminServices from "../services/AdminServices.js";

// Get Admin Controller
export const GetAdminController = async (req, res) => {
  const result = await AdminServices.GetAdminService(req);
  return res
    .status(result.status)
    .json({ message: result.message, data: result.data });
};

// Create Admin Controller
export const CreateAdminController = async (req, res) => {
  const result = await AdminServices.CreateAdminService(req);
  return res
    .status(result.status)
    .json({ message: result.message, data: result.data });
};

// Login Admin Controller
export const LoginAdminController = async (req, res) => {
  const result = await AdminServices.LoginAdminService(req, res);
  return res
    .status(result.status)
    .json({ message: result.message, data: result.data });
};

// Update Admin Controller
export const UpdateAdminController = async (req, res) => {
  const result = await AdminServices.UpdateAdminService(req);
  return res
    .status(result.status)
    .json({ message: result.message, data: result.data });
};

// Delete Admin Controller
export const DeleteAdminController = async (req, res) => {
  const result = await AdminServices.DeleteAdminService(req);
  return res
    .status(result.status)
    .json({ message: result.message, data: result.data });
};
