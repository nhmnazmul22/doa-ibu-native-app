import * as DoaServices from "../services/DoaServices.js";

// Get all Doa Controller
export const GetAllDoasController = async (req, res) => {
  const result = await DoaServices.GetAllDoasService(req);
  return res
    .status(result.status)
    .json({ message: result.message, data: result.data });
};

// Create Doa Controller
export const CreateDoasController = async (req, res) => {
  const result = await DoaServices.CreateDoasService(req);
  return res
    .status(result.status)
    .json({ message: result.message, data: result.data });
};

// Update Doa Controller
export const UpdateDoasController = async (req, res) => {
  const result = await DoaServices.UpdateDoasService(req);
  return res
    .status(result.status)
    .json({ message: result.message, data: result.data });
};

// Get Single Doa Controller
export const GetDoaController = async (req, res) => {
  const result = await DoaServices.GetDoaService(req);
  return res
    .status(result.status)
    .json({ message: result.message, data: result.data });
};

// Get Doas By mother id Controller
export const GetDoasByMotherIdController = async (req, res) => {
  const result = await DoaServices.GetDoasByMotherId(req);
  return res
    .status(result.status)
    .json({ message: result.message, data: result.data });
};

// Delete Doa Controller
export const DeleteDoaController = async (req, res) => {
  const result = await DoaServices.DeleteDoaService(req);
  return res
    .status(result.status)
    .json({ message: result.message, data: result.data });
};

// Love doa controller
export const LoveDoaController = async (req, res) => {
  const result = await DoaServices.LoveDoaService(req);
  return res
    .status(result.status)
    .json({ message: result.message, data: result.data });
};
