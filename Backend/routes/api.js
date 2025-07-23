import express from "express";
import * as UserController from "../app/controllers/UsersController";

const router = express.Router();

// User Routes
router.get("/get-all-users", UserController.GetAllUsersController);
router.post("/create-user", UserController.CreateUsersController);
router.put("/update-user/:userId", UserController.UpdateUsersController);
router.get("/get-user/:userId", UserController.GetUserController);
router.delete("/delete-user/:userId", UserController.DeleteUserController);

// Mother Routes
router.get("/get-all-mothers");
router.post("/register-mother");
router.post("/login-mother");
router.post("/forgot-password");
router.get("/get-mother/:motherId");
router.put("/update-mother/:motherId");
router.delete("/delete-mother/:motherId");

// Doa Routes
router.get("/get-daos");
router.post("/create-doa");
router.get("/get-doa/:id");
router.put("/update-doa/:doaId");
router.delete("/delete-doa/:doaId");

export default router;
