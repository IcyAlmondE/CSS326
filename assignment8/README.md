# CSS326 Lab 8 assignment — Working with Related Data (starter)

Starts from the Lab 6 bookstore app (books CRUD) on a new schema,
`bookstore_lab8`: the same rows as bookstore_lab5, plus one book nobody has
ordered and one customer with no orders.

## Setup

1. Run `bookstore_lab8.sql` in MySQL Workbench (creates and seeds the schema).
2. Set your MySQL password in `db.js` (`database: 'bookstore_lab8'` is
   already set).
3. Install dependencies:
   `npm install`
4. Start the server:
   `node app.js`
5. Open http://localhost:3000

## Testing POST and DELETE

A browser address bar only sends GET. Test POST and DELETE with curl as in the lab sheet
(Section 11), or with a GUI REST client such as Thunder Client (a VS Code extension) or
Postman: choose the method, enter the URL, and send a JSON body with the header
Content-Type: application/json.

## What is given vs what each task writes

- `books.controller.js` / `books.routes.js` — Lab 6's book CRUD, already
  working. Task 2 adds `GET /books/never-ordered` (see the comment in
  `routes/books.routes.js` for where to register it).
- `customers.controller.js` / `customers.routes.js` — `GET /customers` and
  `GET /customers/:id` are already written. Task 4 extends `getOne` with an
  `orders` array; Task 5 adds `POST /:id/orders`; Task 6 adds
  `DELETE /:id/orders/:orderId` (see the TODO comments).
- `orders.controller.js` / `orders.routes.js` — empty routers. Task 1 adds
  `GET /details`; Task 3 adds `GET /view` (after creating the `order_details`
  view).
- `public/` — Lab 6's books page, unchanged. Task 7's customer-orders page is
  your own work.
