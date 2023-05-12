import express from "express"
import dotenv from "dotenv"

import authRouter from "./routers/authRouter.js"

import connection from "./database/connection.js"

dotenv.config()

const app = express()
app.use(express.json())

const port = process.env.PORT || 3000

app.get("/", (_, res) => res.send("Hello World!"))

app.get("/test", async (_, res) => {
	const conn = await connection()
	const result = await conn.execute(
		"SELECT * FROM CUSTOMER"
	)
	res.json(result.rows)
})
app.use("/api/auth", authRouter)

app.listen(port, () => console.log("Server running on http://localhost:" + port + " ⚡"))
