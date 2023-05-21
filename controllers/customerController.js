import connection from "../database/connection.js"
import checkAccess, { checkRoleClearance } from "../database/accessQueries.js"

import { getAllCustomers, getCustomer } from "../database/customerQueries.js"

const customerFromArray = customer => ({
	customerId: customer[0],
	customerName: customer[1],
	customerAddress: customer[2],
	customerUsername: customer[3]
})

export async function getAllController(req, res) {
	const user = req.user

	try {
		const conn = await connection()

		const access = await checkAccess(conn, user, true)
		if (!access) return res.status(401).json({ error: "Unauthorized" })

		const roleClearance = await checkRoleClearance(conn, user, 1)
		if (!roleClearance) return res.status(403).json({ error: "Forbidden" })

		const customers = await getAllCustomers(conn)

		const result = {
			count: customers.rows.length,
			customers: customers.rows.map(customer => customerFromArray(customer))
		}

		res.json(result)
	} catch (error) {
		console.log(error)
		res.status(500).json({ error: "Internal server error" })
	}
}

export async function getOneController(req, res, customerId) {
	const user = req.user

	if (
		!customerId ||
		typeof customerId !== "number" ||
		customerId <= 0 ||
		customerId % 1 !== 0 ||
		customerId.toString().length >= 38
	)
		return res.status(400).json({ error: "Bad request" })

	try {
		const conn = await connection()

		const access = await checkAccess(conn, user, true)
		if (!access) return res.status(401).json({ error: "Unauthorized" })

		const roleClearance = await checkRoleClearance(conn, user, 1)
		if (!roleClearance) return res.status(403).json({ error: "Forbidden" })

		const customer = await getCustomer(conn, customerId)
		if (!customer) return res.status(404).json({ error: "Not found" })

		res.json(customerFromArray(customer.rows[0]))
	} catch (error) {
		console.log(error)
		res.status(500).json({ error: "Internal server error" })
	}
}
