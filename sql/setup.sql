-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP TABLE IF EXISTS sweets;
DROP TABLE IF EXISTS cats;
DROP TABLE IF EXISTS planets;
DROP TABLE IF EXISTS pastas;
DROP TABLE IF EXISTS songs;

CREATE TABLE sweets (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT
);

CREATE TABLE cats (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    breed TEXT NOT NULL,
    age INT
);

CREATE TABLE planets (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    distance_from_sun TEXT
);

CREATE TABLE pastas (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    sauce TEXT NOT NULL,
    vegetarian BOOLEAN DEFAULT 'false'
);

CREATE TABLE songs (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title TEXT NOT NULL,
    artist TEXT NOT NULL,
    album TEXT
);

INSERT INTO
    sweets (name, type)

VALUES
    ('Twix', 'Chocolate'),
    ('Starmix', 'Gummies'),
    ('Zebra Stripe', 'Gum');

INSERT INTO
    cats(name, breed, age)

VALUES
    ('Ernie', 'Tabby', 13),
    ('Tony', 'Rag Doll', 7),
    ('Hercules', 'Calico', 2);

INSERT INTO 
    planets(name, distance_from_sun)

VALUES
    ('Mars', '134.72 million miles'),
    ('Earth', '92.524 million miles'),
    ('Pluto', '3.7 billion miles');

INSERT INTO
    pastas(name, sauce, vegetarian)

VALUES
    ('Bolognese', 'Tomato', 'false'),
    ('Pesto alla genovese', 'Pesto', 'true'),
    ('Carbonara', 'None', 'false');

INSERT INTO
    songs(title, artist, album)

VALUES
    ('Here Comes the Sun', 'The Beatles', 'Abbey Road'),
    ('What Are You Doing the Rest of Your Life?', 'Bill Evans', 'From Left to Right'),
    ('Dance', 'ESG', 'Come Away With ESG');





