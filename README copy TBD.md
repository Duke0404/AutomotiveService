# Automotive Service Centre API

Serves as Backend for an API for an auto repair & servicing shop. Provides data about all orders, employees, car-part inventory & equiptment.

# Endpoints

-   [Authentication](#authentication)

## Authentication

### Login

Logs in a user and returns a JWT token.

<sub><sup>REQUEST</sup></sub>

```
POST /api/auth/login
```

```json
{
	"username": "bugs",
	"password": "WhatsUpDoc!"
}
```

<sub><sup>RESPONSE</sup></sub>

```
HTTPS/1.1 200 OK
Content-Type: application/json
```

```json
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIwIjoidSIsIjEiOiJzIiwiMiI6ImUiLCIzIjoiciIsImV4cCI6MTY4MDQzOTkzMn0.7oY-0MwLt7fSOf9dn1FZDEYN312UHfIiQoiBYGpNILw"
}
```

### Register

`POST /register`
Registers a new user.

### Orders

Endpoints related to retreiving data related to all the orders to the centre.

`GET /orders/:limit`
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
			"scheduled": "2023-04-01 12:00:00"
		},
		{
			"orderID": "73",
			"customerID": "spongebobSP",
			"modelID": "234567890",
			"received": "2023-01-01 12:00:00",
			"completed": "2023-01-15 12:00:00",
			"scheduled": false
		},
		{
			"orderID": "72",
			"customerID": "AangTheAvatar",
			"modelID": "2468101214",
			"received": "2022-12-30 12:00:00",
			"completed": false,
			"scheduled": "2023-04-01 12:00:00"
		}
	]
}
```

### Order

Endpoints related to manipulating data related to a specific order.

`GET /order/:id`
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

`POST /order`
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

`PUT /order/`
Updates an order. Requires employee authorization.

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

`DELETE /order/:id`
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

`GET /employees`
Returns a list of all employees. Requires manager authorization.

<sub><sup>REQUEST</sup></sub>

```
GET /employees
```

<sub><sup>RESPONSE</sup></sub>

```
HTTPS/1.1 200 OK
Content-Type: application/json
```

```json
{
	"employees": [
		{
			"employeeID": "casperg",
			"firstName": "Casper",
			"lastName": "The Friendly Ghost",
			"email": "casper.g@autocentre.com"
		},
		{
			"employeeID": "mario",
			"firstName": "Mario",
			"lastName": "Mario",
			"email": "mm@autocentre.com"
		},
		{
			"employeeID": "luigi",
			"firstName": "Luigi",
			"lastName": "Mario",
			"email": "lm@autocentre.com"
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

### Employee

Endpoints related to manipulating data & schedule of a specific employee.

`GET /employee/:id`
Returns the employee with the specified id.

<sub><sup>REQUEST</sup></sub>

```
GET /employee/casperg
```

<sub><sup>RESPONSE</sup></sub>

If employee exists:

```
HTTPS/1.1 200 OK
Content-Type: application/json
```

```json
{
	"employeeID": "casperg",
	"firstName": "Casper",
	"lastName": "The Friendly Ghost",
	"email": "casper.g@autocentre.com",
	"assigned": ["75", "76"]
}
```

If order does not exist:

```
HTTPS/1.1 404 Not Found
content-type: application/json
```

```json
{
	"error": "Employee not found."
}
```

`POST /employee`
Creates a new employee. Requires manager authorization.

<sub><sup>REQUEST</sup></sub>

```
POST /employee
```

```json
{
	"employeeID": "scoob",
	"firstName": "Scooby",
	"lastName": "Doo",
	"email": "scoobydoobydoo@autocentre.com",
	"assigned": []
}
```

<sub><sup>RESPONSE</sup></sub>

if employee is created successfully:

```json
{
	"employeeID": "scoob",
	"firstName": "Scooby",
	"lastName": "Doo",
	"email": "scoobydoobydoo@autocentre.com",
	"assigned": []
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

`PUT /employee/`
Updates the employee data or schedule with the specified id. Requires manager authorization.

<sub><sup>REQUEST</sup></sub>
I

```
PUT /employee/
```

```json
{
	"employeeID": "casperg",
	"firstName": "Casper",
	"lastName": "The Friendly Ghost",
	"email": "casperg@autocentre.com",
	"assigned": []
}
```

<sub><sup>RESPONSE</sup></sub>
If employee is updated successfully:

```
HTTPS/1.1 200 OK
Content-Type: application/json
```

```json
{
	"employeeID": "casperg",
	"firstName": "Casper",
	"lastName": "The Friendly Ghost",
	"email": "casperg@autocentre.com",
	"assigned": []
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

`DELETE /employee/:id`
Deletes the employee with the specified id. Requires manager authorization.

<sub><sup>REQUEST</sup></sub>

```
DELETE /employee/casperg
```

<sub><sup>RESPONSE</sup></sub>

```
HTTPS/1.1 200 OK
```

### Parts

To perform operations on all car parts in the inventory.

`GET /parts`
Returns a list of all parts in inventory. Requires employee level authorization.

<sub><sup>REQUEST</sup></sub>

```
GET /parts
```

<sub><sup>RESPONSE</sup></sub>

```
HTTPS/1.1 200 OK
Content-Type: application/json
```

```json
{
	"parts": [
		{
			"partID": "xsred657rt8",
			"description": "Yoke steering",
			"quantity": 20
		},
		{
			"partID": "tge5t33t4wef",
			"description": "Brake pads",
			"quantity": 10
		}
	]
}
```

`DELETE /parts`
Empties the entire inventory. Requires manager authorization.

<sub><sup>REQUEST</sup></sub>

```
DELETE /parts
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

### Part

To perform operations on a specific car part.

`GET /parts/:id`
Returns the part with the specified id.

<sub><sup>REQUEST</sup></sub>

```
GET /parts/xsred657rt8
```

```json
{
	"partID": "xsred657rt8",
	"description": "Yoke steering",
	"quantity": 20
}
```

If part does not exist:

```
HTTPS/1.1 404 Not Found
content-type: application/json
```

```json
{
	"error": "Part not found."
}
```

`POST /parts`
Creates a new part. Requires employee authorization.

<sub><sup>REQUEST</sup></sub>

```
POST /parts
```

```json
{
	"partID": "xsred657rt8",
	"description": "Yoke steering",
	"quantity": 19
}
```

<sub><sup>RESPONSE</sup></sub>

if part is created successfully:

```json
{
	"partID": "xsred657rt8",
	"description": "Yoke steering",
	"quantity": 19
}
```

If authorization fails:

```json
{
	"error": "Unauthorized."
}
```

`PUT /parts/:id`
Updates the part with the specified id. Requires employee authorization.

<sub><sup>REQUEST</sup></sub>

```
PUT /parts/xsred657rt8
```

```json
{
	"partID": "xsred657rt8",
	"description": "Yoke steering",
	"quantity": 20
}
```

<sub><sup>RESPONSE</sup></sub>
If part is updated successfully:

```json
{
	"partID": "xsred657rt8",
	"description": "Yoke steering",
	"quantity": 20
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

`DELETE /parts/:id`
Deletes the part with the specified id.

<sub><sup>REQUEST</sup></sub>

```
DELETE /parts/xsred657rt8
```

<sub><sup>RESPONSE</sup></sub>

```
HTTPS/1.1 200 OK
```
