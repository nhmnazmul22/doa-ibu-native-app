import { convertObjectId } from "../utility/lib.js";
import AdminModel from "../models/AdminModel.js";
import bcrypt from "bcrypt";
import { TokenEncoded } from "../utility/tokenUtility.js";
const isProduction = process.env.NODE_ENV === "production";

// Get Admin Service
export const GetAdminService = async (req) => {
  try {
    const adminId = convertObjectId(req.params.adminId);
    const admin = await AdminModel.findById(adminId, { password: 0 });

    if (!admin) {
      return { status: 404, message: "Admin not found", data: admin };
    }

    const newAdmin = admin.toObject();
    delete newAdmin.password;

    return { status: 200, message: "Admin found", data: admin };
  } catch (err) {
    return {
      status: 500,
      message: "Error in get admin route",
      data: err.message || "Something Went Wrong!",
    };
  }
};

// Create Admin Service
export const CreateAdminService = async (req) => {
  try {
    const { fullName, password, email } = req.body;

    if (!fullName || !password || !email) {
      return { status: 400, message: "Required Filed missing", data: null };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    if (!hashedPassword) {
      return { status: 400, message: "Password hashed failed", data: null };
    }

    const adminObj = {
      ...req.body,
      fullName,
      email,
      password: hashedPassword,
    };

    const admin = await AdminModel.create(adminObj);

    if (!admin) {
      return { status: 500, message: "Server Issue", data: null };
    }

    return {
      status: 201,
      message: "Admin create successful",
      data: admin,
    };
  } catch (err) {
    return {
      status: 500,
      message: "Error in create admin route",
      data: err.message || "Something Went Wrong!",
    };
  }
};

// Login Admin Service
export const LoginAdminService = async (req, res) => {
  try {
    const { password, email } = req.body;

    if (!password || !email) {
      return { status: 400, message: "Required Filed missing", data: null };
    }

    const admin = await AdminModel.findOne({ email: email });

    if (!admin) {
      return {
        status: 404,
        message: "Admin not found",
        data: null,
      };
    }

    const isPassword = await bcrypt.compare(password, admin.password);

    if (!isPassword) {
      return { status: 400, message: "Wrong password provided", data: null };
    }

    const token = TokenEncoded(admin._id, admin.email);

    res.cookie("adminToken", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      path: "/",
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 days
    });
    return {
      status: 201,
      message: "Admin create successful",
      data: token,
    };
  } catch (err) {
    return {
      status: 500,
      message: "Error in create admin route",
      data: err.message || "Something Went Wrong!",
    };
  }
};

// Update Admin Service
export const UpdateAdminService = async (req) => {
  try {
    const adminId = convertObjectId(req.params.adminId);
    const admin = await AdminModel.findById(adminId);
    const { password } = req.body;

    if (!admin) {
      return {
        status: 404,
        message: "Admin not found",
        data: null,
      };
    }

    let hashedPassword = password;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const updateAdmin = await AdminModel.findByIdAndUpdate(
      adminId,
      {
        ...req.body,
        password: hashedPassword,
      },
      {
        new: true,
      }
    );

    if (!updateAdmin) {
      return { status: 500, message: "Server Issue", data: updateAdmin };
    }

    const newAdmin = updateAdmin.toObject();
    delete newAdmin.password;

    return {
      status: 201,
      message: "Admin updated successful",
      data: newAdmin,
    };
  } catch (err) {
    return {
      status: 500,
      message: "Error in update admin route",
      data: err.message || "Something Went Wrong!",
    };
  }
};

// Delete admin Service
export const DeleteAdminService = async (req) => {
  try {
    const adminId = convertObjectId(req.params.adminId);
    const admin = await AdminModel.findById(adminId, { password: 0 });

    if (!admin) {
      return { status: 404, message: "Admin Not found", data: null };
    }

    const deleteAdmin = await AdminModel.findOneAndDelete({ _id: adminId });

    if (!deleteAdmin) {
      return { status: 404, message: "Doa delete failed", data: deleteAdmin };
    }

    const newAdmin = deleteAdmin.toObject();
    delete newAdmin.password;
    return {
      status: 200,
      message: "Admin deleted successful",
      data: newAdmin,
    };
  } catch (err) {
    return {
      status: 500,
      message: "Error in delete Admin route",
      data: err.message || "Something Went Wrong!",
    };
  }
};
