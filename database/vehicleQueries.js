import { outBindObject } from "./connection.js"

export async function getAllVehicles(conn) {
	const query =
		"SELECT VEHICLE_ID, VEHICLE_NAME, PRODUCTION_YEAR, TYPE_NAME, MANUFACTURER_NAME FROM VEHICLE JOIN MANUFACTURER ON MANUFACTURER_MANUFACTURER_ID = MANUFACTURER_ID JOIN VEHICLE_CLASS ON VEHICLE_CLASS_TYPE_ID = TYPE_ID"

	return await conn.execute(query)
}

export async function getVehicle(conn, vehicleId) {
	const query =
		"SELECT VEHICLE_ID, VEHICLE_NAME, PRODUCTION_YEAR, TYPE_NAME, MANUFACTURER_NAME FROM VEHICLE JOIN MANUFACTURER ON MANUFACTURER_MANUFACTURER_ID = MANUFACTURER_ID JOIN VEHICLE_CLASS ON VEHICLE_CLASS_TYPE_ID = TYPE_ID WHERE VEHICLE_ID = :1"
	const values = [vehicleId]

	return await conn.execute(query, values)
}

export async function checkVehicleExists(conn, vehicleIdentifier, usingId = true) {
	const query = `SELECT VEHICLE_ID FROM VEHICLE WHERE ${
		usingId ? "VEHICLE_ID" : "VEHICLE_NAME"
	} = :1`
	const values = [vehicleIdentifier]

	const result = await conn.execute(query, values)

	return result.rows.length === 1
}

export async function createVehicle(
	conn,
	vehicleName,
	productionYear,
	vehicleType,
	manufacturerId
) {
	const query =
		"INSERT INTO VEHICLE (VEHICLE_NAME, PRODUCTION_YEAR, VEHICLE_CLASS_TYPE_ID, MANUFACTURER_MANUFACTURER_ID) VALUES (:1, :2, :3, :4) RETURNING VEHICLE_ID INTO :5"

	const values = [vehicleName, productionYear, vehicleType, manufacturerId, outBindObject()]

	const result = await conn.execute(query, values, { autoCommit: true })

	return result.rowsAffected === 1 ? await getVehicle(conn, result.outBinds[0][0]) : null
}

export async function updateVehicle(
	conn,
	vehicleId,
	vehicleName,
	productionYear,
	vehicleType,
	manufacturerId
) {
	const query =
		"UPDATE VEHICLE SET VEHICLE_NAME = :1, PRODUCTION_YEAR = :2, VEHICLE_CLASS_TYPE_ID = :3, MANUFACTURER_MANUFACTURER_ID = :4 WHERE VEHICLE_ID = :5"
	const values = [vehicleName, productionYear, vehicleType, manufacturerId, vehicleId]

	const result = await conn.execute(query, values, { autoCommit: true })

	return result.rowsAffected === 1 ? await getVehicle(conn, vehicleId) : null
}

export async function deleteVehicle(conn, vehicleId) {
	const query = "DELETE FROM VEHICLE WHERE VEHICLE_ID = :1"
	const values = [vehicleId]

	const result = await conn.execute(query, values, { autoCommit: true })

	return result.rowsAffected === 1
}
