import express from "express";
import * as UserController from "../app/controllers/UsersController.js";
import * as MotherController from "../app/controllers/MotherController.js";
import { AuthMiddleware } from "../app/middlewares/authMiddleware.js";
const router = express.Router();

// User Routes
router.get("/get-all-users", UserController.GetAllUsersController);
router.post("/create-user", UserController.CreateUserController);
router.post("/get-user", UserController.GetUserController);
router.put("/update-user/:userId", UserController.UpdateUsersController);
router.delete("/delete-user/:userId", UserController.DeleteUserController);

// Mother Routes
router.get("/get-all-mothers", MotherController.GetAllMotherController);
router.post("/register-mother", MotherController.RegisterMotherController);
router.post("/login-mother", MotherController.LoginMotherController);
router.get("/get-mother", AuthMiddleware, MotherController.GetMotherController);
router.put(
  "/update-mother",
  AuthMiddleware,
  MotherController.UpdateMotherController
);
router.delete(
  "/delete-mother",
  AuthMiddleware,
  MotherController.DeleteMotherController
);

// Doa Routes
router.get("/get-daos");
router.post("/create-doa");
router.get("/get-doa/:id");
router.put("/update-doa/:doaId");
router.delete("/delete-doa/:doaId");

export default router;
