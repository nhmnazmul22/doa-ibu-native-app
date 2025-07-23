import MotherModel from "../models/MothersModel.js";
import bcrypt from "bcrypt";
import { convertObjectId } from "../utility/lib.js";

// Get all Mother Service
export const GetAllMotherService = async () => {
  try {
    const mothers = await MotherModel.find({}, { password: 0 });

    if (mothers.length === 0) {
      return { status: 404, message: "Mothers not found", data: mothers };
    }

    return { status: 200, message: "Mothers found", data: mothers };
  } catch (err) {
    return {
      status: 500,
      message: "Error in get all mothers route",
      data: err.message || "Something Went Wrong!",
    };
  }
};

// Register Mother Service
export const RegisterMotherService = async (req) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return { status: 400, message: "Required Filed missing", data: null };
    }

    const prevMother = await MotherModel.findOne({ email: email });

    if (prevMother) {
      return { status: 400, message: "Mother already exists", data: null };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const mother = await UserModel.create({
      ...req.body,
      password: hashedPassword,
    });

    if (!mother) {
      return { status: 500, message: "Server Issue", data: null };
    }

    // Convert mongoose document to plain object
    const motherObject = mother.toObject();

    // Remove password field
    delete motherObject.password;

    return {
      status: 201,
      message: "Mother create successful",
      data: motherObject,
    };
  } catch (err) {
    return {
      status: 500,
      message: "Error in create mother route",
      data: err.message || "Something Went Wrong!",
    };
  }
};

// Login Mother Service
export const LoginMotherService = async (req, res) => {
  try {
    const { email, password } = req.body;
    const mother = await MotherModel.findOne({ email: email });

    if (!mother) {
      return {
        status: 404,
        message: "Mother not found",
        data: null,
      };
    }

    const isPasswordTrue = await bcrypt.compare(password, mother.password);

    if (!isPasswordTrue) {
      return {
        status: 400,
        message: "Please, Input right password",
        data: null,
      };
    }

    // Generate Secure token
    const token = TokenEncoded(mother["_id"], mother.email);

    // Store token in cookie
    const cookieOptions = {
      httpOnly: true,
      secure: true,
      path: "/",
      sameSite: "None",
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    };
    res.cookie("motherToken", token, cookieOptions);

    // Convert mongoose document to plain object
    const motherObject = mother.toObject();

    // Remove password field
    delete motherObject.password;

    return {
      status: 200,
      message: "Mother login successful",
      data: motherObject,
    };
  } catch (err) {
    return {
      status: 500,
      message: "Error in login mother route",
      data: err.message || "Something Went Wrong!",
    };
  }
};

// Get single Mother Service
export const GetMotherService = async (req) => {
  try {
    const motherId = convertObjectId(req.headers.motherId);
    const mother = await MotherModel.findById(motherId);

    if (!mother) {
      return {
        status: 404,
        message: "Mother not found",
        data: null,
      };
    }
    // Convert mongoose document to plain object
    const motherObject = mother.toObject();

    // Remove password field
    delete motherObject.password;

    return {
      status: 200,
      message: "Mother found successful",
      data: motherObject,
    };
  } catch (err) {
    return {
      status: 500,
      message: "Error in get mother route",
      data: err.message || "Something Went Wrong!",
    };
  }
};

// Update Mother Service
export const UpdateMotherService = async (req) => {
  try {
    const motherId = convertObjectId(req.headers.motherId);
    const { password } = req.body;

    const mother = await MotherModel.findById(motherId);
    if (!mother && mother?._id) {
      return {
        status: 404,
        message: "Mother not found",
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

    const updateMother = await MotherModel.findOneAndUpdate(
      { _id: motherId },
      { ...req.body },
      { new: true }
    );

    if (!updateMother) {
      return { status: 500, message: "Server Issue", data: null };
    }

    // Convert mongoose document to plain object
    const motherObject = updateMother.toObject();

    // Remove password field
    delete motherObject.password;

    return {
      status: 201,
      message: "Mother updated successful",
      data: motherObject,
    };
  } catch (err) {
    return {
      status: 500,
      message: "Error in update mother route",
      data: err.message || "Something Went Wrong!",
    };
  }
};

// Delete Mother Service
export const DeleteMotherService = async (req) => {
  try {
    const motherId = convertObjectId(req.headers.motherId);
    const deletedMother = await MotherModel.findByIdAndDelete(motherId, {
      new: true,
    });

    if (!deletedMother) {
      return {
        status: 500,
        message: "Mother delete failed",
        data: null,
      };
    }

    // Convert mongoose document to plain object
    const motherObject = deletedMother.toObject();

    // Remove password field
    delete motherObject.password;

    return {
      status: 200,
      message: "Mother delete successful",
      data: motherObject,
    };
  } catch (err) {
    return {
      status: 500,
      message: "Error in delete Mother route",
      data: err.message || "Something Went Wrong!",
    };
  }
};
