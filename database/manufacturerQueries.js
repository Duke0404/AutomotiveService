import { outBindObject } from "./connection.js"

export async function getAllManufacturers(conn) {
	const query =
		"SELECT MANUFACTURER_ID, MANUFACTURER_NAME, MANUFACTURER_COUNTRY, IN_BUSINESS FROM MANUFACTURER"

	return await conn.execute(query)
}

export async function getManufacturer(conn, manufacturerId) {
	const query =
		"SELECT MANUFACTURER_ID, MANUFACTURER_NAME, MANUFACTURER_COUNTRY, IN_BUSINESS FROM MANUFACTURER WHERE MANUFACTURER_ID = :1"
	const values = [manufacturerId]

	return await conn.execute(query, values)
}

export async function checkManufacturerExists(conn, manufacturerIdentifier, usingId = true) {
	const query = `SELECT MANUFACTURER_ID FROM MANUFACTURER WHERE ${
		usingId ? "MANUFACTURER_ID" : "MANUFACTURER_NAME"
	} = :1`
	const values = [manufacturerIdentifier]

	const result = await conn.execute(query, values)

	return result.rows.length === 1
}

export async function createManufacturer(conn, manufacturerName, manufacturerCountry, inBusiness) {
	const query = manufacturerCountry
		? "INSERT INTO MANUFACTURER (MANUFACTURER_NAME, MANUFACTURER_COUNTRY, IN_BUSINESS) VALUES (:1, :2, :3) RETURNING MANUFACTURER_ID INTO :4"
		: "INSERT INTO MANUFACTURER (MANUFACTURER_NAME, IN_BUSINESS) VALUES (:1, :2) RETURNING MANUFACTURER_ID INTO :3"

	const values = manufacturerCountry
		? [manufacturerName, manufacturerCountry, inBusiness ? "1" : "0", outBindObject()]
		: [manufacturerName, inBusiness ? "1" : "0", outBindObject()]

	const result = await conn.execute(query, values, { autoCommit: true })

	return result.rowsAffected === 1 ? await getManufacturer(conn, result.outBinds[0][0]) : null
}

export async function updateManufacturer(
	conn,
	manufacturerId,
	manufacturerName,
	manufacturerCountry,
	inBusiness
) {
	const query = manufacturerCountry ? "UPDATE MANUFACTURER SET MANUFACTURER_NAME = :1, MANUFACTURER_COUNTRY = :2, IN_BUSINESS = :3 WHERE MANUFACTURER_ID = :4" : "UPDATE MANUFACTURER SET MANUFACTURER_NAME = :1, IN_BUSINESS = :2 WHERE MANUFACTURER_ID = :3"
	const values = manufacturerCountry
		? [manufacturerName, manufacturerCountry, inBusiness ? "1" : "0", manufacturerId]
		: [manufacturerName, inBusiness ? "1" : "0", manufacturerId]

	const result = await conn.execute(query, values, { autoCommit: true })

	return result.rowsAffected === 1 ? await getManufacturer(conn, manufacturerId) : null
}

export async function deleteManufacturer(conn, manufacturerId) {
	const delDetails = await getManufacturer(conn, manufacturerId)

	const query = "DELETE FROM MANUFACTURER WHERE MANUFACTURER_ID = :1"
	const values = [manufacturerId]

	const result = await conn.execute(query, values, { autoCommit: true })

	const delCheck = (await getManufacturer(conn, manufacturerId)).rows.length === 0

	return result.rowsAffected === 1 && delCheck ? delDetails : null
}
