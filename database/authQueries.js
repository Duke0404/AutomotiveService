// Check user credentials for login
export async function loginCheck(conn, username, password, employee = false) {
	const table = employee ? "EMPLOYEE" : "CUSTOMER"
	const query = `SELECT ${table}_USERNAME FROM ${table} WHERE ${table}_USERNAME = '${username}' AND ${table}_PASSWORD = '${password}'`
	return (await conn.execute(query)).rows.length === 1
}

// Check if username already exists for register
export async function registerCheck(conn, username) {
	const query = `SELECT CUSTOMER_USERNAME FROM CUSTOMER WHERE CUSTOMER_USERNAME = '${username}' UNION SELECT EMPLOYEE_USERNAME FROM EMPLOYEE WHERE EMPLOYEE_USERNAME = '${username}'`
	return (await conn.execute(query)).rows.length === 1
}

// Create user for register
export async function registerCreate(conn, details, employee) {
	const query = employee
		? "INSERT INTO EMPLOYEE (EMPLOYEE_USERNAME, EMPLOYEE_PASSWORD, EMPLOYEE_NAME, ROLE_LEVEL, EMAIL, PHONE, TEAM_TEAM_ID) VALUES (:1, :2, :3, 1, :4, :5, :6)"
		: "INSERT INTO CUSTOMER (CUSTOMER_USERNAME, CUSTOMER_PASSWORD, CUSTOMER_NAME, CUSTOMER_ADDRESS) VALUES (:1, :2, :3, :4)"

	const values = employee
		? [
				details.username,
				details.password,
				details.name,
				details.email,
				details.phone,
				details.teamId
		  ]
		: [details.username, details.password, details.name, details.address]

	await conn.execute(query, values, { autoCommit: true })
}
