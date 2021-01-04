DROP DATABASE IF EXISTS spotted;
CREATE DATABASE spotted;

\c spotted;

DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  avatar VARCHAR(70),
  bio VARCHAR(255),
  firstName VARCHAR(70),
  lastName VARCHAR(70),
  username VARCHAR(70) UNIQUE,
  email VARCHAR(70),
  password VARCHAR(70)
);

DROP TABLE IF EXISTS posts;

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  postdate VARCHAR(70),
  caption VARCHAR(255),
  photo VARCHAR(70),
  owner_id INT REFERENCES users(id),
  user_id INT REFERENCES users(id)
);

DROP TABLE IF EXISTS likes;

CREATE TABLE likes (
  id SERIAL PRIMARY KEY,
  post_id INT REFERENCES posts(id),
  user_id INT REFERENCES users(id)
);

DROP TABLE IF EXISTS comments;

CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  commentDate VARCHAR(70),
  comment VARCHAR(255),
  post_id INT,
  user_id INT REFERENCES users(id)
);

DROP TABLE IF EXISTS meets;

CREATE TABLE meets (
  id SERIAL PRIMARY KEY,
  title VARCHAR(70),
  meetdate VARCHAR(70),
  timestart VARCHAR(70),
  timeend VARCHAR(70),
  street VARCHAR(70),
  city VARCHAR(70),
  state VARCHAR(70),
  zipcode VARCHAR(70),
  user_id INT REFERENCES users(id)
);

DROP TABLE IF EXISTS listings;

CREATE TABLE listings (
  id SERIAL PRIMARY KEY,
  city VARCHAR(70),
  state VARCHAR(70),
  photo VARCHAR(255),
  listeddate VARCHAR(70),
  condition VARCHAR(70),
  year INT NOT NULL,
  make VARCHAR(70),
  model VARCHAR(70),
  mileage INT NOT NULL,
  price INT NOT NULL,
  description VARCHAR(500),
  contactinfo VARCHAR(70),
  transmission VARCHAR(70),
  sold BOOLEAN,
  user_id INT REFERENCES users(id)
);
