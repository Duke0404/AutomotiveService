import express from "express"
import dotenv from "dotenv"

import authRouter from "./routers/auth.js"

dotenv.config()

const app = express()
app.use(express.json())

const port = process.env.PORT || 3000

app.get("/", (_, res) => res.send("Hello World!"))
app.use("/api/auth", authRouter)

app.listen(port, () => console.log("Server running on http://localhost:" + port + " ⚡"))
