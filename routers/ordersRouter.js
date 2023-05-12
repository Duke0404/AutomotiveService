import { Router } from "express"
import connection from "../database/connection.js"
import authMiddleware from "../middlewares/authMiddleware.js"

const router = Router()

// Get all orders
