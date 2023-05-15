import connection from "../database/connection.js"
import checkAccess, { checkRoleClearance } from "../database/accessQueries.js"
import {
	getAllVehicles,
	checkVehicleExists,
	createVehicle,
	updateVehicle,
	deleteVehicle
} from "../database/vehicleQueries.js"

const vehicleFromArray = vehicle => ({
	vehicleId: vehicle[0],
	vehicleName: vehicle[1],
	productionYear: vehicle[2],
	typeName: vehicle[3],
	manufacturerName: vehicle[4]
})

export async function getAllController(req, res) {
	const user = req.user

	try {
		const conn = await connection()

		const access = await checkAccess(conn, user, true)
		if (!access) return res.status(401).json({ error: "Unauthorized" })

		const roleClearance = await checkRoleClearance(conn, user, 1)
		if (!roleClearance) return res.status(403).json({ error: "Forbidden" })

		const vehicles = await getAllVehicles(conn)

		console.log(vehicles)
		const result = {
			count: vehicles.rows.length,
			vehicles: vehicles.rows.map(vehicle => vehicleFromArray(vehicle))
		}

		console.log(result)
		res.json(result)
	} catch (error) {
		console.log(error)
		res.status(500).json({ error: "Internal server error" })
	}
}

export async function createController(req, res) {
	const user = req.user
	const { vehicleName, productionYear, typeId, manufacturerId } = req.body

	if (
		!vehicleName ||
		!productionYear ||
		!typeId ||
		!manufacturerId ||
		typeof vehicleName !== "string" ||
		typeof productionYear !== "number" ||
		typeof typeId !== "number" ||
		typeof manufacturerId !== "number" ||
		productionYear < 0 ||
		productionYear % 1 !== 0 ||
		productionYear > 9999 ||
		typeId < 0 ||
		typeId % 1 !== 0 ||
		typeId.toString().length >= 38 ||
		manufacturerId < 0 ||
		manufacturerId % 1 !== 0 ||
		manufacturerId.toString().length >= 38 ||
		vehicleName.length >= 50
	)
		return res.status(400).json({ error: "Bad request" })

	try {
		const conn = await connection()

		const access = await checkAccess(conn, user, true)
		if (!access) return res.status(401).json({ error: "Unauthorized" })

		const roleClearance = await checkRoleClearance(conn, user, 1)
		if (!roleClearance) return res.status(403).json({ error: "Forbidden" })

		const vehicleExists = await checkVehicleExists(conn, vehicleName, false)
		if (vehicleExists) return res.status(409).json({ error: "Conflict" })

		const vehicle = await createVehicle(
			conn,
			vehicleName,
			productionYear,
			typeId,
			manufacturerId
		)

		res.json(vehicleFromArray(vehicle.rows[0]))
	} catch (error) {
		console.log(error)
		res.status(500).json({ error: "Internal server error" })
	}
}

export async function updateController(req, res) {
	const user = req.user
	const { vehicleId, vehicleName, productionYear, typeId, manufacturerId } = req.body

	if (
		!vehicleId ||
		!vehicleName ||
		!productionYear ||
		!typeId ||
		!manufacturerId ||
		typeof vehicleId !== "number" ||
		typeof vehicleName !== "string" ||
		typeof productionYear !== "number" ||
		typeof typeId !== "number" ||
		typeof manufacturerId !== "number" ||
		productionYear < 0 ||
		productionYear % 1 !== 0 ||
		productionYear > 9999 ||
		typeId < 0 ||
		typeId % 1 !== 0 ||
		typeId.toString().length >= 38 ||
		manufacturerId < 0 ||
		manufacturerId % 1 !== 0 ||
		manufacturerId.toString().length >= 38 ||
		vehicleName.length >= 50
	)
		return res.status(400).json({ error: "Bad request" })

	try {
		const conn = await connection()

		const access = await checkAccess(conn, user, true)
		if (!access) return res.status(401).json({ error: "Unauthorized" })

		const roleClearance = await checkRoleClearance(conn, user, 1)
		if (!roleClearance) return res.status(403).json({ error: "Forbidden" })

		const exists = await checkVehicleExists(conn, vehicleId)
		if (!exists) return res.status(404).json({ error: "Not Found" })

		const vehicle = await updateVehicle(
			conn,
			vehicleId,
			vehicleName,
			productionYear,
			typeId,
			manufacturerId
		)

		res.json(vehicleFromArray(vehicle.rows[0]))
	} catch (error) {
		console.log(error)
		res.status(500).json({ error: "Internal server error" })
	}
}

export async function deleteController(req, res) {
	const user = req.user
	const { vehicleId } = req.body

	if (
		!vehicleId ||
		typeof vehicleId !== "number" ||
		vehicleId < 0 ||
		vehicleId % 1 !== 0 ||
		vehicleId.toString().length >= 38
	)
		return res.status(400).json({ error: "Bad request" })

	try {
		const conn = await connection()

		const access = await checkAccess(conn, user, true)
		if (!access) return res.status(401).json({ error: "Unauthorized" })

		const roleClearance = await checkRoleClearance(conn, user, 1)
		if (!roleClearance) return res.status(403).json({ error: "Forbidden" })

		const exists = await checkVehicleExists(conn, vehicleId)
		if (!exists) return res.status(404).json({ error: "Not Found" })

		const vehicle = await deleteVehicle(conn, vehicleId)
		if (!vehicle) return res.status(500).json({ error: "Internal server error" })

		const result = vehicleFromArray(vehicle.rows[0])

		res.json(result)
	} catch (error) {
		console.log(error)
		res.status(500).json({ error: "Internal server error" })
	}
}
