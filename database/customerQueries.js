export async function getAllCustomers(conn) {
	const query =
		"SELECT CUSTOMER_ID, CUSTOMER_NAME, CUSTOMER_ADDRESS, CUSTOMER_USERNAME FROM CUSTOMER"

	return await conn.execute(query)
}

export async function getCustomer(conn, customerIdentifier, usingId = true) {
	// const query =
	// 	"SELECT CUSTOMER_ID, CUSTOMER_NAME, CUSTOMER_ADDRESS, CUSTOMER_USERNAME FROM CUSTOMER WHERE CUSTOMER_USERNAME = :1"
	// const values = [customerId]

	// return await conn.execute(query, values)

	const query = `SELECT CUSTOMER_ID, CUSTOMER_NAME, CUSTOMER_ADDRESS, CUSTOMER_USERNAME FROM CUSTOMER WHERE ${
		usingId ? "CUSTOMER_ID" : "CUSTOMER_USERNAME"
	} = :1`

	const values = [customerIdentifier]

	return await conn.execute(query, values)
}

export async function updateCustomer(conn, customerUsername, customerName, customerAddress) {
	const query =
		"UPDATE CUSTOMER SET CUSTOMER_NAME = :1, CUSTOMER_ADDRESS = :2 WHERE CUSTOMER_USERNAME = :3"

	const values = [customerName, customerAddress, customerUsername]

	const result = await conn.execute(query, values, { autoCommit: true })

	return result.rowsAffected === 1 ? await getCustomer(conn, customerUsername, false) : null
}
