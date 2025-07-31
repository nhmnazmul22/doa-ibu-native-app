import MotherModel from "../models/MothersModel.js";
import { convertObjectId, removeExistingFile } from "../utility/lib.js";
import path from "path";

// Get all Mother Service
export const GetAllMotherService = async () => {
  try {
    const mothers = await MotherModel.find({});

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
    const { fullName, email } = req.body;

    if (!fullName || !email) {
      return { status: 400, message: "Required Filed missing", data: null };
    }

    const prevMother = await MotherModel.findOne({ email: email });

    if (prevMother) {
      return { status: 400, message: "Mother already exists", data: null };
    }

    const mother = await MotherModel.create({
      ...req.body,
    });

    if (!mother) {
      return { status: 500, message: "Server Issue", data: null };
    }

    return {
      status: 201,
      message: "Mother create successful",
      data: mother,
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

    return {
      status: 200,
      message: "Mother found successful",
      data: mother,
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
  const image = req.file;
  const imagePath = image ? path.join("uploads/images", image.fileName) : null;
  let prevImagePath = null;

  const mother = await MotherModel.findById(motherId);

  if (image && mother.profilePicture) {
    const linkArray = mother.profilePicture.split("/");
    const fileName = linkArray[linkArray.length - 1];
    prevImagePath = path.join("uploads/images", fileName);
  }

  try {
    if (!mother) {
      removeExistingFile(imagePath);
      return {
        status: 404,
        message: "Mother not found",
        data: null,
      };
    }

    const protocol = req.protocol === "http" ? "https" : req.protocol;
    const imageUrl = image
      ? `${protocol}://${req.get("host")}/uploads/images/${image.filename}`
      : mother.profilePicture;

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

    removeExistingFile(prevImagePath);
    return {
      status: 201,
      message: "Mother updated successful",
      data: updateMother,
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

    removeExistingFile(imagePath);
    return {
      status: 200,
      message: "Mother delete successful",
      data: deletedMother,
    };
  } catch (err) {
    return {
      status: 500,
      message: "Error in delete Mother route",
      data: err.message || "Something Went Wrong!",
    };
  }
};

// Follow mother service
export const FollowMotherService = async (req) => {
  try {
    const motherId = convertObjectId(req.params.motherId);
    const mother = await MotherModel.findById(motherId);
    const { userId } = req.body;

    if (!mother) {
      return {
        status: 404,
        message: "Mother not found",
        data: null,
      };
    }

    const updateArray = [...mother.followers, userId];

    const updateMother = await MotherModel.findOneAndUpdate(
      { _id: motherId },
      { followers: updateArray },
      { new: true }
    );

    if (!updateMother) {
      return { status: 500, message: "Server Issue", data: null };
    }

    return {
      status: 201,
      message: "New follower added in mother profile",
      data: updateMother,
    };
  } catch (err) {
    return {
      status: 500,
      message: "Error in adding mother new follower route",
      data: err.message || "Something Went Wrong!",
    };
  }
};
