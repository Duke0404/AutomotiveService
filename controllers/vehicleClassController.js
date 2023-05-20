import connection from "../database/connection.js"
import checkAccess, { checkRoleClearance } from "../database/accessQueries.js"
import {
	getAllTypes,
	getType,
	checkTypeExists,
	createType,
	updateType,
	deleteType
} from "../database/vehicleClassQueries.js"

const typeFromArray = type => ({
	typeId: type[0],
	typeName: type[1],
	typeDescription: type[2]
})

export async function getAllController(req, res) {
	const user = req.user

	try {
		const conn = await connection()

		const access = await checkAccess(conn, user, true)
		if (!access) return res.status(401).json({ error: "Unauthorized" })

		const roleClearance = await checkRoleClearance(conn, user, 1)
		if (!roleClearance) return res.status(403).json({ error: "Forbidden" })

		const types = await getAllTypes(conn)

		const result = {
			count: types.rows.length,
			types: types.rows.map(type => typeFromArray(type))
		}

		res.json(result)
	} catch (error) {
		console.log(error)
		res.status(500).json({ error: "Internal server error" })
	}
}

export async function getOneController(req, res, typeId) {
	const user = req.user

	if (!typeId || typeof typeId !== "number" || typeId < 0)
		return res.status(400).json({ error: "Bad request" })

	try {
		const conn = await connection()

		const access = await checkAccess(conn, user, true)
		if (!access) return res.status(401).json({ error: "Unauthorized" })

		const roleClearance = await checkRoleClearance(conn, user, 1)
		if (!roleClearance) return res.status(403).json({ error: "Forbidden" })

		const exists = await checkTypeExists(conn, typeId, true)
		if (!exists) return res.status(404).json({ error: "Not found" })

		const type = await getType(conn, typeId)
		if (!type) return res.status(500).json({ error: "Internal server error" })

		res.json(typeFromArray(type.rows[0]))
	} catch (error) {
		console.log(error)
		res.status(500).json({ error: "Internal server error" })
	}
}

export async function createController(req, res) {
	const user = req.user
	const { typeName, typeDescription } = req.body

	if (
		!typeName ||
		!typeDescription ||
		typeof typeName !== "string" ||
		typeof typeDescription !== "string" ||
		typeName.length >= 50 ||
		typeDescription.length >= 100
	)
		return res.status(400).json({ error: "Bad request" })

	try {
		const conn = await connection()

		const access = await checkAccess(conn, user, true)
		if (!access) return res.status(401).json({ error: "Unauthorized" })

		const roleClearance = await checkRoleClearance(conn, user, 2)
		if (!roleClearance) return res.status(403).json({ error: "Forbidden" })

		const exists = await checkTypeExists(conn, typeName, false)
		if (exists) return res.status(409).json({ error: "Conflict" })

		const type = await createType(conn, typeName, typeDescription)
		if (!type) return res.status(500).json({ error: "Internal server error" })

		const result = typeFromArray(type.rows[0])

		res.status(201).json(result)
	} catch (error) {
		console.log(error)
		res.status(500).json({ error: "Internal server error" })
	}
}

export async function updateController(req, res) {
	const user = req.user
	const { typeId, typeName, typeDescription } = req.body

	if (
		!typeId ||
		!typeName ||
		!typeDescription ||
		typeof typeId !== "number" ||
		typeof typeName !== "string" ||
		typeof typeDescription !== "string" ||
		typeId <= 0 ||
		typeId % 1 !== 0 ||
		typeId.toString().length >= 38 ||
		typeName.length >= 50 ||
		typeDescription.length >= 100
	)
		return res.status(400).json({ error: "Bad request" })

	try {
		const conn = await connection()

		const access = await checkAccess(conn, user, true)
		if (!access) return res.status(401).json({ error: "Unauthorized" })

		const roleClearance = await checkRoleClearance(conn, user, 2)
		if (!roleClearance) return res.status(403).json({ error: "Forbidden" })

		const exists = await checkTypeExists(conn, typeId)
		if (!exists) return res.status(404).json({ error: "Not found" })

		const type = await updateType(conn, typeId, typeName, typeDescription)
		if (!type) return res.status(500).json({ error: "Internal server error" })

		const result = typeFromArray(type.rows[0])

		res.json(result)
	} catch (error) {
		console.log(error)
		res.status(500).json({ error: "Internal server error" })
	}
}

export async function deleteController(req, res) {
	const user = req.user
	const { typeId } = req.body

	if (
		!typeId ||
		typeof typeId !== "number" ||
		typeId <= 0 ||
		typeId % 1 !== 0 ||
		typeId.toString().length >= 38
	)
		return res.status(400).json({ error: "Bad request" })

	try {
		const conn = await connection()

		const access = await checkAccess(conn, user, true)
		if (!access) return res.status(401).json({ error: "Unauthorized" })

		const roleClearance = await checkRoleClearance(conn, user, 2)
		if (!roleClearance) return res.status(403).json({ error: "Forbidden" })

		const exists = await checkTypeExists(conn, typeId)
		if (!exists) return res.status(404).json({ error: "Not found" })

		const type = await deleteType(conn, typeId)
		if (!type) return res.status(500).json({ error: "Internal server error" })

		const result = typeFromArray(type.rows[0])

		res.json(result)
	} catch (error) {
		console.log(error)
		res.status(500).json({ error: "Internal server error" })
	}
}
