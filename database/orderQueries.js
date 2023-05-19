import { outBindObject } from "./connection.js"

export async function getAllOrders(conn, openOnly = false) {
	const query =
		"SELECT ORDER_ID, NUMBER_PLATE, ORDER_DATE, STATUS, COMPLETION_DATE, DESCRIPTION, PRICE, PAID, CUSTOMER_NAME, EMPLOYEE_NAME, VEHICLE_NAME FROM ORDER_FACT JOIN VEHICLE ON VEHICLE_VEHICLE_ID = VEHICLE_ID JOIN CUSTOMER ON CUSTOMER_CUSTOMER_ID = CUSTOMER_ID JOIN EMPLOYEE ON EMPLOYEE_EMPLOYEE_ID = EMPLOYEE_ID" +
		(openOnly ? " WHERE STATUS = '0'" : "") + " ORDER BY ORDER_ID DESC"

	return await conn.execute(query)
}

export async function getOrder(conn, orderId) {
	const query =
		"SELECT ORDER_ID, NUMBER_PLATE, ORDER_DATE, STATUS, COMPLETION_DATE, DESCRIPTION, PRICE, PAID, CUSTOMER_NAME, EMPLOYEE_NAME, VEHICLE_NAME FROM ORDER_FACT JOIN VEHICLE ON VEHICLE_VEHICLE_ID = VEHICLE_ID JOIN CUSTOMER ON CUSTOMER_CUSTOMER_ID = CUSTOMER_ID JOIN EMPLOYEE ON EMPLOYEE_EMPLOYEE_ID = EMPLOYEE_ID WHERE ORDER_ID = :1"
	const values = [orderId]

	return await conn.execute(query, values)
}

export async function checkOrderExists(conn, orderId) {
	const query = "SELECT ORDER_ID FROM ORDER_FACT WHERE ORDER_ID = :1"
	const values = [orderId]

	const result = await conn.execute(query, values)

	return result.rows.length === 1
}

export async function createOrder(
	conn,
	numberPlate,
	orderDate,
	status,
	completionDate,
	description,
	price,
	paid,
	customerId,
	employeeId,
	vehicleId
) {
	const query =
		"INSERT INTO ORDER_FACT (NUMBER_PLATE, ORDER_DATE, STATUS, COMPLETION_DATE, DESCRIPTION, PRICE, PAID, CUSTOMER_CUSTOMER_ID, EMPLOYEE_EMPLOYEE_ID, VEHICLE_VEHICLE_ID) VALUES (:1, :2, :3, :4, :5, :6, :7, :8, :9, :10) RETURNING ORDER_ID INTO :11"
	const values = [
		numberPlate,
		orderDate,
		status,
		completionDate,
		description,
		price,
		paid,
		customerId,
		employeeId,
		vehicleId,
		outBindObject()
	]

	const result = await conn.execute(query, values, { autoCommit: true })

	return result.rowsAffected === 1 ? await getOrder(conn, result.outBinds[0][0]) : null
}

export async function updateOrder(
	conn,
	orderId,
	numberPlate,
	orderDate,
	status,
	completionDate,
	description,
	price,
	paid,
	customerId,
	employeeId,
	vehicleId
) {
	const query =
		"UPDATE ORDER_FACT SET NUMBER_PLATE = :1, ORDER_DATE = :2, STATUS = :3, COMPLETION_DATE = :4, DESCRIPTION = :5, PRICE = :6, PAID = :7, CUSTOMER_CUSTOMER_ID = :8, EMPLOYEE_EMPLOYEE_ID = :9, VEHICLE_VEHICLE_ID = :10 WHERE ORDER_ID = :11"
	const values = [
		numberPlate,
		orderDate,
		status,
		completionDate,
		description,
		price,
		paid,
		customerId,
		employeeId,
		vehicleId,
		orderId
	]

	const result = await conn.execute(query, values, { autoCommit: true })

	return result.rowsAffected === 1 ? await getOrder(conn, orderId) : null
}

export async function deleteOrder(conn, orderId) {
	const query = "DELETE FROM ORDER_FACT WHERE ORDER_ID = :1"
	const values = [orderId]

	const result = await conn.execute(query, values, { autoCommit: true })

	return result.rowsAffected === 1
}
