# CSS326 Lab 8 — Working with Related Data (starter)

Starter for the students / courses / enrolments schema: the same students as
Lab 5, one more course, and an enrolments junction table with an optional
grade and at most one row per student and course.

## Setup

1. Run `lab_8.sql` in MySQL Workbench (creates and seeds the `lab_8` schema).
2. Set your MySQL password in `db.js` (`database: 'lab_8'` is already set).
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

## What to write

- `controllers/students.controller.js` — `exports.courses` (Exercise 2),
  extend `exports.getOne` to nest a `courses` array (Exercise 3), and
  `exports.enrol` / `exports.unenrol` (Exercise 4).
- `routes/students.routes.js` — the three nested routes, where marked.
- `public/main.js` — `show()`, the Enrol form's submit handler, and the
  remove-button click handler (Exercise 5).
