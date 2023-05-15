import connection from "../database/connection.js"
import checkAccess from "../database/accessQueries.js"
import { getAllOrders, getOneOrder } from "../database/ordersQueries.js"

const orderFromArray = order => ({
	orderId: order[0],
	customerName: order[1],
	employeeAssigned: order[2],
	employeeEmail: order[3],
	numberPlate: order[4],
	vehicleManufacturer: order[5],
	vehicleModel: order[6],
	vehicleType: order[7],
	vehicleYear: order[8],
	orderDate: order[9],
	orderOpen: order[10] === "1" ? false : true,
	completionDate: order[11],
	orderDescription: order[12],
	orderPrice: order[13],
	orderPaid: order[14] === "0" ? false : true
})

export async function getAllController(req, res, limit, open) {
	const user = req.user

	try {
		const conn = await connection()

		const access = await checkAccess(conn, user, true)
		if (!access) return res.status(403).json({ error: "Forbidden" })

		const orders = await getAllOrders(conn, limit, open)

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

export async function getOneController(req, res, id) {
	const user = req.user

	try {
		const conn = await connection()

		const access =
			(await checkAccess(conn, user, true)) || (await checkAccess(conn, user, false))
		if (!access) return res.status(403).json({ error: "Forbidden" })

		const order = await getOneOrder(conn, id)

		if (!order) return res.status(404).json({ error: "Order not found" })

		res.json(orderFromArray(order.rows[0]))
	} catch (error) {
		console.log(error)
		res.status(500).json({ error: "Internal server error" })
	}
}

// export async function createController(req, res) {
// 	const user = req.user
// 	const { customerId, vehicleId, description, price, paid } = req.body

// 	try {
// 		const conn = await connection()

// 		const access = await checkAccess(conn, user, true)
// 		if (!access) return res.status(403).json({ error: "Forbidden" })
// 	} catch (error) {
// 		console.log(error)
// 		res.status(500).json({ error: "Internal server error" })
// 	}
// }
