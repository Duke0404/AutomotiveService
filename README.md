# Automotive Service Centre API

Serves as Backend for an API for an auto repair & servicing shop. Provides data about all orders, employees & vehicle data.

## Endpoints

-[Authentication](#authentication)
	-[Login](#login)
	-[Register](#register)
	-[Employee Login](#Employee Login)
	-[Employee Add](#Employee Add)
-[Profile](#profile)
	-[Get Profile](#Get Profile)
	-[Update Profile](#Update Profile)
-[Customer](#customer)
	-[Get All Customer](#Get Customers)
	-[Get Customer](#Get Customer)
-[Employee](#employee)
	-[Get All Employees](#Get Employees)
	-[Get Employee](#Get Employee)
	-[Update Employee](#Update Employee)
	-[Delete Employee](#Delete Employee)
-[Order](#order)
	-[Get All Orders](#Get Orders)
	-[Get My Orders](#Get My Orders)
	-[Get Order](#Get Order)
	-[Create Order](#Create Order)
	-[Update Order](#Update Order)
	-[Delete Order](#Delete Order)
-[Vehicle](#vehicle)
	-[Get All Vehicles](#Get Vehicles)
	-[Get Vehicle](#Get Vehicle)
	-[Create Vehicle](#Create Vehicle)
	-[Update Vehicle](#Update Vehicle)
	-[Delete Vehicle](#Delete Vehicle)
-[Team](#team)
	-[Get All Teams](#Get Teams)
	-[Get Team](#Get Team)
	-[Create Team](#Create Team)
	-[Update Team](#Update Team)
	-[Delete Team](#Delete Team)

## Authentication

### Login

Logs in a customer and returns a JWT token.

<details>
<summary>POST /login</summary>

> <sub><sup>REQUEST</sup></sub>
>
> ```
> POST /login
> ```
>
> ```json
> { "username": "1234", "password": "1234" }
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
> 	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIwIjoiMSIsIjEiOiIyIiwiMiI6IjMiLCIzIjoiNCIsImV4cCI6MTY4NDU0MDU0NH0.PX_MZScjS-F2r7pDFmvsRv44oasis-5ct8IdXVOpkfI"
> }
> ```
</details>

### Register

Registers a customer and returns a JWT token.

<details>
<summary>POST /register</summary>

> <sub><sup>REQUEST</sup></sub>
>
> ```
> POST /register
> ```
>
> ```json
> {
> 	"username": "12345",
> 	"password": "12345",
> 	"confirmPassword": "12345",
> 	"name": "Test"
> }
> ```
>
> <sub><sup>RESPONSE</sup></sub>
>
> ```
> HTTPS/1.1 201 OK
> Content-Type: application/json
> ```
>
> ```json
> {
> 	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIwIjoiMSIsIjEiOiIyIiwiMiI6IjMiLCIzIjoiNCIsIjQiOiI1IiwiZXhwIjoxNjg0NTQ2NjExfQ.0sGtBixKgFt84g1ywUpqLHbxFSTgWijMPWyooVesWHg"
> }
> ```
</details>

### Employee Login

Logs in an employee and returns a JWT token.

<details>
<summary>POST /employee/login</summary>

> <sub><sup>REQUEST</sup></sub>
>
> ```
> POST /employee/login
> ```
>
> ```json
> {
> 	"username": "dev.das",
> 	"password": "das"
> }
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
> 	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIwIjoiZCIsIjEiOiJlIiwiMiI6InYiLCIzIjoiLiIsIjQiOiJkIiwiNSI6ImEiLCI2IjoicyIsImV4cCI6MTY4NDU0Njg3MX0.GJlV96RgZ-p0c_jEWctRjr0ygOVrOnLOukeItEs-0R8"
> }
> ```
</details>

### Employee Add

Registers a new employee and returns a JWT token.

<details>
<summary>POST /employee/add/</summary>

Access: `Employee Lvl 2`

> <sub><sup>REQUEST</sup></sub>
>
> Requires JWT in `authorization` header
>
> ```
> POST /employee/add
> ```
>
> ```json
> {
> 	"username": "123456",
> 	"password": "123456",
> 	"confirmPassword": "123456",
> 	"name": "Test",
> 	"email": "12345@auto.com",
> 	"phone": 12345678,
> 	"teamId": 1
> }
> ```
>
> <sub><sup>RESPONSE</sup></sub>
>
> ```
> HTTPS/1.1 201 OK
> Content-Type: application/json
> ```
>
> ```json
> {
> 	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIwIjoiMSIsIjEiOiIyIiwiMiI6IjMiLCIzIjoiNCIsIjQiOiI1IiwiNSI6IjYiLCJleHAiOjE2ODQ1NDkwMzl9.NlTaWLtZDFMKgYbmvXkDLgcUSYIOQ23o2v-QKkekI40"
> }Customer
> ```
</details>

## Profile

### Get Profile

Get the details of my profile.

<details>
<summary>GET /profile/</summary>

Access: `Customer`

> <sub><sup>REQUEST</sup></sub>
>
> Requires JWT in `authorization` header
>
> ```
> GET /profile/
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
> { "name": "Devansh Das", "address": null, "username": "duke" }
> ```
</details>

### Update Profile

Update the details of my profile.

<details>
<summary>PATCH /profile/</summary>

Access: `Customer`

> <sub><sup>REQUEST</sup></sub>
>
> Requires JWT in `authorization` header
>
> ```
> PATCH /profile/
> ```
>
> ```json
> {
> 	"name": "Devansh Das",
> 	"address": "Warsaw"
> }
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
> { "name": "Devansh Das", "address": "Warsaw", "username": "duke" }
> ```
</details>

## Customer

### Get Customers

Get a list of all customers.

<details>
<summary>GET /customer/all</summary>

Access: `Employee Lvl 1`

> <sub><sup>REQUEST</sup></sub>
>
> Requires JWT in `authorization` header
>
> ```
> GET /customer/all
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
> 	"count": 2,
> 	"customers": [
> 		{
> 			"customerId": 2,
> 			"customerName": "Sanjay Das",
> 			"customerAddress": "Ghaziabad",
> 			"customerUsername": "sanjaydas"
> 		},
> 		{
> 			"customerId": 32,
> 			"customerName": "1234",
> 			"customerAddress": null,
> 			"customerUsername": "1234"
> 		}
> 	]
> }
> ```
</details>

### Get Customer

Get the details of a specific customer.

<details>
<summary>GET /customer/:customerId</summary>

Access: `Employee Lvl 1`

| Parameter    | Type | Required | Default | Description                   |
| ------------ | ---- | -------- | ------- | ----------------------------- |
| `customerId` | int  | ✔️       |         | The customer ID to be fetched |

> <sub><sup>REQUEST</sup></sub>
>
> Requires JWT in `authorization` header
>
> ```
> GET /customer/1
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
> 	"customerId": 1,
> 	"customerName": "Devansh Das",
> 	"customerAddress": null,
> 	"customerUsername": "duke"
> }
> ```
</details>

## Employee

### Get Employees

Get a list of all employees.

<details>
<summary>GET /employee/all</summary>

Access: `Employee Lvl 1`

> <sub><sup>REQUEST</sup></sub>
>
> Requires JWT in `authorization` header
>
> ```
> GET /employee/all
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
> 	"count": 3,
>     "employees": [
>             "employeeId": 24,
>             "employeeName": "Goofy",
>             "roleLevel": 1,
>             "email": "goofy@auto.com",
>             "phone": 3435456677,
>             "employeeUsername": "goofy",
>             "teamName": "Cleaning Crew 1"
>         },
>         {
>             "employeeId": 42,
>             "employeeName": "Ansh Chaudhary",
>             "roleLevel": 2,
>             "email": "ansh@auto.com",
>             "phone": 6666666666,
>             "employeeUsername": "sage",
>             "teamName": "Top"
>         },
>         {
>             "employeeId": 64,
>             "employeeName": "Test",
>             "roleLevel": 1,
>             "email": "12345@auto.com",
>             "phone": 12345678,
>             "employeeUsername": "123456",
>             "teamName": "Top"
>         }
>     ]
> }
> ```
</details>

### Get Employee

Get the details of a specific employee.

<details>
<summary>GET /employee/:employeeId</summary>

Access: `Employee Lvl 1`

| Parameter    | Type | Required | Default | Description                   |
| ------------ | ---- | -------- | ------- | ----------------------------- |
| `employeeId` | int  | ✔️       |         | The employee ID to be fetched |

> <sub><sup>REQUEST</sup></sub>
>
> Requires JWT in `authorization` header
>
> ```
> GET /employee/24
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
> 	"employeeId": 24,
> 	"employeeName": "Goofy",
> 	"roleLevel": 1,
> 	"email": "goofy@auto.com",
> 	"phone": 3435456677,
> 	"employeeUsername": "goofy",
> 	"teamName": "Cleaning Crew 1"
> }
> ```
</details>

### Update Employee

Update an employee details.

<details>
<summary>PATCH /employee</summary>

Access: `Employee Lvl 2`

> <sub><sup>REQUEST</sup></sub>
>
> Requires JWT in `authorization` header
>
> ```
> PATCH /vehicle/
> ```
>
> ```json
> {
> 	"employeeId": 24,
> 	"employeeName": "Goofy",
> 	"roleLevel": 1,
> 	"email": "goofy.ah@auto.com",
> 	"phone": 3435456677,
> 	"employeeUsername": "goofy",
> 	"teamId": 2
> }
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
> 	"employeeId": 24,
> 	"employeeName": "Goofy",
> 	"roleLevel": 1,
> 	"email": "goofy.ah@auto.com",
> 	"phone": 3435456677,
> 	"employeeUsername": "goofy",
> 	"teamName": "Cleaning Crew 1"
> }
> ```
</details>

### Delete Employee

Delete an employee.

<details>
<summary>DELETE /employee/</summary>

Access: `Employee Lvl 2`

> <sub><sup>REQUEST</sup></sub>
>
> Requires JWT in `authorization` header
>
> ```
> DELETE /employee/
> ```
>
> ```json
> {
> 	"employeeId": 24
> }
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
> 	"employeeId": 24,
> 	"employeeName": "Goofy",
> 	"roleLevel": 1,
> 	"email": "goofy.ah@auto.com",
> 	"phone": 3435456677,
> 	"employeeUsername": "goofy",
> 	"teamName": "Cleaning Crew 1"
> }
> ```
</details>

## Order

### Get Orders

Get a list of all orders.

<details>
<summary>GET /order/all/:limit</summary>

Access: `Employee Lvl 1`

| Parameter | Type | Required | Default | Description                                                  |
| --------- | ---- | -------- | ------- | ------------------------------------------------------------ |
| `amount`  | int  | ❌       | 10      | The amount of orders to fetch in reverse chronological order |
| `open`    | bool | ❌       | false   | Whether to return unfulfilled orders.                        |

> <sub><sup>REQUEST</sup></sub>
>
> Requires JWT in `authorization` header
>
> ```
> GET /order/all/2?open=true
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
> 	"limit": 10,
> 	"count": 2,
> 	"orders": [
> 		{
> 			"orderId": 2,
> 			"numberPlate": "HR23U35",
> 			"orderDate": "2023-05-01T10:45:44.000Z",
> 			"orderOpen": true,
> 			"completionDate": "2023-05-31T10:45:55.000Z",
> 			"description": "Interior Cleaning",
> 			"price": 500,
> 			"paid": false,
> 			"customerName": "Sanjay Das",
> 			"employeeName": "Donald Duck",
> 			"vehicleName": "Figo 1st Gen"
> 		},
> 		{
> 			"orderId": 1,
> 			"numberPlate": "WA4567E",
> 			"orderDate": "2023-05-07T18:52:04.000Z",
> 			"orderOpen": true,
> 			"completionDate": "2023-07-03T18:52:15.000Z",
> 			"description": "Repainting",
> 			"price": 2000,
> 			"paid": true,
> 			"customerName": "Devansh Das",
> 			"employeeName": "Devansh Das",
> 			"vehicleName": "Mustang GT5.0"
> 		}
> 	]
> }
> ```
</details>

### Get My Orders

Get the details of all orders from logged in customer

<details>
<summary>GET /order/my</summary>

Access: `Customer`

> <sub><sup>REQUEST</sup></sub>
>
> Requires JWT in `authorization` header
>
> ```
> GET /order/my
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
> 	"count": 2,
> 	"orders": [
> 		{
> 			"orderId": 21,
> 			"numberPlate": "WA4567E",
> 			"orderDate": "2023-01-01T16:49:56.000Z",
> 			"orderOpen": false,
> 			"completionDate": "2023-01-26T16:50:14.000Z",
> 			"description": "Exterior Cleaning",
> 			"price": 500,
> 			"paid": true,
> 			"customerName": "Devansh Das",
> 			"employeeName": "Donald Duck",
> 			"vehicleName": "Mustang GT5.0"
> 		},
> 		{
> 			"orderId": 1,
> 			"numberPlate": "WA4567E",
> 			"orderDate": "2023-05-07T18:52:04.000Z",
> 			"orderOpen": true,
> 			"completionDate": "2023-07-03T18:52:15.000Z",
> 			"description": "Repainting",
> 			"price": 2000,
> 			"paid": true,
> 			"customerName": "Devansh Das",
> 			"employeeName": "Devansh Das",
> 			"vehicleName": "Mustang GT5.0"
> 		}
> 	]
> }
> ```
</details>

### Get Order

Get the details of a specific order.

<details>
<summary>GET /order/:id</summary>

Access: `Employee Lvl 1`

| Parameter | Type | Required | Default | Description                |
| --------- | ---- | -------- | ------- | -------------------------- |
| `id`      | int  | ✔️       |         | The order ID to be fetched |

> <sub><sup>REQUEST</sup></sub>
>
> Requires JWT in `authorization` header
>
> ```
> GET /order/2
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
> 	"orderId": 2,
> 	"numberPlate": "HR23U35",
> 	"orderDate": "2023-05-01T10:45:44.000Z",
> 	"orderOpen": true,
> 	"completionDate": "2023-05-31T10:45:55.000Z",
> 	"description": "Interior Cleaning",
> 	"price": 500,
> 	"paid": false,
> 	"customerName": "Sanjay Das",
> 	"employeeName": "Donald Duck",
> 	"vehicleName": "Figo 1st Gen"
> }
> ```
</details>

### Create Order

Create a new order.

<details>
<summary>POST /order/</summary>

Access: `Employee Lvl 1`

> <sub><sup>REQUEST</sup></sub>
>
> Requires JWT in `authorization` header
>
> ```
> POST /order/
> ```
>
> ```json
> {
> 	"numberPlate": "WA4567E",
> 	"orderDate": "2023-02-01",
> 	"orderOpen": true,
> 	"completionDate": "2023-05-26",
> 	"description": "Wheel Alignment",
> 	"price": 2000,
> 	"paid": true,
> 	"customerId": 1,
> 	"employeeId": 1,
> 	"vehicleId": 1
> }
> ```
>
> <sub><sup>RESPONSE</sup></sub>
>
> ```
> HTTPS/1.1 201 OK
> Content-Type: application/json
> ```
>
> ```json
> {
> 	"orderId": 41,
> 	"numberPlate": "WA4567E",
> 	"orderDate": "2023-02-01T00:00:00.000Z",
> 	"orderOpen": true,
> 	"completionDate": "2023-05-26T00:00:00.000Z",
> 	"description": "Wheel Alignment",
> 	"price": 2000,
> 	"paid": true,
> 	"customerName": "Devansh Das",
> 	"employeeName": "Devansh Das",
> 	"vehicleName": "Mustang GT5.0"
> }
> ```
</details>

### Update Order

Update a order.

<details>
<summary>PUT /order</summary>

Access: `Employee Lvl 1`

> <sub><sup>REQUEST</sup></sub>
>
> Requires JWT in `authorization` header
>
> ```
> PUT /order
> ```
>
> ```json
> {
> 	"orderId": 41,
> 	"numberPlate": "WA4567E",
> 	"orderDate": "2023-02-01",
> 	"orderOpen": true,
> 	"completionDate": "2023-05-26",
> 	"description": "Wheel Alignment & adjustments",
> 	"price": 2000,
> 	"paid": true,
> 	"customerId": 1,
> 	"employeeId": 1,
> 	"vehicleId": 1
> }
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
> 	"orderId": 41,
> 	"numberPlate": "WA4567E",
> 	"orderDate": "2023-02-01T00:00:00.000Z",
> 	"orderOpen": true,
> 	"completionDate": "2023-05-26T00:00:00.000Z",
> 	"description": "Wheel Alignment & adjustments",
> 	"price": 2000,
> 	"paid": true,
> 	"customerName": "Devansh Das",
> 	"employeeName": "Devansh Das",
> 	"vehicleName": "Mustang GT5.0"
> }
> ```
</details>

### Delete Order

Delete a order.

<details>
<summary>DELETE /order</summary>

Access: `Employee Lvl 1`

> <sub><sup>REQUEST</sup></sub>
>
> Requires JWT in `authorization` header
>
> ```
> DELETE /order
> ```
>
> ```json
> {
> 	"orderId": 41
> }
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
> 	"orderId": 41,
> 	"numberPlate": "WA4567E",
> 	"orderDate": "2023-02-01T00:00:00.000Z",
> 	"orderOpen": true,
> 	"completionDate": "2023-05-26T00:00:00.000Z",
> 	"description": "Wheel Alignment & adjustments",
> 	"price": 2000,
> 	"paid": true,
> 	"customerName": "Devansh Das",
> 	"employeeName": "Devansh Das",
> 	"vehicleName": "Mustang GT5.0"
> }
> ```
</details>

## Vehicle

### Get Vehicles

Get a list of all vehicles.

<details>
<summary>GET /vehicle/all/</summary>

Access: `Employee Lvl 1`

> <sub><sup>REQUEST</sup></sub>
>
> Requires JWT in `authorization` header
>
> ```
> GET /vehicle/all/
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
> 	"count": 3,
> 	"vehicles": [
> 		{
> 			"vehicleId": 1,
> 			"vehicleName": "Mustang GT5.0",
> 			"productionYear": 2018,
> 			"typeName": "Muscle Car",
> 			"manufacturerName": "Ford"
> 		},
> 		{
> 			"vehicleId": 2,
> 			"vehicleName": "Figo 1st Gen",
> 			"productionYear": 2010,
> 			"typeName": "Hatchback",
> 			"manufacturerName": "Ford"
> 		},
> 		{
> 			"vehicleId": 22,
> 			"vehicleName": "Model 3",
> 			"productionYear": 2022,
> 			"typeName": "Sedan",
> 			"manufacturerName": "Tesla"
> 		}
> 	]
> }
> ```
</details>

### Get Vehicle

Get a vehicle.

<details>
<summary>GET /vehicle/:vehicleId</summary>

Access: `Employee Lvl 1`

| Parameter   | Type | Required | Default | Description                  |
| ----------- | ---- | -------- | ------- | ---------------------------- |
| `vehicleId` | int  | ✔️       |         | The vehicle ID to be fetched |

> <sub><sup>REQUEST</sup></sub>
>
> Requires JWT in `authorization` header
>
> ```
> GET /vehicle/41
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
> 	"vehicleId": 41,
> 	"vehicleName": "Model S",
> 	"productionYear": 2020,
> 	"typeName": "Sedan",
> 	"manufacturerName": "Tesla"
> }
> ```
</details>

### Create Vehicle

Create a vehicle.

<details>
<summary>POST /vehicle/</summary>

Access: `Employee Lvl 1`

> <sub><sup>REQUEST</sup></sub>
>
> Requires JWT in `authorization` header
>
> ```
> POST /vehicle/
> ```
>
> ```json
> {
> 	"vehicleName": "Model S",
> 	"productionYear": 2021,
> 	"typeId": 27,
> 	"manufacturerId": 29
> }
> ```
>
> <sub><sup>RESPONSE</sup></sub>
>
> ```
> HTTPS/1.1 201 Created
> Content-Type: application/json
> ```
>
> ```json
> {
> 	"vehicleId": 41,
> 	"vehicleName": "Model S",
> 	"productionYear": 2021,
> 	"typeName": "Sedan",
> 	"manufacturerName": "Tesla"
> }
> ```
</details>

### Update Vehicle

Update a vehicle.

<details>
<summary>PUT /vehicle/</summary>

Access: `Employee Lvl 1`

> <sub><sup>REQUEST</sup></sub>
>
> Requires JWT in `authorization` header
>
> ```
> PUT /vehicle/
> ```
>
> ```json
> {
> 	"vehicleId": 41,
> 	"vehicleName": "Model S",
> 	"productionYear": 2020,
> 	"typeId": 27,
> 	"manufacturerId": 29
> }
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
> 	"vehicleId": 41,
> 	"vehicleName": "Model S",
> 	"productionYear": 2020,
> 	"typeName": "Sedan",
> 	"manufacturerName": "Tesla"
> }
> ```
</details>

### Delete Vehicle

Delete a vehicle.

<details>
<summary>DELETE /vehicle/</summary>

Access: `Employee Lvl 2`

> <sub><sup>REQUEST</sup></sub>
>
> Requires JWT in `authorization` header
>
> ```
> DELETE /vehicle/
> ```
>
> ```json
> {
> 	"vehicleId": 41
> }
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
> 	"vehicleId": 41,
> 	"vehicleName": "Model S",
> 	"productionYear": 2020,
> 	"typeName": "Sedan",
> 	"manufacturerName": "Tesla"
> }
> ```
</details>

## Manufacturer

### Get Manufacturers

Get a list of all manufacturers.

<details>
<summary>GET /manufacturer/all/</summary>

Access: `Employee Lvl 1`

> <sub><sup>REQUEST</sup></sub>
>
> Requires JWT in `authorization` header
>
> ```
> GET /manufacturer/all/
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
> 	"count": 4,
> 	"manufacturers": [
> 		{
> 			"manufacturerId": 1,
> 			"manufacturerName": "Ford",
> 			"manufacturerCountry": "USA",
> 			"inBusiness": true
> 		},
> 		{
> 			"manufacturerId": 2,
> 			"manufacturerName": "Chevrolet",
> 			"manufacturerCountry": "USA",
> 			"inBusiness": true
> 		},
> 		{
> 			"manufacturerId": 3,
> 			"manufacturerName": "Volkswagen",
> 			"manufacturerCountry": "Germany",
> 			"inBusiness": true
> 		},
> 		{
> 			"manufacturerId": 4,
> 			"manufacturerName": "Tata",
> 			"manufacturerCountry": "India",
> 			"inBusiness": true
> 		}
> 	]
> }
> ```
</details>

### Get Manufacturer

Get a manufacturer.

<details>
<summary>GET /manufacturer/:manufacturerId</summary>

Access: `Employee Lvl 1`

| Parameter        | Type | Required | Default | Description                       |
| ---------------- | ---- | -------- | ------- | --------------------------------- |
| `manufacturerId` | int  | ✔️       |         | The manufacturer ID to be fetched |

> <sub><sup>REQUEST</sup></sub>
>
> Requires JWT in `authorization` header
>
> ```
> GET /manufacturer/6
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
> 	"manufacturerId": 6,
> 	"manufacturerName": "Kia",
> 	"manufacturerCountry": "Korea",
> 	"inBusiness": true
> }
> ```
</details>

### Create Manufacturer

Create a manufacturer.

<details>
<summary>POST /manufacturer/</summary>

Access: `Employee Lvl 2`

> <sub><sup>REQUEST</sup></sub>
>
> Requires JWT in `authorization` header
>
> ```
> POST /manufacturer/
> ```
>
> ```json
> {
> 	"manufacturerName": "Subaru",
> 	"manufacturerCountry": "Japan",
> 	"inBusiness": true
> }
> ```
>
> <sub><sup>RESPONSE</sup></sub>
>
> ```
> HTTPS/1.1 201 Created
> Content-Type: application/json
> ```
>
> ```json
> {
> 	"manufacturerId": 41,
> 	"manufacturerName": "Subaru",
> 	"manufacturerCountry": "Japan",
> 	"inBusiness": true
> }
> ```
</details>

### Update Manufacturer

Update a manufacturer.

<details>
<summary>PUT /manufacturer/</summary>

Access: `Employee Lvl 2`

> <sub><sup>REQUEST</sup></sub>
>
> Requires JWT in `authorization` header
>
> ```
> PUT /manufacturer/
> ```
>
> ```json
> {
> 	"manufacturerId": 41,
> 	"manufacturerName": "Subaru",
> 	"manufacturerCountry": "Japan",
> 	"inBusiness": false
> }
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
> 	"manufacturerId": 41,
> 	"manufacturerName": "Subaru",
> 	"manufacturerCountry": "Japan",
> 	"inBusiness": false
> }
> ```
</details>

### Delete Manufacturer

Delete a manufacturer.

<details>
<summary>DELETE /manufacturer/</summary>

Access: `Employee Lvl 2`

> <sub><sup>REQUEST</sup></sub>
>
> Requires JWT in `authorization` header
>
> ```
> DELETE /manufacturer/
> ```
>
> ```json
> {
> 	"manufacturerId": 41
> }
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
> 	"manufacturerId": 41,
> 	"manufacturerName": "Subaru",
> 	"manufacturerCountry": "Japan",
> 	"inBusiness": false
> }
> ```
</details>

## Vehicle Class

### Get Vehicle Classes

Get a list of all vehicle classes.

<details>
<summary>GET /vehicle-class/all</summary>

Access: `Employee Lvl 1`

> <sub><sup>REQUEST</sup></sub>
>
> Requires JWT in `authorization` header
>
> ```
> GET /vehicle-class/all
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
> 	"count": 6,
> 	"types": [
> 		{
> 			"typeId": 1,
> 			"typeName": "Muscle Car",
> 			"typeDescription": "Two-door sports coupes with powerful engines designed for high-performance driving."
> 		},
> 		{
> 			"typeId": 2,
> 			"typeName": "Hatchback",
> 			"typeDescription": "Rear door that swings upward to provide access to the main interior of the car as a cargo area."
> 		},
> 		{
> 			"typeId": 3,
> 			"typeName": "Pickup",
> 			"typeDescription": "Light-duty truck that has an enclosed cabin and a back end made up of a cargo bed."
> 		},
> 		{
> 			"typeId": 21,
> 			"typeName": "SUV",
> 			"typeDescription": "Combines elements of road-going passenger cars with features from off-road vehicles."
> 		},
> 		{
> 			"typeId": 22,
> 			"typeName": "Minivan",
> 			"typeDescription": "Van with passenger seating rows with reconfigurable seats in two or three rows."
> 		},
> 		{
> 			"typeId": 23,
> 			"typeName": "Camper",
> 			"typeDescription": "self-propelled vehicle that provides both transport and sleeping accommodation."
> 		}
> 	]
> }
> ```
</details>

### Get Vehicle Class

Get a vehicle class.

<details>
<summary>GET /vehicle-class/:typeId</summary>

Access: `Employee Lvl 1`

| Parameter | Type | Required | Default | Description                        |
| --------- | ---- | -------- | ------- | ---------------------------------- |
| `typeId`  | int  | ✔️       |         | The Vehicle Class ID to be fetched |

> <sub><sup>REQUEST</sup></sub>
>
> Requires JWT in `authorization` header
>
> ```
> GET /vehicle-class/2
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
> 	"typeId": 2,
> 	"typeName": "Hatchback",
> 	"typeDescription": "Rear door that swings upward to provide access to the main interior of the car as a cargo area."
> }
> ```
</details>

### Create Vehicle Class

Create a vehicle class.

<details>
<summary>POST /vehicle-class/</summary>

Access: `Employee Lvl 2`

> <sub><sup>REQUEST</sup></sub>
>
> Requires JWT in `authorization` header
>
> ```
> POST /vehicle-class/
> ```
>
> ```json
> {
> 	"typeName": "Truck",
> 	"typeDescription": "Large vehicle designed to transport cargo & carry specialized payloads."
> }
> ```
>
> <sub><sup>RESPONSE</sup></sub>
>
> ```
> HTTPS/1.1 201 Created
> Content-Type: application/json
> ```
>
> ```json
> {
> 	"typeId": 41,
> 	"typeName": "Truck",
> 	"typeDescription": "Large vehicle designed to transport cargo & carry specialized payloads."
> }
> ```
</details>

### Update Vehicle Class

Update a vehicle class.

<details>
<summary>PUT /vehicle-class/</summary>

Access: `Employee Lvl 2`

> <sub><sup>REQUEST</sup></sub>
>
> Requires JWT in `authorization` header
>
> ```
> PUT /vehicle-class/
> ```
>
> ```json
> {
> 	"typeId": 41,
> 	"typeName": "Truck",
> 	"typeDescription": "Large vehicle designed to transport cargo."
> }
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
> 	"typeId": 41,
> 	"typeName": "Truck",
> 	"typeDescription": "Large vehicle designed to transport cargo."
> }
> ```
</details>

### Delete Vehicle Class

Delete a vehicle class.

<details>
<summary>DELETE /vehicle-class/</summary>

Access: `Employee Lvl 2`

> <sub><sup>REQUEST</sup></sub>
>
> Requires JWT in `authorization` header
>
> ```
> DELETE /vehicle-class/
> ```
>
> ```json
> {
> 	"typeId": 41
> }
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
> 	"typeId": 41,
> 	"typeName": "Truck",
> 	"typeDescription": "Large vehicle designed to transport cargo."
> }
> ```
</details>

## Team

### Get Teams

Get a list of all Teams.

<details>
<summary>GET /team/all</summary>

Access: `Employee Lvl 1`

> <sub><sup>REQUEST</sup></sub>
>
> Requires JWT in `authorization` header
>
> ```
> GET /team/all
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
> 	"count": 3,
> 	"teams": [
> 		{ "teamId": 1, "teamName": "Top", "teamLeader": "Devansh Das", "purpose": "Supervision" },
> 		{
> 			"teamId": 3,
> 			"teamName": "Cleaning Crew 3",
> 			"teamLeader": "Devansh Das",
> 			"purpose": "Parts deep cleaning"
> 		},
> 		{
> 			"teamId": 2,
> 			"teamName": "Cleaning Crew 1",
> 			"teamLeader": "Donald Duck",
> 			"purpose": "Interior & exterior cleaning"
> 		}
> 	]
> }
> ```
</details>

### Create Team

Create a team.

<details>
<summary>POST /team/</summary>

Access: `Employee Lvl 3`

> <sub><sup>REQUEST</sup></sub>
>
> Requires JWT in `authorization` header
>
> ```
> POST /team/
> ```
>
> ```json
> {
> 	"teamId": 400,
> 	"teamName": "HR",
> 	"teamLeaderId": 1,
> 	"purpose": "Hiring"
> }
> ```
>
> <sub><sup>RESPONSE</sup></sub>
>
> ```
> HTTPS/1.1 201 Created
> Content-Type: application/json
> ```
>
> ```json
> {
> 	"teamId": 400,
> 	"teamName": "HR",
> 	"teamLeaderId": 1,
> 	"purpose": "Hiring"
> }
> ```
</details>

### Update Team

Update a team.

<details>
<summary>PUT /team/</summary>

Access: `Employee Lvl 3`

> <sub><sup>REQUEST</sup></sub>
>
> Requires JWT in `authorization` header
>
> ```
> PUT /team/
> ```
>
> ```json
> {
> 	"teamId": 400,
> 	"teamName": "HR",
> 	"teamLeaderId": 1,
> 	"purpose": "Hiring employees"
> }
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
> 	"teamId": 400,
> 	"teamName": "HR",
> 	"teamLeaderId": 1,
> 	"purpose": "Hiring employees"
> }
> ```
</details>

### Delete Team

Delete a team.

<details>
<summary>DELETE /team/</summary>

Access: `Employee Lvl 3`

> <sub><sup>REQUEST</sup></sub>
>
> Requires JWT in `authorization` header
>
> ```
> DELETE /team/
> ```
>
> ```json
> {
> 	"teamId": 400
> }
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
> 	"teamId": 400,
> 	"teamName": "HR",
> 	"teamLeaderId": 1,
> 	"purpose": "Hiring employees"
> }
> ```
</details>