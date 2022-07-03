#
# Create database
#
CREATE DATABASE ulab_v001;
USE ulab_v001;



#
# Users table
#
CREATE TABLE users(
  id INT(11) NOT NULL,
  email VARCHAR(50) NOT NULL,
  password VARCHAR(100) NOT NULL,
  fullName VARCHAR(100) NOT NULL
);

ALTER TABLE users
  ADD PRIMARY KEY (id);

ALTER TABLE users
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE users;



#
# Labs table
#
CREATE TABLE labs(
  id INT(11) NOT NULL,
  name VARCHAR(150) NOT NULL,
  area VARCHAR(255) NOT NULL,
  slug VARCHAR(150) NOT NULL,
  location TEXT,
  description TEXT
);

ALTER TABLE labs
  ADD PRIMARY KEY (id);

ALTER TABLE labs
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;



#
# Personal table
#
CREATE TABLE employees(
  id INT(11) NOT NULL,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(100) NOT NULL,
  phone VARCHAR(100),  
  biography TEXT,
  job VARCHAR(255) NOT NULL,
  lab_id INT(11),
  created_at timestamp NOT NULL DEFAULT current_timestamp,
  CONSTRAINT fk_lab FOREIGN KEY (lab_id) REFERENCES labs(id)
);

ALTER TABLE employees
  ADD PRIMARY KEY (id);

ALTER TABLE employees
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;