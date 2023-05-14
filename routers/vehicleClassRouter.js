import { Router } from "express"
import authMiddleware from "../middleware/authMiddleware.js"
import {
	getAllController,
	createController,
	updateController,
	deleteController
} from "../controllers/vehicleClassController.js"

const vehicleClassRouter = Router()

// Get all vehicle classes
vehicleClassRouter.get("/all", authMiddleware, getAllController)

// Create a new vehicle class
vehicleClassRouter.post("/", authMiddleware, createController)

// Update a vehicle class
vehicleClassRouter.put("/", authMiddleware, updateController)

// Delete a vehicle class
vehicleClassRouter.delete("/", authMiddleware, deleteController)

export default vehicleClassRouter