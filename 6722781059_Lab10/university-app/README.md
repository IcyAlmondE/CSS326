# University app: Lab 10, Exercise 3 starter

This app works, but it is not safe. Your job is to harden it.

## Run it

1. Load the database first: run all three files of `lab_exercises/database`
   (01, 02, 03, in that order) in MySQL Workbench (as root).
2. In `config/db.js`, put your own root password (for now).
3. In this folder:

   ```
   npm install
   npm start
   ```

   After any change to `.env` or `config/db.js`, stop the server (Ctrl + C) and start it again.

4. Open http://localhost:3000

## What to fix (Exercise 3)

Look for the `TODO (Exercise 3)` comments.

1. Every query must use `?` placeholders (two queries build SQL by hand).
   Check the student id is a positive whole number first (400 otherwise).
2. Connect as `university_app` (from Exercise 2), not root.
3. Move the database settings into a `.env` file and read them with `process.env`.
   Add `.env` to `.gitignore`.
4. A failed request must return a clean message, not the raw database error.

## Try the attack first

Search for `' OR '1'='1` in the page, or open
http://localhost:3000/api/students/1%20OR%201=1/courses
and see what comes back. After your fix, the search returns [] and the student URL answers 400.
