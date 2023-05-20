import { Router } from "express"
import authMiddleware from "../middleware/authMiddleware.js"
import {
	getMyProfileController,
	updateMyProfileController
} from "../controllers/profileController.js"

const profileRouter = Router()

// Get my profile
profileRouter.get("/", authMiddleware, getMyProfileController)

// Update my profile
profileRouter.patch("/", authMiddleware, updateMyProfileController)

export default profileRouter
