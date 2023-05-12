import { Router } from "express"
import connection from "../database/connection.js"
import { generateJWT } from "../utilities/jsonWebToken.js"

const router = Router()

// Customer Login Route
router.post("/login", async (req, res) => {
	const { username, password } = req.body

	if (!username || !password) return res.status(400).json({ error: "Missing credentials" })

	try {
		const conn = await connection()
		const correct =
			(
				await conn.execute(
					`SELECT CUSTOMER_USERNAME FROM CUSTOMER WHERE CUSTOMER_USERNAME = '${username}' AND CUSTOMER_PASSWORD = '${password}'`
				)
			).rows.length === 1

		if (!correct) return res.status(401).json({ error: "Invalid credentials" })

		const token = generateJWT(username, process.env.JWT_SECRET, 12)

		res.json({ token })
	} catch (error) {
		console.log(error)
		return res.status(500).json({ error: "Internal server error" })
	}
})

// Employee Login Route
router.post("/employeeLogin", async (req, res) => {
	const { username, password } = req.body

	if (!username || !password) return res.status(400).json({ error: "Missing credentials" })

	try {
		const conn = await connection()
		const correct =
			(
				await conn.execute(
					`SELECT EMPLOYEE_USERNAME FROM EMPLOYEE WHERE EMPLOYEE_USERNAME = '${username}' AND EMPLOYEE_PASSWORD = '${password}'`
				)
			).rows.length === 1

		if (!correct) return res.status(401).json({ error: "Invalid credentials" })

		const token = generateJWT(username, process.env.JWT_SECRET, 12)

		res.json({ token })
	} catch (_) {
		return res.status(500).json({ error: "Internal server error" })
	}
})

// User Registration Route
router.post("/register", async (req, res) => {
	const { username, password, confirmPassword, name, address } = req.body

	if (!username || !password || !confirmPassword || !name)
		return res.status(400).json({ error: "Missing credentials" })

	if (password.length < 3)
		return res.status(400).json({ error: "Password must be at least 3 characters long" })

	if (password !== confirmPassword)
		return res.status(400).json({ error: "Passwords don't match" })

	try {
		const conn = await connection()
		const exists =
			(
				await conn.execute(
					`SELECT CUSTOMER_USERNAME FROM CUSTOMER WHERE CUSTOMER_USERNAME = '${username}'`
				)
			).rows.length === 1

		if (exists) return res.status(409).json({ error: "User already exists" })

		const result = await conn.execute(
			"INSERT INTO CUSTOMER (CUSTOMER_USERNAME, CUSTOMER_PASSWORD, CUSTOMER_NAME, CUSTOMER_ADDRESS) VALUES (:1, :2, :3, :4)",
			[username, password, name, address],
			{ autoCommit: true }
		)
		console.log(result)

		const token = generateJWT(username, process.env.JWT_SECRET, 12)

		res.json({ token })
	} catch (error) {
		console.log(error)
		return res.status(500).json({ error: "Internal server error" })
	}
})

// Employee Registration Route
router.post("/employeeRegister", async (req, res) => {
	const { username, password, confirmPassword, name, email, phone, teamID } = req.body

	if (!username || !password || !confirmPassword || !name || !email || !phone || !teamID)
		return res.status(400).json({ error: "Missing credentials" })

	if (password.length < 3)
		return res.status(400).json({ error: "Password must be at least 3 characters long" })

	if (password !== confirmPassword)
		return res.status(400).json({ error: "Passwords don't match" })

	try {
		const conn = await connection()
		const exists = conn.execute(
			"SELECT EMPLOYEE_USERNAME FROM EMPLOYEE WHERE EMPLOYEE_USERNAME = '" + username + "'"
		)

		if (exists) return res.status(409).json({ error: "User already exists" })

		const teamExists = conn.execute("SELECT TEAM_ID FROM TEAM WHERE TEAM_ID = '" + teamID + "'")

		if (!teamExists) return res.status(409).json({ error: "Team does not exist" })

		await conn.execute(
			"INSERT INTO EMPLOYEE (EMPLOYEE_USERNAME, EMPLOYEE_PASSWORD, EMPLOYEE_NAME, EMPLOYEE_EMAIL, EMPLOYEE_PHONE, TEAM_ID) VALUES (:1, :2, :3, :4, :5, :6)",
			[username, password, name, email, phone, teamID],
			{ autoCommit: true }
		)

		const token = generateJWT(username, process.env.JWT_SECRET, 12)

		res.json({ token })
	} catch (_) {
		return res.status(500).json({ error: "Internal server error" })
	}
})

export default router
