import { Router } from "express"
import authMiddleware from "../middleware/authMiddleware.js"
import {
	getAllController,
	createController,
	updateController,
	deleteController
} from "../controllers/teamController.js"

const teamsRouter = Router()

// Get all teams
teamsRouter.get("/all", authMiddleware, getAllController)

// Create a new team
teamsRouter.post("/", authMiddleware, createController)

// Update a team
teamsRouter.put("/", authMiddleware, updateController)

// Delete a team
teamsRouter.delete("/", authMiddleware, deleteController)

export default teamsRouter