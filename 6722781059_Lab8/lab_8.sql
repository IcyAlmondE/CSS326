-- CSS326 -- lab_8 schema, seeded for the Lab 8 exercises
-- students is lab_5's table and rows, unchanged, so every Lab 6 route keeps
-- working; courses is lab_5's plus one course nobody takes. enrolments is the
-- junction table from Lab 2/3 - one link per (student, course), with an
-- optional grade - which is the shape every Lab 8 query uses.
--
-- A fresh schema for Lab 8, named for the lab that owns it - the same
-- convention as lab_3 and lab_5. It does not replace lab_5.

CREATE DATABASE IF NOT EXISTS lab_8;
USE lab_8;

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
-- Computer Networks, so every example in the lab returns at least one row.
INSERT INTO enrolments (student_id, course_id, grade) VALUES
  (1, 1, 'A'),
  (1, 2, 'B+'),
  (2, 1, 'A'),
  (2, 2, 'B'),
  (2, 3, 'A'),
  (3, 2, NULL);
