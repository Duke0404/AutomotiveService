import { Router } from "express"
import authMiddleware from "../middleware/authMiddleware.js"
import { loginController, registerController } from "../controllers/authController.js"

const authRouter = Router()

// Customer login route
authRouter.post("/login", (req, res) => loginController(req, res))

// Employee Login Route
authRouter.post("/employee/login", (req, res) => loginController(req, res, true))

// User Registration Route
authRouter.post("/register", (req, res) => registerController(req, res))

// Employee Registration Route
authRouter.post("/employee/add", authMiddleware, (req, res) => registerController(req, res, true))

export default authRouter
