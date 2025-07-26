import MotherModel from "../models/MothersModel.js";
import bcrypt from "bcrypt";
import { convertObjectId, removeExistingFile } from "../utility/lib.js";
import path from "path";
import { TokenEncoded } from "../utility/tokenUtility.js";

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

// Create Mother Service
export const CreateMotherService = async (req) => {
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

    const mother = await MotherModel.create({
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

// Get single Mother Service
export const GetMotherService = async (req) => {
  try {
    const email = req.params.email;
    const motherId = convertObjectId(req.params.motherId);
    let mother = null;

    if (email) {
      mother = await MotherModel.findOne({ email: email });
    } else {
      mother = await MotherModel.findOne({ _id: motherId });
    }

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

    const token = TokenEncoded(mother._id, mother.email);

    return {
      status: 200,
      message: "Mother found successful",
      data: motherObject,
      token: token,
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
  const motherId = convertObjectId(req.params.motherId);
  const image = req.files["image"]?.[0];
  const imagePath = image ? path.join("uploads/images", image.fileName) : null;
  let prevImagePath = null;

  const mother = await MotherModel.findById(motherId);

  if (image && mother.profilePicture) {
    const linkArray = user.profilePicture.split("/");
    const fileName = linkArray[linkArray.length - 1];
    prevImagePath = path.join("uploads/images", fileName);
  }

  try {
    const { password } = req.body;

    if (!mother) {
      removeExistingFile(imagePath);
      return {
        status: 404,
        message: "Mother not found",
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
    const imageUrl = image
      ? `${req.protocol}://${req.get("host")}/uploads/images/${image.filename}`
      : null;

    const updateObj = {
      ...req.body,
      profilePicture: imageUrl,
    };

    const updateMother = await MotherModel.findOneAndUpdate(
      { _id: motherId },
      updateObj,
      { new: true }
    );

    if (!updateMother) {
      removeExistingFile(imagePath);
      return { status: 500, message: "Server Issue", data: null };
    }

    // Convert mongoose document to plain object
    const motherObject = updateMother.toObject();

    // Remove password field
    delete motherObject.password;

    removeExistingFile(prevImagePath);
    return {
      status: 201,
      message: "Mother updated successful",
      data: motherObject,
    };
  } catch (err) {
    removeExistingFile(imagePath);
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
    const motherId = convertObjectId(req.params.motherId);

    const mother = await MotherModel.findById(motherId);
    let imagePath = null;
    if (mother.profilePicture) {
      const linkArray = user.profilePicture.split("/");
      const fileName = linkArray[linkArray.length - 1];
      imagePath = path.join("uploads/images", fileName);
    }

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

    removeExistingFile(imagePath);
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
