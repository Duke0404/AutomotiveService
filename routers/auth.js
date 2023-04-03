import { Router } from "express"
import { generateJWT } from "../utils/jsonWebToken.js"

const users = [
	{ username: "admin", password: "admin" },
	{ username: "user", password: "user" }
]

const router = Router()

// Login Route
router.post("/login", (req, res) => {
	const { username, password } = req.body

	if (!username || !password) return res.status(400).json({ error: "Missing credentials" })

	if (!users.find(user => user.username === username && user.password === password))
		return res.status(401).json({ error: "Invalid credentials" })

	let token

	try {
		token = generateJWT(username, process.env.JWT_SECRET, 12)
	} catch (err) {
		return res.status(500).json({ error: "Internal server error" })
	}

	res.json({ token })
})

// Register Route
router.post("/register", (req, res) => {
	const { username, password, confirmPassword } = req.body

	if (!username || !password || !confirmPassword)
		return res.status(400).json({ error: "Missing credentials" })

	if (password !== confirmPassword)
		return res.status(400).json({ error: "Passwords don't match" })

	if (users.find(user => user.username === username))
		return res.status(409).json({ error: "User already exists" })

	users.push({ username, password })

	let token

	try {
		token = generateJWT(username, process.env.JWT_SECRET, 12)
	} catch (err) {
		return res.status(500).json({ error: "Internal server error" })
	}

	res.json({ token })
})

export default router
