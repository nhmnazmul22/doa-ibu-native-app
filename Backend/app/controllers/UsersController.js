import * as UserServices from "../services/UserServices.js";

// Get all User Controller
export const GetAllUsersController = async (req, res) => {
  const result = await UserServices.GetAllUsersService();
  return res
    .status(result.status)
    .json({ message: result.message, data: result.data });
};

// Create User Controller
export const CreateUserController = async (req, res) => {
  const result = await UserServices.CreateUsersService(req);
  return res
    .status(result.status)
    .json({ message: result.message, data: result.data });
};

// Update User Controller
export const UpdateUsersController = async (req, res) => {
  const result = await UserServices.UpdateUsersService(req);
  return res
    .status(result.status)
    .json({ message: result.message, data: result.data });
};

// Login User Controller
export const GetUserController = async (req, res) => {
  const result = await UserServices.GetUserService(req);
  return res
    .status(result.status)
    .json({ message: result.message, data: result.data });
};

// Delete User Controller
export const DeleteUserController = async (req, res) => {
  const result = await UserServices.DeleteUserService(req);
  return res
    .status(result.status)
    .json({ message: result.message, data: result.data });
};
