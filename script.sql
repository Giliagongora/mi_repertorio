 -- Creo la bbdd
CREATE DATABASE repertorio;

-- Conecto a la bbdd
\c repertorio;

-- Creo las tablas
CREATE TABLE canciones (id SERIAL, titulo VARCHAR(50), artista
VARCHAR(50), tono VARCHAR(10));

-- verifico que todo este en orden

\l

\dt 

\d canciones;