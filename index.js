// import express from "express"
// import dotenv from "dotenv"
// import jwt from "jsonwebtoken"

// port = process.env.PORT || 3000

// dotenv.config()
// const app = express()
// app.use(express.json())

// const usersDB = [
// 	{ username: "admin", password: "admin" },
// 	{ username: "user", password: "user" }
// ]

// // Login route
// app.post("/login", (req, res) => {
// 	const { username, password } = req.body

// 	if (!username || !password) return res.status(400).json({ error: "Missing credentials" })

// 	if (!usersDB.find(user => user.username === username && user.password === password))
// 		return res.status(401).json({ error: "Invalid credentials" })

// 	let token

// 	try {
// 		token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: "12h" })
// 	} catch (err) {
// 		return res.status(500).json({ error: "Internal server error" })
// 	}

// 	res.json({ token })
// })

// // Signup route
// app.post("/signup", (req, res) => {
// 	const { username, password } = req.body

// 	if (!username || !password) return res.status(400).json({ error: "Missing credentials" })

// 	if (usersDB.find(user => user.username === username))
// 		return res.status(409).json({ error: "Use a different username" })

// 	usersDB.push({ username, password })

// 	let token

// 	try {
// 		token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: "12h" })
// 	} catch (err) {
// 		return res.status(500).json({ error: "Internal server error" })
// 	}

// 	return res.json({ message: "User created successfully" })
// })

// app.listen(port, () => console.log("Server running on http://localhost:" + port + " ⚡"))

