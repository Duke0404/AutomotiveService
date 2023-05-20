import connection from "../database/connection.js"
import checkAccess, { checkRoleClearance } from "../database/accessQueries.js"
import {
	getAllEmployees,
	getEmployee,
	updateEmployee,
	deleteEmployee
} from "../database/employeeQueries.js"

const employeeFromArray = employee => ({
	employeeId: employee[0],
	employeeName: employee[1],
	roleLevel: employee[2],
	email: employee[3],
	phone: employee[4],
	employeeUsername: employee[5],
	teamName: employee[6]
})

export async function getAllController(req, res) {
	const user = req.user

	try {
		const conn = await connection()

		const access = await checkAccess(conn, user, true)
		if (!access) return res.status(401).json({ error: "Unauthorized" })

		const roleClearance = await checkRoleClearance(conn, user, 1)
		if (!roleClearance) return res.status(403).json({ error: "Forbidden" })

		const employees = await getAllEmployees(conn)
		if (!employees) return res.status(500).json({ error: "Internal server error" })

		const result = {
			count: employees.rows.length,
			employees: employees.rows.map(employee => employeeFromArray(employee))
		}

		res.json(result)
	} catch (error) {
		console.log(error)
		res.status(500).json({ error: "Internal server error" })
	}
}

export async function getOneController(req, res, employeeId) {
	const user = req.user

	if (!employeeId || typeof employeeId !== "number" || employeeId <= 0 || employeeId % 1 !== 0)
		return res.status(400).json({ error: "Bad request" })

	try {
		const conn = await connection()

		const access = await checkAccess(conn, user, true)
		if (!access) return res.status(401).json({ error: "Unauthorized" })

		const roleClearance = await checkRoleClearance(conn, user, 1)
		if (!roleClearance) return res.status(403).json({ error: "Forbidden" })

		const employee = await getEmployee(conn, employeeId)
		if (!employee) return res.status(500).json({ error: "Internal server error" })
		if (!employee.rows[0]) return res.status(404).json({ error: "Not found" })

		const result = employeeFromArray(employee.rows[0])

		res.json(result)
	} catch (error) {
		console.log(error)
		res.status(500).json({ error: "Internal server error" })
	}
}

export async function updateController(req, res) {
	const user = req.user
	const { employeeId, employeeName, roleLevel, email, phone, employeeUsername, teamId } = req.body

	if (
		!employeeId ||
		!employeeName ||
		!roleLevel ||
		!email ||
		!phone ||
		!employeeUsername ||
		!teamId ||
		typeof employeeId !== "number" ||
		typeof employeeName !== "string" ||
		typeof roleLevel !== "number" ||
		typeof email !== "string" ||
		typeof phone !== "number" ||
		typeof employeeUsername !== "string" ||
		typeof teamId !== "number" ||
		employeeId <= 0 ||
		employeeId % 1 !== 0 ||
		employeeId.toString().length >= 38 ||
		employeeName.length >= 50 ||
		roleLevel <= 0 ||
		roleLevel % 1 !== 0 ||
		roleLevel > 3 ||
		email.length >= 30 ||
		phone.length >= 38 ||
		employeeUsername.length >= 20 ||
		teamId.toString().length >= 38
	)
		return res.status(400).json({ error: "Bad request" })

	try {
		const conn = await connection()

		const access = await checkAccess(conn, user, true)
		if (!access) return res.status(401).json({ error: "Unauthorized" })

		const roleClearance = await checkRoleClearance(conn, user, 2)
		if (!roleClearance) return res.status(403).json({ error: "Forbidden" })

		const exists = await getEmployee(conn, employeeId)
		if (!exists) return res.status(404).json({ error: "Not found" })

		const employee = await updateEmployee(
			conn,
			employeeId,
			employeeName,
			roleLevel,
			email,
			phone,
			employeeUsername,
			teamId
		)
		if (!employee) return res.status(500).json({ error: "Internal server error" })

		const result = employeeFromArray(employee.rows[0])

		res.json(result)
	} catch (error) {
		console.log(error)
		res.status(500).json({ error: "Internal server error" })
	}
}

export async function deleteController(req, res) {
	const user = req.user
	const { employeeId } = req.body

	if (!employeeId || typeof employeeId !== "number" || employeeId <= 0 || employeeId % 1 !== 0)
		return res.status(400).json({ error: "Bad request" })

	try {
		const conn = await connection()

		const access = await checkAccess(conn, user, true)
		if (!access) return res.status(401).json({ error: "Unauthorized" })

		const roleClearance = await checkRoleClearance(conn, user, 2)
		if (!roleClearance) return res.status(403).json({ error: "Forbidden" })

		const exists = await getEmployee(conn, employeeId)
		if (!exists) return res.status(404).json({ error: "Not found" })

		const employee = await deleteEmployee(conn, employeeId)
		if (!employee) return res.status(500).json({ error: "Internal server error" })

		const result = employeeFromArray(employee.rows[0])

		res.json(result)
	} catch (error) {
		console.log(error)
		res.status(500).json({ error: "Internal server error" })
	}
}
