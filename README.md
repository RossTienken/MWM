## QUESTION 1

You have a list/array of strings that represent dates and looks like this:
[‘Oct 7, 2009’, ‘Nov 10, 2009’, ‘Jan 10, 2009’, ‘Oct 22, 2009’, …]

The month is always the first three characters of full month name
(‘January’ => ‘Jan’, ‘February’ => ‘Feb’, …).

The day is one or two digits (1, 2, … 31), with no preceding zero. There is always a comma after the day. The year is always four digits. Write a routine (in any language) that will order this list of strings in date descending order. Do not use any built in date-­‐parsing library… write your own specific to this date format. Feel free to use, or not use, regex.

### Solution:
```JSON
const allMonths = ['Jan','Feb','Mar', 'Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

const sortDate = (arr) => {
let sorted = arr.sort((a, b) => {
  let dayA = a.slice(3,6).match(/\d/g).join('')
  let dayB = b.slice(3, 6).match(/\d/g).join('')
  return dayB - dayA
}).sort((a, b) => {
  let monthA = allMonths.indexOf(a.slice(0,3))
  let monthB = allMonths.indexOf(b.slice(0,3))
  return monthB - monthA
}).sort((a, b) => {
  let yearA = a.slice(6).match(/\d/g).join('')
  let yearB = b.slice(6).match(/\d/g).join('')
  return yearB - yearA
})

return sorted
}
```

QUESTION 2
What are some ways to improve the security of a Unix/Linux system? Include general security guidelines and any specifics related to web servers and db servers.

QUESTION 3
With the test data below, fill in the “???” in the recursive CTE query so that each item in category table is listed with its parents.

https://www.postgresql.org/docs/10/static/queries-with.html
https://www.postgresql.org/docs/10/static/functions-array.html

BEGIN;
CREATE TABLE category (
  id SERIAL PRIMARY KEY,
  parent_id INTEGER REFERENCES category(id) DEFERRABLE,
  name TEXT NOT NULL UNIQUE );
SET CONSTRAINTS ALL DEFERRED;
INSERT INTO category VALUES (1, NULL, 'animal');
INSERT INTO category VALUES (2, NULL, 'mineral');
INSERT INTO category VALUES (3, NULL, 'vegetable');
INSERT INTO category VALUES (4, 1, 'dog');
INSERT INTO category VALUES (5, 1, 'cat');
INSERT INTO category VALUES (6, 4, 'doberman');
INSERT INTO category VALUES (7, 4, 'dachshund');
INSERT INTO category VALUES (8, 3, 'carrot');
INSERT INTO category VALUES (9, 3, 'lettuce');
INSERT INTO category VALUES (10, 11, 'paradox1');
INSERT INTO category VALUES (11, 10, 'paradox2');
SELECT setval('category_id_seq', (select max(id) from category));

WITH RECURSIVE last_run(parent_id, id_list, name_list) AS (
  ???
SELECT id_list, name_list
FROM last_run ???
WHERE ORDER BY id_list;
ROLLBACK;
The output should look like this. The id_list column should be an integer array containing ARRAY[id, parent id, grandparent id, etc]. The name_list column should be a text field containing comma separated names.

 id_list |       name_list        
---------+------------------------
 {1}     | animal
 {2}     | mineral
 {3}     | vegetable
 {4,1}   | dog, animal
 {5,1}   | cat, animal
 {6,4,1} | doberman, dog, animal
 {7,4,1} | dachshund, dog, animal
 {8,3}   | carrot, vegetable
 {9,3}   | lettuce, vegetable
 {10,11} | paradox1, paradox2
 {11,10} | paradox2, paradox1
QUESTION 4
Using HTML5/CSS 3 techniques make a 100 x 100px red square that rotates via an animation 90 degrees when you click on it. You’re allowed to use a small amount of javascript but most of the animation/rotation should be accomplished using HTML5/CSS3. Include a list of which browsers it works on.

QUESTION 5
In your view, what are the pros and cons of TDD (test driven development). When do you think TDD makes more/less sense (if ever)?

QUESTION 6
Do you have any favorite coding related quotes or cartoons?
