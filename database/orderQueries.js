import { outBindObject } from "./connection"

export async function getAllOrders(conn, openOnly = false) {
	const query =
		"SELECT ORDER_ID, NUMBER_PLATE, ORDER_DATE, STATUS, COMPLETION_DATE, DESCRIPTION, PRICE, PAID, CUSTOMER_NAME, EMPLOYEE_NAME, VEHICLE_NAME FROM ORDERS JOIN VEHICLE ON VEHICLE_VEHICLE_ID = VEHICLE_ID JOIN CUSTOMER ON CUSTOMER_CUSTOMER_ID = CUSTOMER_ID JOIN EMPLOYEE ON EMPLOYEE_EMPLOYEE_ID = EMPLOYEE_ID" +
		(openOnly ? " WHERE STATUS = '0'" : "")

	return await conn.execute(query)
}

export async function getOrder(conn, orderId) {
	const query =
		"SELECT ORDER_ID, NUMBER_PLATE, ORDER_DATE, STATUS, COMPLETION_DATE, DESCRIPTION, PRICE, PAID, CUSTOMER_NAME, EMPLOYEE_NAME, VEHICLE_NAME FROM ORDERS JOIN VEHICLE ON VEHICLE_VEHICLE_ID = VEHICLE_ID JOIN CUSTOMER ON CUSTOMER_CUSTOMER_ID = CUSTOMER_ID JOIN EMPLOYEE ON EMPLOYEE_EMPLOYEE_ID = EMPLOYEE_ID WHERE ORDER_ID = :1"
	const values = [orderId]

	return await conn.execute(query, values)
}

export async function checkOrderExists(conn, orderId) {
	const query = "SELECT ORDER_ID FROM ORDERS WHERE ORDER_ID = :1"
	const values = [orderId]

	const result = await conn.execute(query, values)

	return result.rows.length === 1
}
