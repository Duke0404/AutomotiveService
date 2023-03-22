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

### Order
Endpoints related to manipulating data related to a specific order.

```GET /order/:id```
Returns the order with the specified id.

```POST /order```
Creates a new order.

```PUT /order/:id```
Updates the order with the specified id.

```DELETE /order/:id```
Deletes the order with the specified id.

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
