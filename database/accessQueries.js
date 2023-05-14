export default async function checkAccess(conn, username, employee) {
	const table = employee ? "EMPLOYEE" : "CUSTOMER"
	const query = `SELECT ${table}_USERNAME FROM ${table} WHERE ${table}_USERNAME = '${username}'`

	return (await conn.execute(query)).rows.length === 1
}

export async function checkRoleClearance(conn, username, requirement) {
	const query = `SELECT ROLE_LEVEL FROM EMPLOYEE WHERE EMPLOYEE_USERNAME = '${username}'`

	const result = await conn.execute(query)

	return result.rows.length === 1 && result.rows[0][0] >= requirement
}
