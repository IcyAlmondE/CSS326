# Lab 6 Starter — Structuring a Web App

## Setup
1. **Database**: if you don't already have the `university` database and `students` table from an earlier lab, set it up now:
   ```
   mysql -u root -p < schema.sql
   ```
   (This also seeds three sample rows so the list isn't empty on first run. If you already have the table, this won't overwrite your existing data — it only creates the database/table if they're missing.)
2. `npm install`
3. Edit `db.js` with your MySQL password.
4. `npm start` (or `node app.js`), then visit http://localhost:3000

## What's done for you
- `schema.sql` — creates the `university` database and `students` table, with sample data.
- `app.js` — wires everything together (Express, JSON body parsing, static files, the router).
- `db.js` — the shared connection pool.
- `students.controller.js`'s `list` function — a worked example of the pool → query → JSON pattern.
- `students.routes.js`'s `GET /` route — wired to that worked example.
- `public/index.html` and `public/style.css` — match Lab Sheet 06, Sections 10.3–10.4 exactly.

## What you need to build
Follow Lab Sheet 06:
- **Exercise 1** — confirm the refactor: `GET /students` should already work once you fill in `db.js` and wire things up (mostly done — just confirm it runs).
- **Exercise 2** — in `students.controller.js`: `getOne`, `create` (with validation), `update`, `remove`. Then uncomment the matching routes in `students.routes.js`.
- **Exercise 3** — in `public/main.js`: `load()`, the form's submit handler, and the delete click handler.
- **Exercise 4** (if time) — show validation errors in `#message`, and extend `style.css` further.

Each TODO comment in the stub files points to the relevant section of the lab sheet.

## Bonus (optional): editing a row
The deck's "Editing from the Page (1/2)" and "(2/2)" slides walk through adding
an edit button next to delete, using `prompt()` and the PUT route you already
built in Exercise 2. It's not part of the graded exercises — `main.js` has a
`BONUS` comment at each of the two spots it touches if you want to try it once
Exercise 3 is working.

