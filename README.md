# Automotive Service Centre API

Serves as Backend for an API for an auto repair & servicing shop. Provides data about all orders, employees & vehicle data.

## Endpoints

-[Authentication](#authentication) -[Login](#login) -[Register](#register) -[Orders](#orders) -[Get Orders](#get-orders) -[Get Order](#get-order) -[Create Order](#create-order) -[Update Order](#update-order) -[Delete Order](#delete-order)

## Authentication

### Login

Logs in a customer and returns a JWT token.

<details>
<summary>POST /auth/login</summary>

> <sub><sup>REQUEST</sup></sub>
>
> ```
> POST /auth/login
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

### Register

Registers a customer and returns a JWT token.

<details>
<summary>POST /auth/register</summary>

> <sub><sup>REQUEST</sup></sub>
>
> ```
> POST /auth/register
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

### Employee Login

Logs in an employee and returns a JWT token.

<details>
<summary>POST /auth/employee/login</summary>

> <sub><sup>REQUEST</sup></sub>
>
> ```
> POST /auth/employee/login
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

### Employee Add

Registers a new employee and returns a JWT token.

<details>
<summary>POST /auth/employee/add/</summary>

Access: `Employee Lvl 2`

> <sub><sup>REQUEST</sup></sub>
>
> Requires JWT in `authorization` header
>
> ```
> POST /auth/employee/add
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
> }
> ```

## Orders

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
> 	"limit": 2,
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

### Create Order

Create a new order.

<details>
<summary>POST /order/</summary>

Access: `Employee Lvl 2`

> <sub><sup>REQUEST</sup></sub>
>
> Requires JWT in `authorization` header
>
> ```
> POST /order/
> ```
>
> ```json
>
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
> 	"limit": 2,
> 	"orders": [
> 		{
> 			"orderId": 2,
> 			"customerName": "HR23U35",
> 			"employeeAssigned": "2023-05-01T10:45:44.000Z",
> 			"employeeEmail": "0",
> 			"numberPlate": "2023-05-31T10:45:55.000Z",
> 			"vehicleManufacturer": "Interior Cleaning",
> 			"vehicleModel": 500,
> 			"vehicleType": "0",
> 			"vehicleYear": "Sanjay Das",
> 			"orderDate": "Donald Duck",
> 			"orderOpen": true,
> 			"orderPaid": true
> 		},
> 		{
> 			"orderId": 1,
> 			"customerName": "WA4567E",
> 			"employeeAssigned": "2023-05-07T18:52:04.000Z",
> 			"employeeEmail": "0",
> 			"numberPlate": "2023-07-03T18:52:15.000Z",
> 			"vehicleManufacturer": "Repainting",
> 			"vehicleModel": 2000,
> 			"vehicleType": "1",
> 			"vehicleYear": "Devansh Das",
> 			"orderDate": "Devansh Das",
> 			"orderOpen": true,
> 			"orderPaid": true
> 		}
> 	]
> }
> ```

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
> {"count":3,"teams":[{"teamId":1,"teamName":"Top","teamLeader":"Devansh Das","purpose":"Supervision"},{"teamId":3,"teamName":"Cleaning Crew 3","teamLeader":"Devansh Das","purpose":"Parts deep cleaning"},{"teamId":2,"teamName":"Cleaning Crew 1","teamLeader":"Donald Duck","purpose":"Interior & exterior cleaning"}]}
> ```

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
>     "teamId": 400,
>     "teamName": "HR",
>     "teamLeaderId": 1,
>     "purpose": "Hiring"
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
>     "teamId": 400,
>     "teamName": "HR",
>     "teamLeaderId": 1,
>     "purpose": "Hiring"
> }
> ```

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
>     "teamId": 400,
>     "teamName": "HR",
>     "teamLeaderId": 1,
>     "purpose": "Hiring employees"
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
>     "teamId": 400,
>     "teamName": "HR",
>     "teamLeaderId": 1,
>     "purpose": "Hiring employees"
> }
> ```

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
>     "teamId": 400
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
>     "teamId": 400,
>     "teamName": "HR",
>     "teamLeaderId": 1,
>     "purpose": "Hiring employees"
> }
> ```
