-- CSS326 -- lab_9 schema, seeded for the Lab 9 exercises
-- students, courses and enrolments are lab_8's tables and rows, unchanged, so
-- every Lab 8 route keeps working. The UNIQUE key (a student cannot enrol in
-- the same course twice) and the two foreign keys (an enrolment must point to
-- a real student and a real course) are what Exercise 4 relies on: they make
-- the failing INSERT real. The seats column is NOT created here - you add it
-- yourself in Exercise 1 with ALTER TABLE.
--
-- A fresh schema for Lab 9, named for the lab that owns it - the same
-- convention as lab_3, lab_5 and lab_8. It does not replace lab_8. Running
-- this file again resets everything, including removing the seats column.

CREATE DATABASE IF NOT EXISTS lab_9;
USE lab_9;

DROP VIEW  IF EXISTS enrolment_details;
DROP TABLE IF EXISTS enrolments;
DROP TABLE IF EXISTS students;
DROP TABLE IF EXISTS courses;

CREATE TABLE students (
  id    INT AUTO_INCREMENT PRIMARY KEY,
  name  VARCHAR(100) NOT NULL,
  major VARCHAR(100) NOT NULL,
  year  INT NOT NULL
);

CREATE TABLE courses (
  id     INT AUTO_INCREMENT PRIMARY KEY,
  code   VARCHAR(20) NOT NULL,
  title  VARCHAR(150) NOT NULL,
  credits INT NOT NULL DEFAULT 3
);

CREATE TABLE enrolments (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT NOT NULL,
  course_id  INT NOT NULL,
  grade      VARCHAR(2),
  UNIQUE KEY one_enrolment (student_id, course_id),
  FOREIGN KEY (student_id) REFERENCES students(id),
  FOREIGN KEY (course_id)  REFERENCES courses(id)
);

INSERT INTO students (name, major, year) VALUES
  ('Somchai Prasert',   'Computer Science', 2),
  ('Suda Charoen',      'Data Science',     3),
  ('Anan Wattana',      'Computer Science', 1),
  ('Nicha Boonmee',     'Data Science',     2),
  ('Kittipong Saelee',  'Software Engineering', 4);

INSERT INTO courses (code, title, credits) VALUES
  ('CSS326', 'Database Programming Laboratory', 3),
  ('CSS201', 'Data Structures and Algorithms',  3),
  ('CSS310', 'Introduction to Data Science',    3),
  ('CSS331', 'Computer Networks',               3);

-- Suda takes three courses, Nicha and Kittipong none, and nobody takes
-- Computer Networks, so there is always a student with no enrolments and a
-- course nobody has taken.
INSERT INTO enrolments (student_id, course_id, grade) VALUES
  (1, 1, 'A'),
  (1, 2, 'B+'),
  (2, 1, 'A'),
  (2, 2, 'B'),
  (2, 3, 'A'),
  (3, 2, NULL);

-- Exercise 4
SELECT seats FROM courses WHERE id = 3;

START TRANSACTION;
UPDATE courses SET seats = seats - 1 WHERE id = 3;
INSERT INTO enrolments (student_id, course_id) VALUES (1, 1);
ROLLBACK;

SELECT seats FROM courses WHERE id = 3;