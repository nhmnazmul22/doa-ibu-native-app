import bcrypt from "bcrypt";
import UserModel from "../models/UserModel.js";
import { convertObjectId, removeExistingFile } from "../utility/lib.js";
import path from "path";
import { TokenEncoded } from "../utility/tokenUtility.js";

// Get all User Service
export const GetAllUsersService = async () => {
  try {
    const users = await UserModel.find({}, { password: 0 });

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
    const { fullName, email, password } = req.body;

    if (!fullName || !email) {
      return { status: 400, message: "Required Filed missing", data: null };
    }

    const prevUser = await UserModel.findOne({ email: email });

    if (prevUser) {
      return { status: 400, message: "User already exists", data: null };
    }

    let hashedPassword = "";
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const user = await UserModel.create({
      ...req.body,
      password: hashedPassword,
    });

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
  const userId = convertObjectId(req.params.userId);
  const { password } = req.body;
  const image = req.file;
  console.log(image);
  let imagePath = image ? path.join("uploads/images", image.filename) : null;
  let prevImagePath = null;

  const user = await UserModel.findById(userId);

  if (image && user.profilePicture) {
    const linkArray = user.profilePicture.split("/");
    const fileName = linkArray[linkArray.length - 1];
    prevImagePath = path.join("uploads/images", fileName);
  }

  try {
    if (!user) {
      removeExistingFile(imagePath);
      return {
        status: 404,
        message: "User not found",
        data: null,
      };
    }

    if (password) {
      removeExistingFile(imagePath);
      return {
        status: 400,
        message: "Can't update password directly",
        data: null,
      };
    }

    // Generating imgUrl
    const imageUrl = image
      ? `${req.protocol}://${req.get("host")}/uploads/images/${image.filename}`
      : null;

    const updatedObj = {
      ...req.body,
      profilePicture: imageUrl,
    };

    const updateUser = await UserModel.findOneAndUpdate(
      { _id: userId },
      updatedObj,
      { new: true }
    );

    if (!updateUser) {
      removeExistingFile(imagePath);
      return { status: 500, message: "Server Issue", data: null };
    }

    // Convert mongoose document to plain object
    const userObject = updateUser.toObject();

    // Remove password field
    delete userObject.password;

    removeExistingFile(prevImagePath);
    return {
      status: 201,
      message: "User updated successful",
      data: userObject,
    };
  } catch (err) {
    removeExistingFile(imagePath);
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
    const email = req.params.email;
    const userId = convertObjectId(req.params.userId);
    let user = null;

    if (email) {
      user = await UserModel.findOne({ email: email });
    } else {
      user = await UserModel.findOne({ _id: userId });
    }

    if (!user) {
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

    const token = TokenEncoded(user._id, user.email);
    return {
      status: 200,
      message: "User found successful",
      data: userObject,
      token: token,
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
    const user = await UserModel.findById(userId);
    let imagePath = null;

    if (user.profilePicture) {
      const linkArray = user.profilePicture.split("/");
      const fileName = linkArray[linkArray.length - 1];
      imagePath = image ? path.join("uploads/images", fileName) : null;
    }

    if (!user) {
      return {
        status: 404,
        message: "User not found",
        data: null,
      };
    }

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
    // Remove profile pic
    removeExistingFile(imagePath);

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
