import connection from "../database/connection.js"
import checkAccess, { checkRoleClearance } from "../database/accessQueries.js"
import { generateJWT } from "../utilities/jsonWebToken.js"
import { loginCheck, registerCheck, registerCreate } from "../database/authQueries.js"

// Login controller
export async function loginController(req, res, employee = false) {
	const { username, password } = req.body

	if (
		!username ||
		!password ||
		typeof username !== "string" ||
		typeof password !== "string" ||
		username.length < 3 ||
		password.length < 3 ||
		username.length > 20 ||
		password.length > 30
	)
		return res.status(400).json({ error: "Invalid credentials" })

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
	const { username, password, confirmPassword, name, email, phone, teamId, address } = req.body

	try {
		const conn = await connection()

		if (employee) {
			const user = req.user

			const access = await checkAccess(conn, user, true)
			if (!access) return res.status(401).json({ error: "Unauthorized" })

			const roleClearance = await checkRoleClearance(conn, user, 2)
			if (!roleClearance) return res.status(403).json({ error: "Forbidden" })

			if (
				!username ||
				!password ||
				!confirmPassword ||
				!name ||
				!email ||
				!phone ||
				!teamId ||
				typeof username !== "string" ||
				typeof password !== "string" ||
				typeof confirmPassword !== "string" ||
				typeof name !== "string" ||
				typeof email !== "string" ||
				typeof phone !== "number" ||
				typeof teamId !== "number" ||
				username.length < 3 ||
				password.length < 3 ||
				username.length > 20 ||
				password.length > 30 ||
				name.length > 30 ||
				email.length > 30 ||
				phone.length > 38 ||
				teamId.length > 38
			)
				return res.status(400).json({ error: "Invalid credentials" })
		} else {
			if (
				!username ||
				!password ||
				!confirmPassword ||
				!name ||
				typeof username !== "string" ||
				typeof password !== "string" ||
				typeof confirmPassword !== "string" ||
				typeof name !== "string" ||
				(typeof address !== "string" && address !== undefined) ||
				username.length < 3 ||
				password.length < 3 ||
				username.length > 20 ||
				password.length > 30 ||
				name.length > 30 ||
				(typeof address !== "undefined" && address.length > 50)
			)
				return res.status(400).json({ error: "Invalid credentials" })
		}

		if (password !== confirmPassword)
			return res.status(400).json({ error: "Passwords don't match" })

		const exists = await registerCheck(conn, username)
		if (exists) return res.status(400).json({ error: "Username already exists" })

		await registerCreate(
			conn,
			{ username, password, name, email, phone, teamId, address },
			employee
		)

		const token = generateJWT(username, process.env.JWT_SECRET, 12)

		res.status(201).json({ token })
	} catch (error) {
		console.log(error)
		return res.status(500).json({ error: "Internal server error" })
	}
}
