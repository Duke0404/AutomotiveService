import connection from "../database/connection.js"
import checkAccess, { checkRoleClearance } from "../database/accessQueries.js"
import {
	getAllOrders,
	getOrder,
	checkOrderExists,
	createOrder,
	updateOrder,
	deleteOrder
} from "../database/orderQueries.js"

const orderFromArray = order => ({
	orderId: order[0],
	numberPlate: order[1],
	orderDate: order[2],
	orderOpen: order[3] === "1" ? false : true,
	completionDate: order[4],
	description: order[5],
	price: order[6],
	paid: order[7] === "0" ? false : true,
	customerName: order[8],
	employeeName: order[9],
	vehicleName: order[10]
})

export async function getAllController(req, res, limit, openOnly) {
	const user = req.user

	try {
		const conn = await connection()

		const access = await checkAccess(conn, user, true)
		if (!access) return res.status(401).json({ error: "Unauthorized" })

		const roleClearance = await checkRoleClearance(conn, user, 1)
		if (!roleClearance) return res.status(403).json({ error: "Forbidden" })

		const orders = await getAllOrders(conn, limit, openOnly)

		const result = {
			limit,
			orders: orders.rows.map(order => orderFromArray(order))
		}

		res.json(result)
	} catch (error) {
		console.log(error)
		res.status(500).json({ error: "Internal server error" })
	}
}

export async function getOneController(req, res, orderId) {
	const user = req.user

	if (!orderId || typeof orderId !== "number") {
		return res.status(400).json({ error: "Bad request" })
	}

	try {
		const conn = await connection()

		const access = await checkAccess(conn, user, true)
		if (!access) return res.status(401).json({ error: "Unauthorized" })

		const roleClearance = await checkRoleClearance(conn, user, 1)
		if (!roleClearance) return res.status(403).json({ error: "Forbidden" })

		const exists = await checkOrderExists(conn, orderId)
		if (!exists) return res.status(404).json({ error: "Not Found" })

		const order = await getOrder(conn, orderId)

		res.json(orderFromArray(order.rows[0]))
	} catch (error) {
		console.log(error)
		res.status(500).json({ error: "Internal server error" })
	}
}

export async function createController(req, res) {
	const user = req.user

	const {
		numberPlate,
		orderDate,
		status,
		completionDate,
		description,
		price,
		paid,
		customerId,
		employeeId,
		vehicleId
	} = req.body

	if (
		!numberPlate ||
		!orderDate ||
		!status ||
		!completionDate ||
		!price ||
		!paid ||
		!customerId ||
		!vehicleId ||
		typeof numberPlate !== "string" ||
		typeof orderDate !== "string" ||
		typeof status !== "boolean" ||
		typeof completionDate !== "string" ||
		(typeof description !== "string" && typeof description !== "undefined") ||
		typeof price !== "number" ||
		typeof paid !== "boolean" ||
		typeof customerId !== "number" ||
		(typeof employeeId !== "number" && typeof employeeId !== "undefined") ||
		typeof vehicleId !== "number" ||
		price < 0 ||
		price > 1000000000 ||
		customerId < 0 ||
		customerId % 1 !== 0 ||
		customerId.toString().length > 38 ||
		(typeof employeeId !== "undefined" &&
			(employeeId < 0 || employeeId % 1 !== 0 || employeeId.toString().length > 38)) ||
		vehicleId < 0 ||
		vehicleId % 1 !== 0 ||
		vehicleId.toString().length > 38
	)
		return res.status(400).json({ error: "Bad request" })

	try {
		const conn = await connection()

		const access = await checkAccess(conn, user, true)
		if (!access) return res.status(401).json({ error: "Unauthorized" })

		const roleClearance = await checkRoleClearance(conn, user, 2)
		if (!roleClearance) return res.status(403).json({ error: "Forbidden" })

		// Create the order using the createOrder function
		const order = await createOrder(
			conn,
			numberPlate,
			orderDate,
			status,
			completionDate,
			description,
			price,
			paid,
			customerId,
			employeeId,
			vehicleId
		)

		res.json(orderFromArray(order.rows[0]))
	} catch (error) {
		console.log(error)
		res.status(500).json({ error: "Internal server error" })
	}
}

export async function updateController(req, res) {
	const user = req.user
	const { orderId, ...orderData } = req.body

	if (!orderId || typeof orderId !== "number") {
		return res.status(400).json({ error: "Bad request" })
	}

	try {
		const conn = await connection()

		const access = await checkAccess(conn, user, true)
		if (!access) return res.status(401).json({ error: "Unauthorized" })

		const roleClearance = await checkRoleClearance(conn, user, 1)
		if (!roleClearance) return res.status(403).json({ error: "Forbidden" })

		const exists = await checkOrderExists(conn, orderId)
		if (!exists) return res.status(404).json({ error: "Not Found" })

		const updatedOrder = await updateOrder(conn, orderId, orderData)

		res.json(orderFromArray(updatedOrder.rows[0]))
	} catch (error) {
		console.log(error)
		res.status(500).json({ error: "Internal server error" })
	}
}

export async function deleteController(req, res) {
	const user = req.user
	const { orderId } = req.body

	if (!orderId || typeof orderId !== "number") {
		return res.status(400).json({ error: "Bad request" })
	}

	try {
		const conn = await connection()

		const access = await checkAccess(conn, user, true)
		if (!access) return res.status(401).json({ error: "Unauthorized" })

		const roleClearance = await checkRoleClearance(conn, user, 1)
		if (!roleClearance) return res.status(403).json({ error: "Forbidden" })

		const exists = await checkOrderExists(conn, orderId)
		if (!exists) return res.status(404).json({ error: "Not Found" })

		const deleted = await deleteOrder(conn, orderId)
		if (!deleted) return res.status(500).json({ error: "Internal server error" })

		res.json({ success: true })
	} catch (error) {
		console.log(error)
		res.status(500).json({ error: "Internal server error" })
	}
}
