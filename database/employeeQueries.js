export async function getAllEmployees(conn) {
	const query =
		"SELECT EMPLOYEE_ID, EMPLOYEE_NAME, ROLE_LEVEL, EMAIL, PHONE, EMPLOYEE_USERNAME, TEAM_NAME FROM EMPLOYEE JOIN TEAM ON TEAM_TEAM_ID = TEAM_ID"

	return await conn.execute(query)
}

export async function getEmployee(conn, employeeId) {
	const query =
		"SELECT EMPLOYEE_ID, EMPLOYEE_NAME, ROLE_LEVEL, EMAIL, PHONE, EMPLOYEE_USERNAME, TEAM_NAME FROM EMPLOYEE JOIN TEAM ON TEAM_TEAM_ID = TEAM_ID WHERE EMPLOYEE_ID = :1"

	const values = [employeeId]

	return await conn.execute(query, values)
}

export async function checkEmployeeExists(conn, employeeIdentifier, usingId = true) {
	const query = `SELECT EMPLOYEE_ID FROM EMPLOYEE WHERE ${
		usingId ? "EMPLOYEE_ID" : "EMPLOYEE_USERNAME"
	} = :1`
	const values = [employeeIdentifier]

	const result = await conn.execute(query, values)

	return result.rows.length === 1
}

export async function updateEmployee(
	conn,
	employeeId,
	employeeName,
	roleLevel,
	email,
	phone,
	employeeUsername,
	teamId
) {
	const query =
		"UPDATE EMPLOYEE SET EMPLOYEE_NAME = :1, ROLE_LEVEL = :2, EMAIL = :3, PHONE = :4, EMPLOYEE_USERNAME = :5, TEAM_TEAM_ID = :6 WHERE EMPLOYEE_ID = :7"
	const values = [employeeName, roleLevel, email, phone, employeeUsername, teamId, employeeId]

	const result = await conn.execute(query, values, { autoCommit: true })

	return result.rowsAffected === 1 ? await getEmployee(conn, employeeId) : null
}

export async function deleteEmployee(conn, employeeId) {
	const delDetails = await getEmployee(conn, employeeId)

	const query = "DELETE FROM EMPLOYEE WHERE EMPLOYEE_ID = :1"
	const values = [employeeId]

	const result = await conn.execute(query, values, { autoCommit: true })

	const delCheck = (await getEmployee(conn, employeeId)).rows.length === 0

	return result.rowsAffected === 1 && delCheck ? delDetails : null
}
