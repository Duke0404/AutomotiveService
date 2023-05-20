import connection from "../database/connection.js"
import checkAccess from "../database/accessQueries.js"
import { getCustomer, updateCustomer } from "../database/customerQueries.js"

const profileFromArray = profile => ({
	name: profile[1],
	address: profile[2],
	username: profile[3],
})


export async function getMyProfileController(req, res) {
	const user = req.user

	try {
		const conn = await connection()

		const access = await checkAccess(conn, user)
		if (!access) return res.status(401).json({ error: "Unauthorized" })

		const profile = await getCustomer(conn, user, false)
		if (!profile) return res.status(404).json({ error: "Not found" })

		res.json(profileFromArray(profile.rows[0]))
	} catch (error) {
		console.log(error)
		res.status(500).json({ error: "Internal server error" })
	}
}

export async function updateMyProfileController(req, res) {
	const username = req.user
	const { name, address } = req.body

	if (
		!name ||
		!address ||
		!username ||
		typeof name !== "string" ||
		typeof address !== "string" ||
		typeof username !== "string" ||
		username.length < 3 ||
		name.length >= 50 ||
		address.length >= 50 ||
		username.length >= 50
	)
		return res.status(400).json({ error: "Bad request" })

	try {
		const conn = await connection()

		const access = await checkAccess(conn, username)
		if (!access) return res.status(401).json({ error: "Unauthorized" })

		const profile = await updateCustomer(conn, username, name, address)
		if (!profile) return res.status(500).json({ error: "Internal server error" })

		const result = profileFromArray(profile.rows[0])

		res.json(result)
	} catch (error) {
		console.log(error)
		res.status(500).json({ error: "Internal server error" })
	}
}