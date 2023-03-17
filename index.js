import { createServer } from "http"

const hostname = "0.0.0.0"
const port = 3000

const server = createServer((req, res) => {
	res.statusCode = 200
	res.setHeader("Content-Type", "text/plain")
	res.end("Okay\n")
})

// GET request on http://localhost:3000/
server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`)
})
