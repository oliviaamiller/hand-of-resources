-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP TABLE IF EXISTS sweets;
DROP TABLE IF EXISTS cats;
DROP TABLE IF EXISTS planets;
DROP TABLE IF EXISTS pastas;

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

