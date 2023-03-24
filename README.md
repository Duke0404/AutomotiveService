# Automotive Service Centre API
Serves as Backend for an API for an auto repair & servicing shop. Provides data about all orders, employees, car-part inventory & equiptment.
## Endpoints

### Login
```POST /login```
Logs in a user and returns a JWT token.

### Register
```POST /register```
Registers a new user.

### Orders
Endpoints related to retreiving data related to all the orders to the centre.

```GET /orders/:limit```
Returns a list of orders in reverse chronological order with specified limit.

<sub><sup>REQUEST</sup></sub>
```
GET /orders/3
```

<sub><sup>RESPONSE</sup></sub>
```
HTTPS/1.1 200 OK
Content-Type: application/json
```
```json
{
	"limit": 3,
	"orders": [
		{
			"orderID": "74",
			"customerID": "kermit.frog",
			"modelID": "123456789",
			"received": "2023-03-01 12:00:00",
			"completed": false,
			"scheduled": "2023-04-01 12:00:00",
		},
		{
			"orderID": "73",
			"customerID": "spongebobSP",
			"modelID": "234567890",
			"received": "2023-01-01 12:00:00",
			"completed": "2023-01-15 12:00:00",
			"scheduled": false,
		},
		{
			"orderID": "72",
			"customerID": "AangTheAvatar",
			"modelID": "2468101214",
			"received": "2022-12-30 12:00:00",
			"completed": false,
			"scheduled": "2023-04-01 12:00:00",
		}
	]
}
```

### Order
Endpoints related to manipulating data related to a specific order.

```GET /order/:id```
Returns the order with the specified id.

<sub><sup>REQUEST</sup></sub>
```
GET /order/70
```

<sub><sup>RESPONSE</sup></sub>

If order exists:
```
HTTPS/1.1 200 OK
Content-Type: application/json
```
```json
{
	"orderID": "70",
	"customerID": "peppa.pig",
	"modelID": "695652",
	"received": "2023-01-01 12:00:00",
	"completed": false,
	"scheduled": "2023-04-01 12:00:00",
	"description": "Car is making a weird noise when I turn the steering wheel.",
	"price": 1000,
	"paid": false,
	"parts": [
		{
			"partID": "101",
			"quantity": 1
		},
		{
			"partID": "2D6",
			"quantity": 2
		}
	]
}
```

If order does not exist:

```
HTTPS/1.1 404 Not Found
content-type: application/json
```
```json
{
	"error": "Order not found."
}
```

```POST /order```
Creates a new order. Requires employee authorization.

<sub><sup>REQUEST</sup></sub>
```
POST /order/
```
```json
{
	"orderID": "75",
	"customerID": "sonic",
	"modelID": "123456780",
	"received": "2023-03-01 12:00:00",
	"completed": false,
	"scheduled": "2023-04-01 12:00:00",
	"description": "Can't go faster than 50mph.",
	"price": 400,
	"paid": true,
	"parts": null
}
```

<sub><sup>RESPONSE</sup></sub>

If order is created successfully:
```
HTTPS/1.1 200 OK
Content-Type: application/json
```
```json
{
	"orderID": "75",
	"customerID": "sonic",
	"modelID": "123456780",
	"received": "2023-03-01 12:00:00",
	"completed": false,
	"scheduled": "2023-04-01 12:00:00",
	"description": "Can't go faster than 50mph.",
	"price": 400,
	"paid": true,
	"parts": null
}
```

If authorization fails:
```
HTTPS/1.1 401 Unauthorized
content-type: application/json
```
```json
{
	"error": "Unauthorized."
}
```

```PUT /order/:id```
Updates the order with the specified id. Requires employee authorization.

<sub><sup>REQUEST</sup></sub>
```
PUT /order/
```
```json
{
	"orderID": "75",
	"customerID": "sonic",
	"modelID": "123456780",
	"received": "2023-03-01 12:00:00",
	"completed": false,
	"scheduled": "2023-04-01 12:00:00",
	"description": "Can't go faster than 50mph.",
	"price": 400,
	"paid": true,
	"parts": [
		{
			"partID": "J7"
			"quantity": 2
		}
	]
}
```

<sub><sup>RESPONSE</sup></sub>

If order is updated successfully:
```
HTTPS/1.1 200 OK
Content-Type: application/json
```
```json
{
	"orderID": "75",
	"customerID": "sonic",
	"modelID": "123456780",
	"received": "2023-03-01 12:00:00",
	"completed": false,
	"scheduled": "2023-04-01 12:00:00",
	"description": "Can't go faster than 50mph.",
	"price": 400,
	"paid": true,
	"parts": [
		{
			"partID": "J7"
			"quantity": 2
		}
	]
}
```

If authorization fails:
```
HTTPS/1.1 401 Unauthorized
content-type: application/json
```
```json
{
	"error": "Unauthorized."
}
```

```DELETE /order/:id```
Deletes the order with the specified id. Requires employee authorization.

<sub><sup>REQUEST</sup></sub>
```
DELETE /order/75
```

<sub><sup>RESPONSE</sup></sub>

```
HTTPS/1.1 200 OK
```

If authorization fails:
```
HTTPS/1.1 401 Unauthorized
content-type: application/json
```
```json
{
	"error": "Unauthorized."
}
```

### Employees
Retreives all employee data.

```GET /employees```
Returns a list of all employees.

### Employee
Endpoints related to manipulating data & schedule of a specific employee.

```GET /employee/:id```
Returns the employee with the specified id.

```POST /employee```
Creates a new employee.

```PUT /employee/:id```
Updates the employee data or schedule with the specified id.

```DELETE /employee/:id```
Deletes the employee with the specified id.

### Parts
To perform operations on all car parts in the inventory.

```GET /parts```
Returns a list of all parts in inventory.

```DELETE /parts```
Empties the entire inventory.

### Part
To perform operations on a specific car part.

```GET /parts/:id```
Returns the part with the specified id.

```POST /parts```
Creates a new part.

```PUT /parts/:id```
Updates the part with the specified id.

```DELETE /parts/:id```
Deletes the part with the specified id.

### Machine
To check status of a particular piece of heavy machinery or equiptment in the centre.

```GET /machines/:id```
Returns the machine with the specified id.

```POST /machines```
Creates a new machine.

```PUT /machines/:id```
Updates the machine with the specified id.

```DELETE /machines/:id```
Deletes the machine with the specified id.
