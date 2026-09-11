-- schema.sql
-- Run this once to set up the database Lab 6 expects.
-- In a terminal:  mysql -u root -p < schema.sql
-- Or paste it into MySQL Workbench and execute it there.

CREATE DATABASE IF NOT EXISTS university;
USE university;

CREATE TABLE IF NOT EXISTS students (
  id    INT AUTO_INCREMENT PRIMARY KEY,
  name  VARCHAR(100) NOT NULL,
  major VARCHAR(100) NOT NULL,
  year  INT NOT NULL
);

-- A few sample rows so GET /students returns something right away.
INSERT INTO students (name, major, year) VALUES
  ('Ada Lovelace',  'Computer Science', 2),
  ('Alan Turing',   'Mathematics',      3),
  ('Grace Hopper',  'Computer Science', 4);
