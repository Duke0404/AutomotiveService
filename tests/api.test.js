import dotenv from "dotenv"
import supertest from "supertest"

import { generateJWT } from "../utilities/jsonWebToken.js"

dotenv.config()
const baseUrl = "http://localhost:" + (process.env.PORT || 3000)

const customerAuthObject = { username: "jest", password: "test" }
const employee1AuthObject = { username: "jest1", password: "test" }
// const employee2AuthObject = { username: "jest2", password: "test" }
// const employee3AuthObject = { username: "jest3", password: "test" }

const customerJWT = generateJWT(customerAuthObject.username, process.env.JWT_SECRET, 12)
const employee1JWT = generateJWT(employee1AuthObject.username, process.env.JWT_SECRET, 12)
// const employee2JWT = generateJWT(employee2AuthObject.username, process.env.JWT_SECRET, 12)
// const employee3JWT = generateJWT(employee3AuthObject.username, process.env.JWT_SECRET, 12)

describe("GET /", () => {
	it("should return 200 OK", async () =>
		await supertest(baseUrl).get("/").expect(200).expect("Hello World!"))
})

// Authorization
describe("POST /login", () => {
	const url = "/login"

	it("should return 200 OK", async () =>
		await supertest(baseUrl).post(url).send(customerAuthObject).expect(200))

	it("should return 401 Unauthorized", async () =>
		await supertest(baseUrl)
			.post(url)
			.send({ ...customerAuthObject, password: "wrong" })
			.expect(401))
})

describe("POST /employee/login", () => {
	const url = "/employee/login"

	it("should return 200 OK", async () =>
		await supertest(baseUrl).post(url).send(employee1AuthObject).expect(200))

	it("should return 401 Unauthorized", async () =>
		await supertest(baseUrl)
			.post(url)
			.send({ ...employee1AuthObject, password: "wrong" })
			.expect(401))
})

// Customer
describe("GET /customer/all", () => {
	const url = "/customer/all"

	it("should return 200 OK", async () =>
		await supertest(baseUrl).get(url).set("Authorization", employee1JWT).expect(200))

	it("should return 401 Unauthorized", async () => await supertest(baseUrl).get(url).expect(401))
})

describe("GET /customer/:id", () => {
	const url = "/customer/42"

	it("should return 200 OK", async () =>
		await supertest(baseUrl).get(url).set("Authorization", employee1JWT).expect(200).expect({
			customerId: 42,
			customerName: "Jest Test",
			customerAddress: "Jest Test Address",
			customerUsername: "jest"
		}))

	it("should return 401 Unauthorized", async () => await supertest(baseUrl).get(url).expect(401))
})

// Employee
describe("GET /employee/all", () => {
	const url = "/employee/all"

	it("should return 200 OK", async () =>
		await supertest(baseUrl).get(url).set("Authorization", employee1JWT).expect(200))

	it("should return 401 Unauthorized", async () => await supertest(baseUrl).get(url).expect(401))
})

describe("GET /employee/:id", () => {
	const url = "/employee/67"

	it("should return 200 OK", async () =>
		await supertest(baseUrl).get(url).set("Authorization", employee1JWT).expect(200).expect({
			employeeId: 67,
			employeeName: "Jest Test 3",
			roleLevel: 3,
			email: "jest@auto.com",
			phone: 666666,
			employeeUsername: "jest3",
			teamName: "Top"
		}))

	it("should return 401 Unauthorized", async () => await supertest(baseUrl).get(url).expect(401))
})

// Manufacturer
describe("GET /manufacturer/all", () => {
	const url = "/manufacturer/all"

	it("should return 200 OK", async () =>
		await supertest(baseUrl).get(url).set("Authorization", employee1JWT).expect(200))

	it("should return 401 Unauthorized", async () => await supertest(baseUrl).get(url).expect(401))
})

describe("GET /manufacturer/:id", () => {
	const url = "/manufacturer/1"

	it("should return 200 OK", async () =>
		await supertest(baseUrl).get(url).set("Authorization", employee1JWT).expect(200).expect({
			manufacturerId: 1,
			manufacturerName: "Ford",
			manufacturerCountry: "USA",
			inBusiness: true
		}))

	it("should return 401 Unauthorized", async () => await supertest(baseUrl).get(url).expect(401))
})

// Order
describe("GET /order/all", () => {
	const url = "/order/all"

	it("should return 200 OK", async () =>
		await supertest(baseUrl).get(url).set("Authorization", employee1JWT).expect(200))

	it("should return 200 OK", async () =>
		await supertest(baseUrl + "?open=true")
			.get(url)
			.set("Authorization", employee1JWT)
			.expect(200))

	it("should return 401 Unauthorized", async () => await supertest(baseUrl).get(url).expect(401))
})

describe("GET /order/my", () => {
	const url = "/order/my"

	it("should return 200 OK", async () =>
		await supertest(baseUrl)
			.get(url)
			.set("Authorization", customerJWT)
			.expect(200)
			.expect({ count: 0, orders: [] }))

	it("should return 401 Unauthorized", async () => await supertest(baseUrl).get(url).expect(401))
})

describe("GET /order/:id", () => {
	const url = "/order/1"

	it("should return 200 OK", async () =>
		await supertest(baseUrl).get(url).set("Authorization", employee1JWT).expect(200).expect({
			orderId: 1,
			numberPlate: "WA4567E",
			orderDate: "2023-05-07T18:52:04.000Z",
			orderOpen: true,
			completionDate: "2023-07-03T18:52:15.000Z",
			description: "Repainting",
			price: 2000,
			paid: true,
			customerName: "Devansh Das",
			employeeName: "Devansh Das",
			vehicleName: "Mustang GT5.0"
		}))

	it("should return 401 Unauthorized", async () => await supertest(baseUrl).get(url).expect(401))
})

// Profile
describe("GET /profile", () => {
	const url = "/profile"

	it("should return 200 OK", async () =>
		await supertest(baseUrl).get(url).set("Authorization", customerJWT).expect(200).expect({
			name: "Jest Test",
			address: "Jest Test Address",
			username: "jest"
		}))

	it("should return 401 Unauthorized", async () => await supertest(baseUrl).get(url).expect(401))
})

// Team
describe("GET /team/all", () => {
	const url = "/team/all"

	it("should return 200 OK", async () =>
		await supertest(baseUrl).get(url).set("Authorization", employee1JWT).expect(200))

	it("should return 401 Unauthorized", async () => await supertest(baseUrl).get(url).expect(401))
})

// Vehicle Class
describe("GET /vehicle-class/all", () => {
	const url = "/vehicle-class/all"

	it("should return 200 OK", async () =>
		await supertest(baseUrl).get(url).set("Authorization", employee1JWT).expect(200))

	it("should return 401 Unauthorized", async () => await supertest(baseUrl).get(url).expect(401))
})

describe("GET /vehicle-class/:id", () => {
	const url = "/vehicle-class/1"

	it("should return 200 OK", async () =>
		await supertest(baseUrl).get(url).set("Authorization", employee1JWT).expect(200).expect({
			typeId: 1,
			typeName: "Muscle Car",
			typeDescription:
				"Two-door sports coupes with powerful engines designed for high-performance driving."
		}))

	it("should return 401 Unauthorized", async () => await supertest(baseUrl).get(url).expect(401))
})

// Vehicle
describe("GET /vehicle/all", () => {
	const url = "/vehicle/all"

	it("should return 200 OK", async () =>
		await supertest(baseUrl).get(url).set("Authorization", employee1JWT).expect(200))

	it("should return 401 Unauthorized", async () => await supertest(baseUrl).get(url).expect(401))
})

describe("GET /vehicle/:id", () => {
	const url = "/vehicle/1"

	it("should return 200 OK", async () => {
		const res = await supertest(baseUrl).get(url).set("Authorization", employee1JWT).expect(200)
		expect(res.body).toEqual({
			vehicleId: 1,
			vehicleName: "Mustang GT5.0",
			productionYear: 2018,
			typeName: "Muscle Car",
			manufacturerName: "Ford"
		})
	})

	it("should return 401 Unauthorized", async () => await supertest(baseUrl).get(url).expect(401))
})
