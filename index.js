import express from "express"
import dotenv from "dotenv"

import authRouter from "./routers/authRouter.js"
import ordersRouter from "./routers/ordersRouter.js"
import teamRouter from "./routers/teamRouter.js"
import vehicleClassRouter from "./routers/vehicleClassRouter.js"
import manufacturerRouter from "./routers/manufacturerRouter.js"

dotenv.config()

const app = express()
app.use(express.json())

const port = process.env.PORT || 3000

app.get("/", (_, res) => res.send("Hello World!"))

app.use("/auth", authRouter)
app.use("/order", ordersRouter)
app.use("/team", teamRouter)
app.use("/vehicle-class", vehicleClassRouter)
app.use("/manufacturer", manufacturerRouter)

app.listen(port, () => console.log("Server running on http://localhost:" + port + " ⚡"))
