import { Router } from "express"
import authMiddleware from "../middleware/authMiddleware.js"
import {
	getAllController,
	createController,
	updateController,
	deleteController
} from "../controllers/manufacturerController.js"

const manufacturerRouter = Router()

// Get all vehicle classes
manufacturerRouter.get("/all", authMiddleware, getAllController)

// Create a new vehicle class
manufacturerRouter.post("/", authMiddleware, createController)

// Update a vehicle class
manufacturerRouter.put("/", authMiddleware, updateController)

// Delete a vehicle class
manufacturerRouter.delete("/", authMiddleware, deleteController)

export default manufacturerRouter
