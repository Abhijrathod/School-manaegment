CREATE DATABASE IF NOT EXISTS school_management;

USE school_management;

CREATE TABLE IF NOT EXISTS schools (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL,
    UNIQUE KEY unique_school (name, address, latitude, longitude)
);

TRUNCATE TABLE schools;

INSERT IGNORE INTO schools (name, address, latitude, longitude)
VALUES
    ('ABC School', '123 Main St', 12.9716, 77.5946),
    ('XYZ Academy', '456 Elm St', 13.0827, 80.2707),
    ('Sunrise High', '789 Oak Rd', 28.7041, 77.1025);

SELECT * FROM schools;
