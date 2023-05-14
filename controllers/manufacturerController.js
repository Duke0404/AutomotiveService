import connection from "../database/connection.js"
import checkAccess, { checkRoleClearance } from "../database/accessQueries.js"
import {
	getAllManufacturers,
	checkManufacturerExists,
	createManufacturer,
	updateManufacturer,
	deleteManufacturer
} from "../database/manufacturerQueries.js"

const manufacturerFromArray = manufacturer => ({
	manufacturerId: manufacturer[0],
	manufacturerName: manufacturer[1],
	manufacturerCountry: manufacturer[2],
	inBusiness: manufacturer[3] === "0" ? false : true
})

export async function getAllController(req, res) {
	const user = req.user

	try {
		const conn = await connection()

		const access = await checkAccess(conn, user, true)
		if (!access) return res.status(401).json({ error: "Unauthorized" })

		const roleClearance = await checkRoleClearance(conn, user, 1)
		if (!roleClearance) return res.status(403).json({ error: "Forbidden" })

		const manufacturers = await getAllManufacturers(conn)

		const result = {
			count: manufacturers.rows.length,
			manufacturers: manufacturers.rows.map(manufacturer =>
				manufacturerFromArray(manufacturer)
			)
		}

		res.json(result)
	} catch (error) {
		console.log(error)
		res.status(500).json({ error: "Internal server error" })
	}
}

export async function createController(req, res) {
	const user = req.user
	const { manufacturerName, manufacturerCountry, inBusiness } = req.body

	if (
		!manufacturerName ||
		!inBusiness ||
		typeof manufacturerName !== "string" ||
		(typeof manufacturerCountry !== "string" && typeof manufacturerCountry !== "undefined") ||
		typeof inBusiness !== "boolean" ||
		manufacturerName.length >= 50 ||
		(manufacturerCountry && manufacturerCountry.length >= 50)
	)
		return res.status(400).json({ error: "Bad request" })

	try {
		const conn = await connection()

		const access = await checkAccess(conn, user, true)
		if (!access) return res.status(401).json({ error: "Unauthorized" })

		const roleClearance = await checkRoleClearance(conn, user, 1)
		if (!roleClearance) return res.status(403).json({ error: "Forbidden" })

		const exists = await checkManufacturerExists(conn, manufacturerName, false)
		if (exists) return res.status(409).json({ error: "Conflict" })

		const manufacturer = await createManufacturer(
			conn,
			manufacturerName,
			manufacturerCountry,
			inBusiness
		)
		if (!manufacturer) return res.status(500).json({ error: "Internal server error" })

		const result = manufacturerFromArray(manufacturer.rows[0])

		res.status(201).json(result)
	} catch (error) {
		console.log(error)
		res.status(500).json({ error: "Internal server error" })
	}
}

export async function updateController(req, res) {
	const user = req.user
	const { manufacturerId, manufacturerName, manufacturerCountry, inBusiness } = req.body

	if (
		!manufacturerId ||
		!manufacturerName ||
		!inBusiness ||
		typeof manufacturerId !== "number" ||
		typeof manufacturerName !== "string" ||
		(typeof manufacturerCountry !== "string" && typeof manufacturerCountry !== "undefined") ||
		typeof inBusiness !== "boolean" ||
		manufacturerId <= 0 ||
		manufacturerId % 1 !== 0 ||
		manufacturerId.toString().length >= 38 ||
		manufacturerName.length >= 50 ||
		(manufacturerCountry && manufacturerCountry.length >= 50)
	)
		return res.status(400).json({ error: "Bad request" })

	try {
		const conn = await connection()

		const access = await checkAccess(conn, user, true)
		if (!access) return res.status(401).json({ error: "Unauthorized" })

		const roleClearance = await checkRoleClearance(conn, user, 3)
		if (!roleClearance) return res.status(403).json({ error: "Forbidden" })

		const exists = await checkManufacturerExists(conn, manufacturerId)
		if (!exists) return res.status(404).json({ error: "Not found" })

		const manufacturer = await updateManufacturer(
			conn,
			manufacturerId,
			manufacturerName,
			manufacturerCountry,
			inBusiness
		)
		if (!manufacturer) return res.status(500).json({ error: "Internal server error" })

		const result = manufacturerFromArray(manufacturer.rows[0])

		res.json(result)
	} catch (error) {
		console.log(error)
		res.status(500).json({ error: "Internal server error" })
	}
}

export async function deleteController(req, res) {
	const user = req.user
	const { manufacturerId } = req.body

	if (
		!manufacturerId ||
		typeof manufacturerId !== "number" ||
		manufacturerId <= 0 ||
		manufacturerId % 1 !== 0 ||
		manufacturerId.toString().length >= 38
	)
		return res.status(400).json({ error: "Bad request" })

	try {
		const conn = await connection()

		const access = await checkAccess(conn, user, true)
		if (!access) return res.status(401).json({ error: "Unauthorized" })

		const roleClearance = await checkRoleClearance(conn, user, 3)
		if (!roleClearance) return res.status(403).json({ error: "Forbidden" })

		const exists = await checkManufacturerExists(conn, manufacturerId)
		if (!exists) return res.status(404).json({ error: "Not found" })

		const manufacturer = await deleteManufacturer(conn, manufacturerId)
		if (!manufacturer) return res.status(400).json({ error: "Bad request" })

		const result = manufacturerFromArray(manufacturer.rows[0])

		res.json(result)
	} catch (error) {
		console.log(error)
		res.status(500).json({ error: "Internal server error" })
	}
}
