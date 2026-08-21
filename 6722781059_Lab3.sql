CREATE DATABASE IF NOT EXISTS 6722781059_Lab3;
USE 6722781059_Lab3;

CREATE TABLE IF NOT EXISTS students(
	id		INT NOT NULL AUTO_INCREMENT,
    name 	VARCHAR(100) NOT NULL,
    major	VARCHAR(45) NULL,
    year	INT NULL,
    PRIMARY KEY (id));
    
CREATE TABLE IF NOT EXISTS courses(
	id		INT NOT NULL AUTO_INCREMENT,
    title	VARCHAR(100) NOT NULL,
    credits	INT NOT NULL,
    PRIMARY KEY (id));
    
CREATE TABLE IF NOT EXISTS enrollments(
	id			INT NOT NULL AUTO_INCREMENT,
    student_id	INT NOT NULL,
    course_id	INT NOT NULL,
    grade		VARCHAR(2),
    PRIMARY KEY (id),
    FOREIGN KEY (student_id)	REFERENCES students(id),
    FOREIGN KEY (course_id)		REFERENCES courses(id));
    
SHOW TABLES;
DESCRIBE students;

INSERT INTO students (name, major, year) VALUES
  ('Somchai', 'Software Engineering', 2),
  ('Suda', 'Data Science', 3),
  ('Anan', 'Software Engineering', 1),
  ('Nicha', 'Information Technology', 4),
  ('Krit', 'Data Science', 2),
  ('Ploy', 'Software Engineering', 3),
  ('Tanya', 'Information Technology', 1),
  ('Wichai', 'Data Science', 4);
  
INSERT INTO courses (title, credits) VALUES
  ('Database Programming', 3),
  ('Web Development', 3),
  ('Algorithms', 4),
  ('Statistics', 3),
  ('Operating Systems', 4);
  
INSERT INTO enrollments (student_id, course_id, grade) VALUES
  (1, 1, 'A'),
  (1, 2, 'B+'),
  (2, 1, 'A'),
  (2, 4, 'B'),
  (3, 2, 'C+'),
  (4, 3, 'B+'),
  (4, 5, 'A'),
  (5, 1, 'B'),
  (5, 4, 'A'),
  (6, 2, 'B+'),
  (6, 3, 'C'),
  (7, 5, 'B'),
  (8, 1, 'A'),
  (8, 4, 'A');
  
# Exercise 1
INSERT INTO students(name, major, year) VALUES
	('Rick', 'Software Engineering', 3),
    ('Astley', 'Data Science', 4);

SELECT * FROM students;

SELECT name, major FROM students;
SELECT DISTINCT major FROM students;

SELECT * FROM students WHERE major = 'Data Science';

SELECT name FROM students WHERE year >=3;

# Exercise 2
SELECT name, major FROM students;
SELECT name FROM students WHERE major = 'Data Science';
SELECT name, major FROM students WHERE year BETWEEN 2 AND 3 ORDER BY name LIMIT 3;
SELECT name FROM students WHERE name LIKE '%a%';

# Exercise 3
SELECT major, COUNT(*) AS n
FROM students GROUP BY major
HAVING COUNT(*) >= 3 ORDER BY n;

# Exercise 4
SELECT * FROM students WHERE year=1;
UPDATE students SET major = 'Information Technology' WHERE id = 3;
DELETE FROM students WHERE id = 10;
UPDATE students SET year = year+1 WHERE year = 1;
SELECT * FROM students;

SHOW CREATE TABLE enrollments;

# Exercise 5
SELECT s.name, c.title
FROM enrollments e
JOIN students s ON e.student_id = s.id
JOIN courses  c ON e.course_id  = c.id
ORDER BY s.name;

SELECT s.name, c.title
FROM enrollments e
JOIN students s ON e.student_id = s.id
JOIN courses  c ON e.course_id  = c.id
WHERE s.id = 1;

SELECT s.name, COUNT(*) AS courses_taken
FROM enrollments e 
JOIN students s ON e.student_id = s.id
GROUP BY s.name
ORDER BY courses_taken;