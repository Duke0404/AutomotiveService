import { Router } from "express"
import authMiddleware from "../middleware/authMiddleware.js"
import {
	getAllController,
	createController,
	updateController,
	deleteController
} from "../controllers/manufacturerController.js"

const manufacturerRouter = Router()

// Get all vemanufacturer
manufacturerRouter.get("/all", authMiddleware, getAllController)

// Create a new manufacturer
manufacturerRouter.post("/", authMiddleware, createController)

// Update a manufacturer
manufacturerRouter.put("/", authMiddleware, updateController)

// Delete a manufacturer
manufacturerRouter.delete("/", authMiddleware, deleteController)

export default manufacturerRouter
