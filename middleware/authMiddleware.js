import { verifyJWT } from "/utils/jsonWebToken.js"

export default function auth(req, res, next) {
	const authHeader = req.headers.authorization

	if (!authHeader) return res.status(401).send({ error: "Missing authorization header" })

	const token = authHeader.split(" ")[1]

	if (!token) return res.status(401).send({ error: "Missing token" })

	try {
		const payload = verifyJWT(token, process.env.JWT_SECRET)

		if (!payload) return res.status(401).send({ error: "Invalid token" })

		req.user = payload
		next()
	} catch (err) {
		return res.status(401).send({ error: "Unauthorized" })
	}
}
