import connection from "../database/connection.js"
import { generateJWT } from "../utilities/jsonWebToken.js"
import { loginCheck, registerCheck, registerCreate } from "../database/authQueries.js"

// Login controller
export async function loginController(req, res, employee = false) {
	const { username, password } = req.body

	if (!username || !password) return res.status(400).json({ error: "Missing credentials" })

	try {
		const conn = await connection()
		const correct = await loginCheck(conn, username, password, employee)

		if (!correct) return res.status(401).json({ error: "Invalid credentials" })

		const token = generateJWT(username, process.env.JWT_SECRET, 12)

		res.json({ token })
	} catch (error) {
		console.log(error)
		return res.status(500).json({ error: "Internal server error" })
	}
}

// Register controller
export async function registerController(req, res, employee = false) {
	const { username, password, confirmPassword, name, email, phone, teamID, address } = req.body

	if (employee) {
		if (!username || !password || !confirmPassword || !name || !email || !phone || !teamID)
			return res.status(400).json({ error: "Missing credentials" })
	}
	else {
		if (!username || !password || !confirmPassword || !name || !address)
			return res.status(400).json({ error: "Missing credentials" })
	}

	if (password.length < 3) return res.status(400).json({ error: "Password must be at least 3 characters long" })

	if (password !== confirmPassword) return res.status(400).json({ error: "Passwords don't match" })

	try {
		const conn = await connection()
		const exists = await registerCheck(conn, username)

		if (exists) return res.status(400).json({ error: "Username already exists" })

		await registerCreate(conn, { username, password, name, email, phone, teamID, address }, employee)

		const token = generateJWT(username, process.env.JWT_SECRET, 12)

		res.status(201).json({ token })
	} catch (error) {
		console.log(error)
		return res.status(500).json({ error: "Internal server error" })
	}
}