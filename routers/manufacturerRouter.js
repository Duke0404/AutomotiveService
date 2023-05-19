import { Router } from "express"
import authMiddleware from "../middleware/authMiddleware.js"
import {
	getAllController,
	getOneController,
	createController,
	updateController,
	deleteController
} from "../controllers/manufacturerController.js"

const manufacturerRouter = Router()

// Get all vemanufacturer
manufacturerRouter.get("/all", authMiddleware, getAllController)

manufacturerRouter.get("/:manufacturerId", authMiddleware, async (req, res) =>
	getOneController(req, res, +req.params.manufacturerId)
)

// Create a new manufacturer
manufacturerRouter.post("/", authMiddleware, createController)

// Update a manufacturer
manufacturerRouter.put("/", authMiddleware, updateController)

// Delete a manufacturer
manufacturerRouter.delete("/", authMiddleware, deleteController)

export default manufacturerRouter
