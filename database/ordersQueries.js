export async function getAllOrders(conn, limit, open) {
	const query = `SELECT * FROM (SELECT ORDER_ID, CUSTOMER_NAME, EMPLOYEE_NAME, EMAIL, NUMBER_PLATE, MANUFACTURER_NAME, VEHICLE_NAME, TYPE_NAME, PRODUCTION_YEAR, ORDER_DATE, STATUS, COMPLETION_DATE, DESCRIPTION, PRICE, PAID FROM ORDER_FACT JOIN CUSTOMER ON CUSTOMER_CUSTOMER_ID = CUSTOMER_ID JOIN EMPLOYEE ON EMPLOYEE_EMPLOYEE_ID = EMPLOYEE_ID JOIN VEHICLE ON VEHICLE_VEHICLE_ID = VEHICLE_ID JOIN MANUFACTURER ON MANUFACTURER_MANUFACTURER_ID = MANUFACTURER_ID JOIN VEHICLE_CLASS ON VEHICLE_CLASS_TYPE_ID = TYPE_ID${
		open ? " WHERE STATUS = '0'" : ""
	} ORDER BY ORDER_DATE DESC) WHERE ROWNUM <= ${limit}`

	return await conn.execute(query)
}

export async function getOneOrder(conn, id) {
	const query = `SELECT ORDER_ID, CUSTOMER_NAME, EMPLOYEE_NAME, EMAIL, NUMBER_PLATE, MANUFACTURER_NAME, VEHICLE_NAME, TYPE_NAME, PRODUCTION_YEAR, ORDER_DATE, STATUS, COMPLETION_DATE, DESCRIPTION, PRICE, PAID FROM ORDER_FACT JOIN CUSTOMER ON CUSTOMER_CUSTOMER_ID = CUSTOMER_ID JOIN EMPLOYEE ON EMPLOYEE_EMPLOYEE_ID = EMPLOYEE_ID JOIN VEHICLE ON VEHICLE_VEHICLE_ID = VEHICLE_ID JOIN MANUFACTURER ON MANUFACTURER_MANUFACTURER_ID = MANUFACTURER_ID JOIN VEHICLE_CLASS ON VEHICLE_CLASS_TYPE_ID = TYPE_ID WHERE ORDER_ID = ${id}`

	return await conn.execute(query)
}

// export async function createOrder(conn, details) {
// 	const query =
// 		"INSERT INTO ORDER_FACT (NUMBER_PLATE, ORDER_DATE, DESCRIPTION, PRICE, PAID, CUSTOMER_CUSTOMER_ID, EMPLOYEE_EMPLOYEE_ID, VEHICLE_VEHICLE_ID) VALUES (:0, :1, :2, :3, :4, :5, :6, :7)"

// 	const values = [
// 		details.numberPlate,
// 		details.orderDate,
// 		details.description,
// 		details.price,
// 		details.paid,
// 		details.customerId,
// 		details.employeeId,
// 		details.vehicleId
// 	]

// 	await conn.execute(query, values)
// }
