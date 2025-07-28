import express from "express";
import * as UserController from "../app/controllers/UsersController.js";
import * as MotherController from "../app/controllers/MotherController.js";
import * as DoaController from "../app/controllers/DoaController.js";
import * as PaymentController from "../app/controllers/PaymentsController.js";
import { upload } from "../app/middlewares/uploadMiddleware.js";

const router = express.Router();

// User Routes
router.get("/get-all-users", UserController.GetAllUsersController);
router.post("/create-user", UserController.CreateUserController);
router.get("/get-user/:email", UserController.GetUserController);
router.get("/get-user-by-id/:userId", UserController.GetUserController);
router.put(
  "/update-user/:userId",
  upload.single("image"),
  UserController.UpdateUsersController
);
router.delete("/delete-user/:userId", UserController.DeleteUserController);

// Mother Routes
router.get("/get-all-mothers", MotherController.GetAllMotherController);
router.post("/create-mother", MotherController.CreateMotherController);
router.get("/get-mother/:email", MotherController.GetMotherController);
router.get("/get-mother-by-id/:motherId", MotherController.GetMotherController);
router.put(
  "/update-mother/:motherId",
  upload.single("image"),
  MotherController.UpdateMotherController
);
router.delete(
  "/delete-mother/:motherId",
  MotherController.DeleteMotherController
);

// Doa Routes
router.get("/get-daos/:type", DoaController.GetAllDoasController);
router.post(
  "/create-doa",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "audio", maxCount: 1 },
  ]),
  DoaController.CreateDoasController
);
router.get("/get-doa/:doaId", DoaController.GetDoaController);
router.get(
  "/get-doas-by-motherId/:motherId",
  DoaController.GetDoasByMotherIdController
);
router.put("/update-doa/:doaId", DoaController.UpdateDoasController);
router.delete("/delete-doa/:doaId", DoaController.DeleteDoaController);

// Payments Routes
router.post("/donation-payment", PaymentController.CreateDonationController);
router.post(
  "/subscription-payment",
  PaymentController.CreateSubscriptionChargeController
);
router.post("/midtrans/webhook", PaymentController.MidtransWebhookController);
export default router;
