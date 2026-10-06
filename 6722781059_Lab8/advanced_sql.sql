-- CSS326 Lab 8 — Advanced SQL examples (run in MySQL Workbench)
-- Schema: students, courses, enrolments (the junction table)
USE lab_8;

-- 1) MULTI-TABLE JOIN + GROUP BY: how many courses each student takes.
--    LEFT JOIN keeps students with zero enrolments (count 0).
SELECT s.name, COUNT(e.course_id) AS course_count
FROM students s
LEFT JOIN enrolments e ON e.student_id = s.id
GROUP BY s.id
ORDER BY course_count DESC;

-- 2) SUBQUERY: courses nobody is enrolled in.
SELECT title FROM courses
WHERE id NOT IN (SELECT course_id FROM enrolments);

-- 2b) SUBQUERY: students who take more than two courses.
SELECT name FROM students
WHERE id IN (
  SELECT student_id FROM enrolments
  GROUP BY student_id HAVING COUNT(*) > 2
);

-- 3) VIEW: define a join once, then query it like a table.
CREATE OR REPLACE VIEW enrolment_details AS
  SELECT s.name AS student, c.title AS course, e.grade
  FROM enrolments e
  JOIN students s ON e.student_id = s.id
  JOIN courses  c ON e.course_id  = c.id;

SELECT * FROM enrolment_details WHERE student = 'Suda Charoen';
