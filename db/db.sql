#
# Create database
#
CREATE DATABASE ulab_v002;
USE ulab_v002;



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
# Ulab dependencies table
#
CREATE TABLE dependencies(
  id INT(11) NOT NULL,
  name VARCHAR(150) NOT NULL,
  slug VARCHAR(150) NOT NULL,
  email VARCHAR(150),
  icon VARCHAR(150),
  type VARCHAR(150),
  mission TEXT,
  vission TEXT,
  objectives TEXT,
  description TEXT,
  # unit_ads VARCHAR(150) NOT NULL, #4 valores: direccion, consejo asesor, unidades de apoyo, laboratorio
  created_at timestamp NOT NULL DEFAULT current_timestamp,
  updated_at timestamp NOT NULL DEFAULT current_timestamp
);

ALTER TABLE dependencies
  ADD PRIMARY KEY (id);

ALTER TABLE dependencies ADD UNIQUE INDEX(email);

ALTER TABLE dependencies
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;



#
# Labs table
#
CREATE TABLE labs(
  id INT(11) NOT NULL,
  name VARCHAR(150) NOT NULL,
  url VARCHAR(255) NOT NULL,
  usbid VARCHAR(150) NOT NULL,
  area VARCHAR(255),
  email VARCHAR(255) NOT NULL,
  lab_head VARCHAR(150) NOT NULL,
  location_main_office VARCHAR(255),
  phone_main_office VARCHAR(100),
  extension_main_office VARCHAR(4),
  description TEXT,
  created_at timestamp NOT NULL DEFAULT current_timestamp,
  updated_at timestamp NOT NULL DEFAULT current_timestamp
);

ALTER TABLE labs
  ADD PRIMARY KEY (id);

ALTER TABLE labs ADD UNIQUE INDEX(slug, url);

ALTER TABLE labs
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;



#
# Personal table
#
CREATE TABLE employees(
  id INT(11) NOT NULL,
  name VARCHAR(150) NOT NULL,
  lastname VARCHAR(150) NOT NULL,
  job VARCHAR(255) NOT NULL,
  email VARCHAR(100) NOT NULL,
  usbid VARCHAR(100) NOT NULL,
  location_main VARCHAR(50),
  location_adm VARCHAR(50),
  location_lab VARCHAR(50),
  phone_main VARCHAR(20),
  phone_adm VARCHAR(20),
  phone_lab VARCHAR(20),
  phone_extension_main VARCHAR(4),
  phone_extension_adm VARCHAR(4),
  phone_extension_lab VARCHAR(4),
  type VARCHAR(25), # docente, administrativo, técnico, obrero
  status_usb VARCHAR(10), # lista de dos opciones activo o jubilado.
  biography TEXT,
  ulab_unit VARCHAR(50),
  dep_id INT(11),
  created_at timestamp NOT NULL DEFAULT current_timestamp,
  updated_at timestamp NOT NULL DEFAULT current_timestamp,
  CONSTRAINT fk_deps FOREIGN KEY (dep_id) REFERENCES dependencies(id),
);

ALTER TABLE employees
  ADD PRIMARY KEY (id);

ALTER TABLE employees ADD UNIQUE INDEX(email);

ALTER TABLE employees
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;




#
# Locations table
# Final sctructure
#
CREATE TABLE locations(
  id INT(11) NOT NULL,
  loc_build VARCHAR(150),
  loc_floor VARCHAR(20),
  loc_office VARCHAR(10),
  loc_parrish VARCHAR(255),
  loc_municipality VARCHAR(255),
  loc_state VARCHAR(255),
  loc_country VARCHAR(255),
  dep_id INT(11),
  person_id INT(11),
  created_at timestamp NOT NULL DEFAULT current_timestamp,
  CONSTRAINT fk_deps FOREIGN KEY (dep_id) REFERENCES dependencies(id),
  CONSTRAINT fk_personal FOREIGN KEY (person_id) REFERENCES employees(id)
);

ALTER TABLE locations
  ADD PRIMARY KEY (id);

ALTER TABLE locations
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;



#
# About table
#
CREATE TABLE details(
  id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL,
  content TEXT
);



#
# Posts table
#
CREATE TABLE posts(
    id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(150) NOT NULL,
    slug VARCHAR(150), NOT NULL,
    published BOOLEAN,
    img VARCHAR(255),
    excerpt VARCHAR(255),
    content TEXT,
    created_at timestamp NOT NULL DEFAULT current_timestamp
);