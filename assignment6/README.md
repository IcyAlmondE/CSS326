# Lab Assignment 6 Starter: Structuring a Web App (bookstore)

## Setup
1. `npm install`
2. Write `db.js` (Task 1) for the `bookstore_lab5` database from the Lab 5 assignment
   (`books`, `customers`, `orders`). `bookstore_lab5.sql` next to this folder creates and seeds it.
3. `npm start` (or `node app.js`), then visit http://localhost:3000

## What's done for you
- `app.js` — wires everything together (Express, JSON body parsing, static files, the router).
- `db.js` — a stub with the shape of the pool; writing it is Task 1.
- `books.controller.js`'s `list` function and the matching `GET /` route — a worked example of the pool → query → JSON pattern to follow for the rest.

## What you need to build (see the assignment for exact point values)
1. Write the pool in `db.js`, then confirm `GET /books` works (the route is already wired).
2. `getOne` in `books.controller.js`, returning 404 when the id is unknown.
3. `create`, validating `title` and `price` before inserting.
4. `update`, applying a PUT to price and/or stock.
5. `remove`, deleting by id. Test it on the book you add in Task 3: every seed book has an order, so MySQL refuses to delete those (500).
6. `public/index.html`, `public/style.css` and the list/add half of `public/main.js`.
7. The delete half of `public/main.js` (delete the book you added in Task 3).
8. A short written answer (submit separately, not in code).

Every TODO comment in the stub files points to the task it belongs to. The
`list` example (task 1's pattern) and Lab Sheet 06 Sections 10.3–10.4 and
10.8 show the shape each piece should take, just adapted from `students`
to `books`.
