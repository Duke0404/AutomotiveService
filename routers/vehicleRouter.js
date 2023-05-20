import { Router } from "express"
import authMiddleware from "../middleware/authMiddleware.js"
import {
	getAllController,
	getOneController,
	createController,
	updateController,
	deleteController
} from "../controllers/vehicleController.js"

const vehicleRouter = Router()

// Get all vehicles
vehicleRouter.get("/all", authMiddleware, getAllController)

vehicleRouter.get("/:vehicleId", authMiddleware, async (req, res) =>
	getOneController(req, res, +req.params.vehicleId)
)

// Create a new vehicle
vehicleRouter.post("/", authMiddleware, createController)

// Update a vehicle
vehicleRouter.put("/", authMiddleware, updateController)

// Delete a vehicle
vehicleRouter.delete("/", authMiddleware, deleteController)

export default vehicleRouter
