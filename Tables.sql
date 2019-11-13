CREATE DATABASE DiscManager;

USE DiscManager;

CREATE TABLE DiscCollection (
    id  INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE Disc (
    id  INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL, 
    year INT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE Disc_DiscCollection (
    disc_id INT NOT NULL,
    disc_collection_id INT NOT NULL,
    FOREIGN KEY (disc_id) REFERENCES Disc(id),
    FOREIGN KEY (disc_collection_id) REFERENCES DiscCollection(id)
);

CREATE USER 'discsadmin'@'localhost' IDENTIFIED BY 'abc123';
GRANT ALL PRIVILEGES ON * . * TO 'discsadmin'@'localhost';
ALTER USER 'discsadmin'@'localhost' IDENTIFIED WITH mysql_native_password BY 'abc123'