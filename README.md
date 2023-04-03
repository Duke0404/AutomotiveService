# Automotive Service Centre API

Serves as Backend for an API for an auto repair & servicing shop. Provides data about all orders, employees, car-part inventory & equiptment.

# Endpoints

-   [Authentication](#authentication)
    -   [Login](#login)
    -   [Register](#register)
-   [Orders](#orders)
    -   [Get Orders](#get-orders)
    -   [Get Order](#get-order)
    -   [Create Order](#create-order)
    -   [Update Order](#update-order)
    -   [Delete Order](#delete-order)

## Authentication

### Login

Logs in a user and returns a JWT token.

<details>
<summary>POST /api/auth/login</summary>

> **Correct usage**
>
> <sub><sup>REQUEST</sup></sub>
>
> ```
> POST /api/auth/login
> ```
>
> ```json
> { "username": "bugs", "password": "WhatsUpDoc!" }
> ```
>
> <sub><sup>RESPONSE</sup></sub>
>
> ```
> HTTPS/1.1 200 OK
> Content-Type: application/json
> ```
>
> ```json
> {
> 	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIwIjoidSIsIjEiOiJzIiwiMiI6ImUiLCIzIjoiciIsImV4cCI6MTY4MDQzOTkzMn0.7oY-0MwLt7fSOf9dn1FZDEYN312UHfIiQoiBYGpNILw"
> }
> ```

---

> **If username or password is missing**
>
> <sub><sup>REQUEST</sup></sub>
>
> ```
> POST /api/auth/login
> ```
>
> ```json
> { "username": "spongbob" }
> ```
>
> <sub><sup>RESPONSE</sup></sub>
>
> ```
> HTTPS/1.1 400 Bad Request
> Content-Type: application/json
> ```
>
> ```json
> { "error": "Missing credentials" }
> ```

> **If user does not exist or password is incorrect**
>
> <sub><sup>REQUEST</sup></sub>
>
> ```
> POST /api/auth/login
> ```
>
> ```json
> { "username": "mickey", "password": "mouse" }
> ```
>
> <sub><sup>RESPONSE</sup></sub>
>
> ```
> HTTPS/1.1 401 Unauthorized
> Content-Type: application/json
> ```
>
> ```json
> { "error": "Invalid credentials" }
> ```

</details>

### Register

Registers a new user, logs them in, and returns a JWT token.

<details>
<summary>POST /api/auth/register</summary>

> **Correct usage**
>
> <sub><sup>REQUEST</sup></sub>
>
> ```
> POST /api/auth/register
> ```
>
> ```json
> { "username": "homer", "password": "TheSimpsons", "confirmPassword": "TheSimpsons" }
> ```
>
> <sub><sup>RESPONSE</sup></sub>
>
> ```
> HTTPS/1.1 200 OK
> Content-Type: application/json
> ```
>
> ```json
> {
> 	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIwIjoidSIsIjEiOiJzIiwiMiI6ImUiLCIzIjoiciIsImV4cCI6MTY4MDQzOTkzMn0.7oY-0MwLt7fSOf9dn1FZDEYN312UHfIiQoiBYGpNILw"
> }
> ```

---

> **If username, password or password confirmation is missing**
>
> <sub><sup>REQUEST</sup></sub>
>
> ```
> POST /api/auth/register
> ```
>
> ```json
> { "username": "scoobydoo" }
> ```
>
> <sub><sup>RESPONSE</sup></sub>
>
> ```
> HTTPS/1.1 400 Bad Request
> Content-Type: application/json
> ```
>
> ```json
> { "error": "Missing credentials" }
> ```

> **If password & password confirmation do not match**
>
> <sub><sup>REQUEST</sup></sub>
>
> ```
> POST /api/auth/register
> ```
>
> ```json
> { "username": "tom", "password": "tomcat", "confirmPassword": "F-14" }
> ```
>
> <sub><sup>RESPONSE</sup></sub>
>
> ```
> HTTPS/1.1 400 Bad Request
> Content-Type: application/json
> ```
>
> ```json
> { "error": "Passwords don't match" }
> ```

> **If user already exists**
>
> <sub><sup>REQUEST</sup></sub>
>
> ```
> POST /api/auth/register
> ```
>
> ```json
> { "username": "jerry", "password": "mousekevitch", "confirmPassword": "mousekevitch" }
> ```
>
> <sub><sup>RESPONSE</sup></sub>
>
> ```
> HTTPS/1.1 409 Conflict
> Content-Type: application/json
> ```
>
> ```json
> { "error": "User already exists" }
> ```

</details>

## Orders

### Get Orders

Get a list of orders.

<details>
<summary>GET /api/orders/:amount</summary>

| Parameter | Type | Required | Default | Description                                                  |
| --------- | ---- | -------- | ------- | ------------------------------------------------------------ |
| `amount`  | int  | ❌       | 5       | The amount of orders to fetch in reverse chronological order |
| `open`    | bool | ❌       | false   | Whether to return unfulfilled orders.                        |

> **Correct usage** > <sub><sup>REQUEST</sup></sub>
>
> ```
> GET /api/orders/2?open=true
> ```
>
> <sub><sup>RESPONSE</sup></sub>
>
> ```
> HTTPS/1.1 200 OK
> Content-Type: application/json
> ```
>
> ```json
> {
> 	"amount": 2,
> 	"orders": [
> 		{
> 			"orderId": 15678,
> 			"customerName": "Donald Duck",
> 			"customerPhone": 5555555555,
> 			"employeeAssigned": "Mickey Mouse",
> 			"employeeEmail": "mick.m@auto.com",
> 			"numberPlate": "ABC123",
> 			"vehicleManufacturer": "Ford",
> 			"vehicleModel": "Mustang",
> 			"vehicleType": "Muscle Car",
> 			"vehicleYear": 1969,
> 			"orderDate": "2023-04-01 13:00:00",
> 			"orderOpen": true,
> 			"completionDate": "2023-04-20 17:00:00",
> 			"orderDescription": "Engine replacement required.",
> 			"orderPrice": 10000,
> 			"orderPaid": false
> 		},
> 		{
> 			"orderId": 15679,
> 			"customerName": "Minnie Mouse",
> 			"customerPhone": 5555555555,
> 			"employeeAssigned": "Mickey Mouse",
> 			"employeeEmail": "mick.m@auto.com",
> 			"numberPlate": "677GUH",
> 			"vehicleManufacturer": "Subaru",
> 			"vehicleModel": "Impreza",
> 			"vehicleType": "Hatchback",
> 			"vehicleYear": 2018,
> 			"orderDate": "2023-03-29 10:00:00",
> 			"orderOpen": true,
> 			"completionDate": "2023-04-05 17:00:00",
> 			"orderDescription": "Oil change required.",
> 			"orderPrice": 100,
> 			"orderPaid": false
> 		}
> 	]
> }
> ```

### Get Order

Get the details of a specific order.

<details>
<summary>GET /api/orders/:id</summary>

| Parameter | Type | Required | Default | Description                |
| --------- | ---- | -------- | ------- | -------------------------- |
| `id`      | int  | ✔️       |         | The order ID to be fetched |

> **Correct usage**
>
> <sub><sup>REQUEST</sup></sub>
>
> ```
> GET /api/orders/15679
> ```
>
> <sub><sup>RESPONSE</sup></sub>
>
> ```
> HTTPS/1.1 200 OK
> Content-Type: application/json
> ```
>
> ```json
> {
> 	"orderId": 15679,
> 	"customerName": "Minnie Mouse",
> 	"customerPhone": 5555555555,
> 	"employeeAssigned": "Mickey Mouse",
> 	"employeeEmail": "mick.m@auto.com",
> 	"numberPlate": "677GUH",
> 	"vehicleManufacturer": "Subaru",
> 	"vehicleModel": "Impreza",
> 	"vehicleType": "Hatchback",
> 	"vehicleYear": 2018,
> 	"orderDate": "2023-03-29 10:00:00",
> 	"orderOpen": true,
> 	"completionDate": "2023-04-05 17:00:00",
> 	"orderDescription": "Oil change required.",
> 	"orderPrice": 100,
> 	"orderPaid": false
> }
> ```

---

</details>
