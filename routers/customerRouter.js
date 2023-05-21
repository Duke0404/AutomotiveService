import { Router } from "express"
import authMiddleware from "../middleware/authMiddleware.js"
import { getAllController, getOneController } from "../controllers/customerController.js"

const customerRouter = Router()

// Get all customers
customerRouter.get("/all", authMiddleware, getAllController)

// Get one customer
customerRouter.get("/:customerId", authMiddleware, async (req, res) =>
	getOneController(req, res, +req.params.customerId)
)

export default customerRouter
