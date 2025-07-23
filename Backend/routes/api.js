import express from 'express';
const router = express.Router();
import  * as todoController from "../app/controllers/todoController.js"

// Create
router.post("/store",todoController.store)

// Read
router.get("/show",todoController.show)

// Update
router.put("/update",todoController.update)

// Delete
router.delete("/destroy",todoController.destroy)

export default router;


