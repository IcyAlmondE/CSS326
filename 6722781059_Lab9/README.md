# CSS326 Lab 9 – Transactions (in-class exercises starter)

## 1. Set up the database (MySQL Workbench)
1. Open `sql/lab_9.sql` and execute it. It creates a fresh `lab_9` database with
   `students`, `courses` and `enrolments` (the same tables and rows as `lab_8`), including the UNIQUE key and foreign keys that Exercise 4 relies on.
2. **Exercise 1** – open `sql/exercise1.sql` and complete the TODOs step by step.
   (The `seats` column is added by *you* in Step 1.)

## 2. Run the API
```bash
npm install
npm run dev                 # http://localhost:3000
```
Before starting, open `db.js` and set `user` / `password` to your own MySQL login.
Open **http://localhost:3000** in your browser for the front-end: course seats, an Enrol/Cancel panel for one student (Exercises 2 & 3), a *Last-seat race* button that sends an enrol request for every student at once, and a log of every response.
You can also test with `requests.http` (VS Code REST Client) or Postman.

| Method | Route | Purpose |
|---|---|---|
| GET | `/courses` | list courses and free seats |
| GET | `/students` | list students (used by the front-end) |
| GET | `/students/:id/courses` | a student's courses |
| POST | `/students/:id/courses` body `{"course_id": 3}` | **Exercise 2** – enrol |
| DELETE | `/students/:id/courses/:courseId` | **Exercise 3** – un-enrol |

The other Lab 8 routes (`GET /students/:id`, `POST`, `PUT` and `DELETE /students`) are unchanged.

## 3. Exercises
* **Exercise 2** – rewrite `enrol` in `controllers/students.controller.js` as a transaction
  (getConnection → beginTransaction → guarded UPDATE `... AND seats > 0` → INSERT → commit;
  rollback in catch; release in finally). 201 / 409 / 500.
  To see the seats run out, first give a course only a couple of seats in Workbench:
  `UPDATE courses SET seats = 2 WHERE id = 4;` then fire 5 simultaneous requests:
  `npm run race -- 4 1 5` (or press the race button in the front-end). Try it **before** and **after** your change and compare the seats.
  To run the race again, reset course 4 first (in Workbench):
  `DELETE FROM enrolments WHERE course_id = 4;` and `UPDATE courses SET seats = 2 WHERE id = 4;`
* **Exercise 3** – rewrite `unenrol`, which deletes the enrolment but never gives the seat back
  (DELETE + give the seat back in one transaction; 404 if there was nothing to delete, else 204).
* **Exercise 4** – make the second statement fail (student 999, or a duplicate
  enrolment) and show the seats count is unchanged. Use a course that still has free
  seats (course 3 in `requests.http`), not the course you raced.
