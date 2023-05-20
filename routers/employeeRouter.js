import { Router } from "express"
import authMiddleware from "../middleware/authMiddleware.js"
import {
	getAllController,
	getOneController,
	updateController,
	deleteController
} from "../controllers/EmployeeController.js"

const employeeRouter = Router()

// Get all employees
employeeRouter.get("/all", authMiddleware, getAllController)

// Get one employee
employeeRouter.get("/:employeeId", authMiddleware, async (req, res) => getOneController(req, res, +req.params.employeeId))

// Update a employee
employeeRouter.patch("/", authMiddleware, updateController)

// Delete a employee
employeeRouter.delete("/", authMiddleware, deleteController)

export default employeeRouter