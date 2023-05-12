import connection from "../database/connection.js"
import { checkEmployee, getAllOrders } from "../database/ordersQueries.js"

const orderFormat = order => ({
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

		const access = await checkEmployee(conn, user)
		if (!access) return res.status(403).json({ error: "Forbidden" })

		const orders = await getAllOrders(conn, limit, open)

		const result = {
			limit,
			orders: orders.rows.map(order => orderFormat(order))
		}

		res.json(result)
	} catch (error) {
		console.log(error)
		res.status(500).json({ error: "Internal server error" })
	}
}
