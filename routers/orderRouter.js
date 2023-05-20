import { Router } from "express"
import authMiddleware from "../middleware/authMiddleware.js"
import {
	getAllController,
	getMyController,
	getOneController,
	createController,
	updateController,
	deleteController
} from "../controllers/orderController.js"

const ordersRouter = Router()

// Get all orders
ordersRouter.get("/all/:limit?", authMiddleware, async (req, res) =>
	getAllController(req, res, +req.params.limit || 10, req.query.open === "true" ? true : false)
)

// Get all orders for a customer
ordersRouter.get("/my", authMiddleware, getMyController)

// Get One order
ordersRouter.get("/:orderId", authMiddleware, async (req, res) =>
	getOneController(req, res, +req.params.orderId)
)

// Create order
ordersRouter.post("/", authMiddleware, createController)

// Update order
ordersRouter.put("/", authMiddleware, updateController)

// Delete order
ordersRouter.delete("/", authMiddleware, deleteController)

export default ordersRouter
