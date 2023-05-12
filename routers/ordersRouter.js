import { Router } from "express"
import authMiddleware from "../middleware/authMiddleware.js"
import { getAllController } from "../controllers/ordersController.js"

const ordersRouter = Router()

// Get all orders
ordersRouter.get("/all/:limit?", authMiddleware, async (req, res) =>
	getAllController(req, res, +req.params.limit || 10, req.query.open === "true" ? true : false)
)

// Get One order
// ordersRouter.get("/:id", authMiddleware, async (req, res) => )

export default ordersRouter
