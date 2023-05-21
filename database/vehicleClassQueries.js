import { outBindObject } from "./connection.js"

export async function getAllTypes(conn) {
	const query = "SELECT TYPE_ID, TYPE_NAME, TYPE_DESCRIPTION FROM VEHICLE_CLASS"

	return await conn.execute(query)
}

export async function getType(conn, typeId) {
	const query =
		"SELECT TYPE_ID, TYPE_NAME, TYPE_DESCRIPTION FROM VEHICLE_CLASS WHERE TYPE_ID = :1"
	const values = [typeId]

	return await conn.execute(query, values)
}

export async function checkTypeExists(conn, typeIdentifier, usingId = true) {
	const query = `SELECT TYPE_ID FROM VEHICLE_CLASS WHERE ${
		usingId ? "TYPE_ID" : "TYPE_NAME"
	} = :1`
	const values = [typeIdentifier]

	const result = await conn.execute(query, values)

	return result.rows.length === 1
}

export async function createType(conn, typeName, typeDescription) {
	const query =
		"INSERT INTO VEHICLE_CLASS (TYPE_NAME, TYPE_DESCRIPTION) VALUES (:1, :2) RETURNING TYPE_ID INTO :3"
	const values = [typeName, typeDescription, outBindObject()]

	const result = await conn.execute(query, values, { autoCommit: true })

	return result.rowsAffected === 1 ? await getType(conn, result.outBinds[0][0]) : null
}

export async function updateType(conn, typeId, typeName, typeDescription) {
	const query =
		"UPDATE VEHICLE_CLASS SET TYPE_NAME = :1, TYPE_DESCRIPTION = :2 WHERE TYPE_ID = :3"
	const values = [typeName, typeDescription, typeId]

	const result = await conn.execute(query, values, { autoCommit: true })

	return result.rowsAffected === 1 ? await getType(conn, typeId) : null
}

export async function deleteType(conn, typeId) {
	const delDetails = await getType(conn, typeId)

	const query = "DELETE FROM VEHICLE_CLASS WHERE TYPE_ID = :1"
	const values = [typeId]

	const result = await conn.execute(query, values, { autoCommit: true })

	const delCheck = (await getType(conn, typeId)).rows.length === 0

	return result.rowsAffected === 1 && delCheck ? delDetails : null
}
