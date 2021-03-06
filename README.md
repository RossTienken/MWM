## QUESTION 1

You have a list/array of strings that represent dates and looks like this:
[‘Oct 7, 2009’, ‘Nov 10, 2009’, ‘Jan 10, 2009’, ‘Oct 22, 2009’, …]

The month is always the first three characters of full month name
(‘January’ => ‘Jan’, ‘February’ => ‘Feb’, …).

The day is one or two digits (1, 2, … 31), with no preceding zero. There is always a comma after the day. The year is always four digits. Write a routine (in any language) that will order this list of strings in date descending order. Do not use any built in date-­‐parsing library… write your own specific to this date format. Feel free to use, or not use, regex.

### Solution:
```js
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

## QUESTION 2
What are some ways to improve the security of a Unix/Linux system? Include general security guidelines and any specifics related to web servers and db servers.

### Solution:
One of the main ways to improve security is to constantly utilize https. Using this helps by validating and installing and SSL certificate, and can strengthen security of web servers.
Another important thing is to minimize packages. The more packages that are used, the more vulnerable you become.
One of the most important things to do is to keep everything up to date. Maintaining the system to make sure that things are up to date is vital, and when things are out of date they are a lot more likely to get compromised.
A way to make sure that a db is more secure is also to have strict guidelines for information users enter. Specifically password requirements. If there are strict guidelines it will minimize the opportunity for someone to de-encrypt users information and access their accounts.


## QUESTION 3
With the test data below, fill in the “???” in the recursive CTE query so that each item in category table is listed with its parents.

https://www.postgresql.org/docs/10/static/queries-with.html

https://www.postgresql.org/docs/10/static/functions-array.html

```sql
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
```
The output should look like this. The id_list column should be an integer array containing ARRAY[id, parent id, grandparent id, etc]. The name_list column should be a text field containing comma separated names.

```
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
```

### Solution:
```sql
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
SELECT parent_id, ARRAY[id], name
FROM category
UNION ALL
SELECT c."parent_id", id_list || c."id", name_list || ', ' || c."name"
FROM "category" AS c, "last_run" AS r
WHERE c."id" = r."parent_id"
)
SELECT id_list, name_list FROM last_run
WHERE parent_id IS NULL
ORDER BY id_list;
ROLLBACK;
```

I worked vigorously on this problem, but I cannot get it to output the paradox. I know that because it tries to call on something before it is created it cannot access that information. Without the paradox the code works perfectly.

## QUESTION 4
Using HTML5/CSS 3 techniques make a 100 x 100px red square that rotates via an animation 90 degrees when you click on it. You’re allowed to use a small amount of javascript but most of the animation/rotation should be accomplished using HTML5/CSS3. Include a list of which browsers it works on.

### Solution: See index.html, main.js, and style.css

## QUESTION 5
In your view, what are the pros and cons of TDD (test driven development). When do you think TDD makes more/less sense (if ever)?

### Solution:
I feel like TDD is very important in maintaining and monitoring a strong application of any sort. TDD can be vital in ensuring that developers stay along the script, as well as giving them a very distinct guideline to follow. I believe that it also keeps the end product as close to the original idea as possible, as well as allowing for some room to be creative with code.

One of the cons to TDD though, is that it can make it more difficult to assess when you have run into a problem that may require for the test to change in order to adequately do what was intended.

Overall I believe that Test Driven Development plays a colossal part in the creation of successful and (hopefully) bug free code.


## QUESTION 6
Do you have any favorite coding related quotes or cartoons?

```
  "Debugging is being the detective in a crime movie where you are also the murderer"
```
