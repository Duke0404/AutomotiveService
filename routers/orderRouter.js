import { Router } from "express"
import authMiddleware from "../middleware/authMiddleware.js"
import {
	getAllController,
	getOneController,
	createController,
	updateController,
	deleteController,
} from "../controllers/orderController.js"

const ordersRouter = Router()

// Get all orders
ordersRouter.get("/all/:limit?", authMiddleware, async (req, res) =>
	getAllController(req, res, +req.params.limit || 10, req.query.open === "true" ? true : false)
)

// Get One order
ordersRouter.get("/:orderId", authMiddleware, async (req, res) =>
	getOneController(req, res, +req.params.orderId)
)

// Create order
ordersRouter.post("/", authMiddleware, createController)

// Update order
ordersRouter.put("/:id", authMiddleware, updateController)

// Delete order
ordersRouter.delete("/:id", authMiddleware, deleteController)

export default ordersRouter
