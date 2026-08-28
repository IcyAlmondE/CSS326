CREATE DATABASE IF NOT EXISTS lab_3;
USE lab_3;

-- ---------------------------------------------------------------------------
-- Structure
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS students (
  id    INT NOT NULL AUTO_INCREMENT,
  name  VARCHAR(100) NOT NULL,
  major VARCHAR(45) NULL,
  year  INT NULL,                      -- year of study 1-4, not a calendar year
  PRIMARY KEY (id));

CREATE TABLE IF NOT EXISTS courses (
  id      INT NOT NULL AUTO_INCREMENT,
  title   VARCHAR(100) NOT NULL,
  credits INT NOT NULL,
  PRIMARY KEY (id));

-- students and courses must exist before this one: enrollments points at both.
CREATE TABLE IF NOT EXISTS enrollments (
  id         INT NOT NULL AUTO_INCREMENT,
  student_id INT NOT NULL,
  course_id  INT NOT NULL,
  grade      VARCHAR(2),
  PRIMARY KEY (id),
  FOREIGN KEY (student_id) REFERENCES students(id),
  FOREIGN KEY (course_id)  REFERENCES courses(id));

-- ---------------------------------------------------------------------------
-- Data - the same rows Lab 3 seeded
-- ---------------------------------------------------------------------------

INSERT INTO students (name, major, year) VALUES
  ('Somchai', 'Software Engineering',  2),
  ('Suda',    'Data Science',          3),
  ('Anan',    'Software Engineering',  1),
  ('Nicha',   'Information Technology',4),
  ('Krit',    'Data Science',          2),
  ('Ploy',    'Software Engineering',  3),
  ('Tanya',   'Information Technology',1),
  ('Wichai',  'Data Science',          4);

INSERT INTO courses (title, credits) VALUES
  ('Database Programming', 3),
  ('Web Development',      3),
  ('Algorithms',           4),
  ('Statistics',           3),
  ('Operating Systems',    4);

-- student_id 1..8, course_id 1..5 (from the order above)
INSERT INTO enrollments (student_id, course_id, grade) VALUES
  (1,1,'A'), (1,2,'B+'), (2,1,'A'), (2,4,'B'),
  (3,2,'C+'),(4,3,'B+'), (4,5,'A'), (5,1,'B'),
  (5,4,'A'), (6,2,'B+'), (6,3,'C'), (7,5,'B'),
  (8,1,'A'), (8,4,'A');

-- ---------------------------------------------------------------------------
-- Check it worked. Expect 8, 5 and 14.
-- ---------------------------------------------------------------------------

SELECT COUNT(*) AS students_rows    FROM students;
SELECT COUNT(*) AS courses_rows     FROM courses;
SELECT COUNT(*) AS enrollments_rows FROM enrollments;


-- ---------------------------------------------------------------------------
-- RESET (optional) - only if the tables already hold rows and the ids above
-- would not line up. Children before parents, or the foreign keys refuse the
-- drop. Remove the leading -- from these three lines, run them, then run this
-- file again from the top.
-- ---------------------------------------------------------------------------
-- DROP TABLE IF EXISTS enrollments;
-- DROP TABLE IF EXISTS courses;
-- DROP TABLE IF EXISTS students;

SELECT * FROM enrollments;
SELECT * FROM students;