import DoaModel from "../models/DoaModel.js";
import { getAudioDurationInSeconds } from "get-audio-duration";
import { convertObjectId, removeExistingFile } from "../utility/lib.js";
import path from "path";

// Get all Doa Service
export const GetAllDoasService = async (req) => {
  try {
    const type = req.params.type;
    const doas = await DoaModel.find({ type: type });

    if (doas.length === 0) {
      return { status: 404, message: "Doas not found", data: doas };
    }

    return { status: 200, message: "Doas found", data: doas };
  } catch (err) {
    return {
      status: 500,
      message: "Error in get all Doas route",
      data: err.message || "Something Went Wrong!",
    };
  }
};

// Create Doa Service
export const CreateDoasService = async (req) => {
  const image = req.files?.["image"]?.[0];
  const audio = req.files?.["audio"]?.[0];
  const imagePath = image ? path.join("uploads/images", image.filename) : null;
  const audioPath = audio ? path.join("uploads/audio", audio.filename) : null;

  try {
    const { title, audioLink } = req.body;

    if (!title) {
      removeExistingFile(imagePath);
      removeExistingFile(audioPath);
      return { status: 400, message: "Required Filed missing", data: null };
    }

    // Generating imgUrl and audio url
    if (!audio) {
      removeExistingFile(imagePath);
      removeExistingFile(audioPath);
      return { status: 400, message: "Audio File not provided", data: null };
    }

    const imageUrl = image
      ? `${req.protocol}://${req.get("host")}/uploads/images/${image.filename}`
      : null;

    const audioUrl = audio
      ? `${req.protocol}://${req.get("host")}/uploads/audio/${audio.filename}`
      : null;

    // Generate Audio Duration
    let duration = 0;
    if (audio) {
      const audioPath = path.join("uploads/audio", audio.filename);
      duration = await getAudioDurationInSeconds(audioPath);
    }

    const doaObj = {
      ...req.body,
      thumbnail: imageUrl || "",
      audioLink: audioLink || audioUrl || "",
      duration: duration,
    };

    const doa = await DoaModel.create(doaObj);

    if (!doa) {
      removeExistingFile(imagePath);
      removeExistingFile(audioPath);
      return { status: 500, message: "Server Issue", data: null };
    }

    return {
      status: 201,
      message: "Doa create successful",
      data: doa,
    };
  } catch (err) {
    removeExistingFile(imagePath);
    removeExistingFile(audioPath);
    return {
      status: 500,
      message: "Error in create Doa route",
      data: err.message || "Something Went Wrong!",
    };
  }
};

// Update Doa Service
export const UpdateDoasService = async (req) => {
  try {
    const doaId = convertObjectId(req.params.doaId);

    const doa = await DoaModel.findById(doaId);

    if (!doa) {
      return {
        status: 404,
        message: "Doa not found",
        data: null,
      };
    }

    const updateDoa = await DoaModel.findByIdAndUpdate(doaId, req.body, {
      new: true,
    });

    if (!updateDoa) {
      return { status: 500, message: "Server Issue", data: updateDoa };
    }

    return {
      status: 201,
      message: "Doa updated successful",
      data: updateDoa,
    };
  } catch (err) {
    return {
      status: 500,
      message: "Error in update mother route",
      data: err.message || "Something Went Wrong!",
    };
  }
};

// Get Single Doa Service
export const GetDoaService = async (req) => {
  try {
    const doaId = convertObjectId(req.params.doaId);
    const doa = await DoaModel.findOne({ _id: doaId });

    if (doa) {
      return { status: 404, message: "Doa not found", data: doa };
    }

    return { status: 200, message: "Doa found", data: doa };
  } catch (err) {
    return {
      status: 500,
      message: "Error in get doa route",
      data: err.message || "Something Went Wrong!",
    };
  }
};

// Delete Doa Service
export const DeleteDoaService = async (req) => {
  try {
    const doaId = convertObjectId(req.params.doaId);
    let imagePath = null;
    let audioPath = null;

    const doa = await DoaModel.findById(doaId);

    if (doa.thumbnail) {
      const linkArray = doa.thumbnail.split("/");
      const fileName = linkArray[linkArray.length - 1];
      imagePath = image ? path.join("uploads/images", fileName) : null;
    }

    if (doa.audioLink) {
      const linkArray = doa.audioLink.split("/");
      const fileName = linkArray[linkArray.length - 1];
      audioPath = audio ? path.join("uploads/audio", fileName) : null;
    }

    const deleteDoa = await DoaModel.findOneAndDelete({ _id: doaId });

    if (!deleteDoa) {
      return { status: 404, message: "Doa delete failed", data: deleteDoa };
    }

    removeExistingFile(imagePath);
    removeExistingFile(audioPath);
    return { status: 200, message: "Doa deleted successful", data: deleteDoa };
  } catch (err) {
    return {
      status: 500,
      message: "Error in delete doa route",
      data: err.message || "Something Went Wrong!",
    };
  }
};
