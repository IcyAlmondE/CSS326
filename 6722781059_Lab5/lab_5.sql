-- CSS326 -- lab_5 schema, seeded for the Lab 5 exercises
-- Only `students` is used directly in Lab 5's routes; courses and enrolments
-- are here so the schema is complete and the joins are available.
--
-- This is a fresh schema for Lab 5, named for the lab that owns it - the same
-- convention as lab_3. It is not the Lab 3 database and does not replace it.

CREATE DATABASE IF NOT EXISTS lab_5;
USE lab_5;

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
  semester   VARCHAR(20) NOT NULL,
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
  ('CSS310', 'Introduction to Data Science',    3);

INSERT INTO enrolments (student_id, course_id, semester) VALUES
  (1, 1, '2026/1'),
  (1, 2, '2026/1'),
  (2, 1, '2026/1'),
  (2, 3, '2026/1'),
  (3, 2, '2026/1');
