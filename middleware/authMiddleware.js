import { verifyJWT } from "../utilities/jsonWebToken.js"

function toUsername(payload) {
	let i = 0
	let username = ""

	while (Object.hasOwn(payload, i.toString())) {
		username += payload[i.toString()]
		i++
	}

	return username
}

export default function authMiddleware(req, res, next) {
	const token = req.headers.authorization

	if (!token) return res.status(401).json({ error: "Authentication error" })

	try {
		const payload = verifyJWT(token, process.env.JWT_SECRET)

		if (!payload) return res.status(401).json({ error: "Authentication error" })

		req.user = toUsername(payload)
		next()
	} catch (err) {
		return res.status(401).json({ error: "Authentication error" })
	}
}
