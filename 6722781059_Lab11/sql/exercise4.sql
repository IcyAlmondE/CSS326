-- =====================================================================
-- Lab 11 - Exercise 4 : JSON in practice
-- =====================================================================
USE lab11;

-- Step 1: add a JSON column called details to courses
-- Run once: a second ALTER fails with Error 1060. To start over, re-run sql/lab11_setup.sql.
-- TODO: ALTER TABLE ...
ALTER TABLE courses ADD COLUMN details JSON;

-- Step 2: store a details object for every course. Course 1 is done for
--         you; write courses 2, 3 and 5 the same way (pick your own room,
--         day, time and tags). Course 4 shows a JSON literal - note its
--         extra field "zoom" that the others don't have.
UPDATE courses SET details = JSON_OBJECT('room','BKD 3201','day','Mon','time','09:00',
       'online', false, 'tags', JSON_ARRAY('core','programming')) WHERE id = 1;
-- TODO: course 2
UPDATE courses SET details = JSON_OBJECT('room','BKD 2103','day','Tue','time','13:00',
       'online', false, 'tags', JSON_ARRAY('core','web')) WHERE id = 2;
-- TODO: course 3  (make it a 'Mon' course too, so the filter has 2 results)
UPDATE courses SET details = JSON_OBJECT('room','BKD 3205','day','Mon','time','13:00',
       'online', false, 'tags', JSON_ARRAY('core','theory')) WHERE id = 3;
UPDATE courses SET details =
  '{"room": "Online", "day": "Wed", "time": "10:00", "online": true,
    "zoom": "css-stat", "tags": ["math"]}'
 WHERE id = 4;
-- TODO: course 5
UPDATE courses SET details = JSON_OBJECT('room','BKD 4102','day','Thu','time','09:00',
       'online', false, 'tags', JSON_ARRAY('core','systems')) WHERE id = 5;

SELECT id, title, details FROM courses;

-- Step 3: return each course's title with its room and day (use ->>)
-- TODO
SELECT id, title, details->>'$.room' AS room, details->>'$.day' AS day FROM courses;

-- Step 4: only the courses that run on Monday (filter on a JSON field)
-- TODO
SELECT id, title FROM courses WHERE details->>'$.day' = 'Mon';

-- Step 5: compare -> and ->> on the tags array
SELECT title, details->'$.tags' AS tags, JSON_EXTRACT(details, '$.tags[0]') AS first_tag
  FROM courses;
