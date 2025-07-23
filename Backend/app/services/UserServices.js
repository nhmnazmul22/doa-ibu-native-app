import mongoose from "mongoose";
import UserModel from "../models/UserModel";
import { Request } from "express";
import { convertObjectId } from "../utility/lib";

// Get all User Service
export const GetAllUsersService = async () => {
  try {
    const users = await UserModel.find({});

    if (users.length === 0) {
      return { status: 404, message: "Users not found", data: users };
    }

    return { status: 200, message: "Users found", data: users };
  } catch (err) {
    return {
      status: 500,
      message: "Error in get all users route",
      data: err.message || "Something Went Wrong!",
    };
  }
};

// Create User Service
export const CreateUsersService = async (req) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return { status: 400, message: "Required Filed missing", data: null };
    }

    const user = await UserModel.create(req.body);

    if (!user) {
      return { status: 500, message: "Server Issue", data: null };
    }

    // Convert mongoose document to plain object
    const userObject = user.toObject();

    // Remove password field
    delete userObject.password;

    return {
      status: 201,
      message: "Users create successful",
      data: userObject,
    };
  } catch (err) {
    return {
      status: 500,
      message: "Error in create users route",
      data: err.message || "Something Went Wrong!",
    };
  }
};

// Update User Service
export const UpdateUsersService = async (req) => {
  try {
    const userId = convertObjectId(req.params.userId);
    const { password } = req.body;

    const user = await UserModel.findById(userId);
    if (!user && user?._id) {
      return {
        status: 404,
        message: "User not found",
        data: null,
      };
    }

    if (password) {
      return {
        status: 400,
        message: "Can't update password directly",
        data: null,
      };
    }

    const updateUser = await UserModel.findOneAndUpdate(
      { _id: userId },
      { ...req.body },
      { new: true }
    );

    if (!updateUser) {
      return { status: 500, message: "Server Issue", data: null };
    }

    // Convert mongoose document to plain object
    const userObject = updateUser.toObject();

    // Remove password field
    delete userObject.password;

    return {
      status: 201,
      message: "User updated successful",
      data: userObject,
    };
  } catch (err) {
    return {
      status: 500,
      message: "Error in update users route",
      data: err.message || "Something Went Wrong!",
    };
  }
};

// Get Single User Service
export const GetUserService = async (req) => {
  try {
    const userId = convertObjectId(req.params.userId);
    const user = await UserModel.findById(userId);

    if (!user && user?._id) {
      return {
        status: 404,
        message: "User not found",
        data: null,
      };
    }

    // Convert mongoose document to plain object
    const userObject = user.toObject();

    // Remove password field
    delete userObject.password;

    return {
      status: 200,
      message: "User updated successful",
      data: userObject,
    };
  } catch (err) {
    return {
      status: 500,
      message: "Error in get user route",
      data: err.message || "Something Went Wrong!",
    };
  }
};

// Delete User Service
export const DeleteUserService = async (req) => {
  try {
    const userId = convertObjectId(req.params.userId);
    const deletedUser = await UserModel.findByIdAndDelete(userId, {
      new: true,
    });

    if (!deletedUser) {
      return {
        status: 500,
        message: "User delete failed",
        data: null,
      };
    }

    // Convert mongoose document to plain object
    const userObject = deletedUser.toObject();

    // Remove password field
    delete userObject.password;

    return {
      status: 200,
      message: "User delete successful",
      data: userObject,
    };
  } catch (err) {
    return {
      status: 500,
      message: "Error in get user route",
      data: err.message || "Something Went Wrong!",
    };
  }
};
